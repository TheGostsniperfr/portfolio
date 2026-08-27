import { computed, onScopeDispose, ref, watch, type Ref } from 'vue'

export interface CarouselOptions {
  count: Ref<number>
  /** Receives the pointer/wheel listeners and carries `--pos`, `--step` and `--half`. */
  viewport: Ref<HTMLElement | null>
  /** Flex row whose children are the slides — measured to derive the geometry. */
  track: Ref<HTMLElement | null>
  /** False in portrait, where native scroll-snap replaces the engine entirely. */
  enabled: Ref<boolean>
  /** Card centred on first render. Read once at setup. */
  initialIndex?: number
}

const REFERENCE_FRAME_MS = 1000 / 60
const SETTLE_EPSILON = 0.0005
const DRAG_THRESHOLD_PX = 6
const WHEEL_SETTLE_MS = 90
const WHEEL_LINE_HEIGHT = 16

/** Tight while the pointer is down so the track tracks the cursor, soft once it lets go. */
const SMOOTHING_DRAG = 0.32
const SMOOTHING_SETTLE = 0.07
/** A card advances in ~230px of travel rather than a full card width. */
const DRAG_SENSITIVITY = 1.6
/** Flicks carry at most one extra card, so nothing ever shoots across the list. */
const MOMENTUM = 0.22
const MAX_FLICK_CARDS = 1

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

/** Firefox reports wheel deltas in lines, Safari sometimes in pages. */
function normalizeWheelDelta(event: WheelEvent): number {
  const scale = event.deltaMode === 1 ? WHEEL_LINE_HEIGHT : event.deltaMode === 2 ? window.innerHeight : 1
  const raw = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
  return raw * scale
}

