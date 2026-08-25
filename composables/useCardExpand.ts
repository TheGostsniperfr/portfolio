const DURATION = 700

export interface ExpandOptions {
  /** Fixed-position box that grows from the card to the full viewport. */
  frame: HTMLElement
  /** Cover image inside that box. */
  image: HTMLElement
  /** Darkening layer faded in behind the UI. */
  scrim: HTMLElement
  /** The card being opened — read live, because it keeps sliding while it recentres. */
  sourceFrame: HTMLElement
  /** That card's cover, whose parallax transform is unwound as the box grows. */
  sourceImage: HTMLElement
  reverse?: boolean
  /** Eased progress, 0 to 1, on every frame — lets the caller reveal UI before the end. */
  onProgress?: (eased: number) => void
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const lerp = (from: number, to: number, t: number) => from + (to - from) * t

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Grows the card's own window to fill the screen while its image de-zooms.
 *
 * The source rect is sampled every frame rather than captured once: opening an off-centre card
 * also recentres the carousel, so a fixed starting rect would leave the growing box behind and
 * expose it as a second copy of the card.
 */
export function useCardExpand() {
  function play(options: ExpandOptions): Promise<void> {
    const { frame, image, scrim, sourceFrame, sourceImage, reverse = false, onProgress } = options

    const apply = (progress: number) => {
      const eased = easeInOutCubic(progress)
      const from = sourceFrame.getBoundingClientRect()
      const matrix = new DOMMatrixReadOnly(getComputedStyle(sourceImage).transform)

      frame.style.left = `${lerp(from.left, 0, eased)}px`
      frame.style.top = `${lerp(from.top, 0, eased)}px`
      frame.style.width = `${lerp(from.width, window.innerWidth, eased)}px`
      frame.style.height = `${lerp(from.height, window.innerHeight, eased)}px`
      frame.style.borderRadius = `${lerp(4, 0, eased)}px`

      // Matches the card exactly at progress 0, then unwinds zoom and parallax to identity.
      image.style.transform =
        `translate(${lerp(matrix.e, 0, eased)}px, 0) scale(${lerp(matrix.a, 1, eased)})`
      scrim.style.opacity = `${eased}`
      onProgress?.(eased)
    }

    // Applied synchronously so the overlay is already sitting on the card when it first paints,
    // instead of showing one zero-sized frame while waiting for the initial rAF.
    apply(reverse ? 1 : 0)

    if (prefersReducedMotion()) {
      apply(reverse ? 0 : 1)
      return Promise.resolve()
    }

    return new Promise((resolve) => {
      const started = performance.now()
      const step = (now: number) => {
        const elapsed = Math.min((now - started) / DURATION, 1)
        apply(reverse ? 1 - elapsed : elapsed)
        if (elapsed < 1) {
          requestAnimationFrame(step)
          return
        }
        resolve()
      }
      requestAnimationFrame(step)
    })
  }

  return { play, duration: DURATION }
}