export function useProjectCarousel(options: CarouselOptions) {
  const { count, viewport, track, enabled, initialIndex = 0 } = options

  const startIndex = clamp(initialIndex, 0, Math.max(0, count.value - 1))
  const index = ref(startIndex)
  const isDragging = ref(false)
  // The click event fires before the rAF that would clear isDragging, so a click is judged on
  // the distance actually travelled instead — small hand jitter must still open a card.
  let clickSuppressed = false

  // Kept off the reactivity graph on purpose: these change every frame, and waking Vue
  // 60 times a second to re-render the same DOM is what makes carousels feel heavy.
  let current = startIndex
  let target = startIndex
  let step = 1
  let frame: number | null = null
  let lastFrameTime = 0

  let pointerId: number | null = null
  let dragStartX = 0
  let dragStartTarget = 0
  let dragDistance = 0
  let lastMoveX = 0
  let lastMoveTime = 0
  let velocity = 0
  let wheelTimer: ReturnType<typeof setTimeout> | null = null
  let wheelEventsInGesture = 0
  let wheelGestureStart = 0
  let wheelGestureDirection = 0

  const maxIndex = computed(() => Math.max(0, count.value - 1))

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function render() {
    const element = viewport.value
    if (!element) return
    element.style.setProperty('--pos', current.toFixed(4))
    const rounded = Math.round(current)
    if (rounded !== index.value) index.value = rounded
  }

  function measure() {
    const trackElement = track.value
    const element = viewport.value
    if (!trackElement || !element) return

    const slides = trackElement.children
    const first = slides[ 0 ] as HTMLElement | undefined
    if (!first) return

    const second = slides[ 1 ] as HTMLElement | undefined
    // offsetWidth, not getBoundingClientRect: slides carry a scale() that shrinks off-centre
    // cards, and the track is laid out from untransformed boxes. Measuring the painted width
    // would offset the whole strip by however much slide 0 happens to be scaled down.
    const slideWidth = first.offsetWidth
    step = second ? second.offsetLeft - first.offsetLeft : slideWidth

    element.style.setProperty('--step', `${step}px`)
    element.style.setProperty('--half', `${slideWidth / 2}px`)
  }

  function tick(time: number) {
    const delta = lastFrameTime ? time - lastFrameTime : REFERENCE_FRAME_MS
    lastFrameTime = time

    // Frame-rate independent easing, so a 144Hz screen does not scroll faster than a 60Hz one.
    const rate = pointerId !== null ? SMOOTHING_DRAG : SMOOTHING_SETTLE
    const smoothing = 1 - Math.pow(1 - rate, delta / REFERENCE_FRAME_MS)
    current += (target - current) * smoothing

    if (Math.abs(target - current) < SETTLE_EPSILON) {
      current = target
      render()
      frame = null
      lastFrameTime = 0
      return
    }

    render()
    frame = requestAnimationFrame(tick)
  }

  function start() {
    if (frame !== null) return
    if (prefersReducedMotion()) {
      current = target
      render()
      return
    }
    lastFrameTime = 0
    frame = requestAnimationFrame(tick)
  }

  function stop() {
    if (frame === null) return
    cancelAnimationFrame(frame)
    frame = null
    lastFrameTime = 0
  }

  function setTarget(value: number) {
    target = clamp(value, 0, maxIndex.value)
    start()
  }

  function goTo(value: number) {
    setTarget(Math.round(value))
  }

  function jumpTo(value: number) {
    target = clamp(value, 0, maxIndex.value)
    current = target
    stop()
    render()
  }

  // Snaps from `target` — where the drag actually reached — not from the smoothed `current`,
  // which trails behind and would otherwise swallow part of a gentle gesture.
  function snap() {
    const impulse = clamp(velocity * MOMENTUM, -MAX_FLICK_CARDS, MAX_FLICK_CARDS)
    setTarget(Math.round(target + impulse))
  }

  function onPointerDown(event: PointerEvent) {
    if (!enabled.value || event.button !== 0 || pointerId !== null) return

    clickSuppressed = false
    pointerId = event.pointerId
    dragStartX = lastMoveX = event.clientX
    dragStartTarget = current
    dragDistance = 0
    velocity = 0
    lastMoveTime = event.timeStamp

    // Deliberately not setPointerCapture: capturing retargets the subsequent `click` to the
    // capturing element, so it would never reach the slide and cards could not be opened.
    // Window listeners keep the drag alive outside the viewport just as well.
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
  }

  function onPointerMove(event: PointerEvent) {
    if (pointerId !== event.pointerId) return

    const travelled = event.clientX - dragStartX
    dragDistance = Math.max(dragDistance, Math.abs(travelled))
    if (!isDragging.value && dragDistance > DRAG_THRESHOLD_PX) isDragging.value = true

    const elapsed = event.timeStamp - lastMoveTime
    if (elapsed > 0) {
      velocity = -(event.clientX - lastMoveX) / step / elapsed * REFERENCE_FRAME_MS
      lastMoveX = event.clientX
      lastMoveTime = event.timeStamp
    }

    setTarget(dragStartTarget - (travelled / step) * DRAG_SENSITIVITY)
  }

  function onPointerUp(event: PointerEvent) {
    if (pointerId !== event.pointerId) return

    detachDragListeners()
    pointerId = null
    clickSuppressed = dragDistance > DRAG_THRESHOLD_PX
    isDragging.value = false
    snap()
  }

  function detachDragListeners() {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerUp)
  }

  /** True when the click that just landed is the tail of a real drag, not a tap. */
  function consumeClickSuppression() {
    const suppressed = clickSuppressed
    clickSuppressed = false
    return suppressed
  }

  function onWheel(event: WheelEvent) {
    if (!enabled.value) return
    event.preventDefault()

    const delta = normalizeWheelDelta(event)

    // wheelTimer is null once a gesture has settled, so its absence marks the first event of a
    // new one — remember where it started and which way it's headed.
    if (wheelTimer === null) {
      wheelEventsInGesture = 0
      wheelGestureStart = target
      wheelGestureDirection = Math.sign(delta)
    }
    wheelEventsInGesture += 1

    setTarget(target + delta / step)

    if (wheelTimer) clearTimeout(wheelTimer)
    wheelTimer = setTimeout(() => {
      wheelTimer = null
      velocity = 0

      // A single light notch rarely moves `target` past the 0.5 needed to round on to the next
      // card, so it used to visibly advance for the settle animation and then snap straight back
      // to where it started. Only that exact case is overridden — a lone tick that already
      // reached a different card, and any multi-event scroll, still settle via plain snap().
      if (
        wheelEventsInGesture === 1 &&
        wheelGestureDirection !== 0 &&
        Math.round(target) === wheelGestureStart
      ) {
        setTarget(wheelGestureStart + wheelGestureDirection)
      } else {
        snap()
      }
    }, WHEEL_SETTLE_MS)
  }

  let resizeObserver: ResizeObserver | null = null

  watch([ viewport, track ], ([ element, trackElement ], _old, onCleanup) => {
    if (!element || !trackElement) return

    element.addEventListener('pointerdown', onPointerDown)
    element.addEventListener('wheel', onWheel, { passive: false })

    resizeObserver = new ResizeObserver(() => {
      measure()
      render()
    })
    resizeObserver.observe(element)

    measure()
    render()

    onCleanup(() => {
      element.removeEventListener('pointerdown', onPointerDown)
      element.removeEventListener('wheel', onWheel)
      detachDragListeners()
      resizeObserver?.disconnect()
      resizeObserver = null
    })
  }, { immediate: true })

  watch(count, () => {
    if (target > maxIndex.value) jumpTo(maxIndex.value)
    measure()
  })

  watch(enabled, (isEnabled) => {
    if (!isEnabled) {
      stop()
      detachDragListeners()
      pointerId = null
      isDragging.value = false
      clickSuppressed = false
    } else {
      measure()
      jumpTo(index.value)
    }
  })

  onScopeDispose(() => {
    stop()
    detachDragListeners()
    if (wheelTimer) clearTimeout(wheelTimer)
    resizeObserver?.disconnect()
  })

  return { index, isDragging, goTo, jumpTo, measure, consumeClickSuppression }
}
