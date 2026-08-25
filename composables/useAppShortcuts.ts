import { onBeforeUnmount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { projects } from '~/data/projects'

const CAROUSEL_ROUTE = '/Projects'

function isTyping(target: EventTarget | null) {
  const el = target as HTMLElement | null
  return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))
}

/** GitHub Pages serves directory routes with a trailing slash; the router does not. */
function normalize(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

/** Index of the project page currently shown, or -1 anywhere else. */
function projectIndexFor(path: string) {
  const slug = normalize(path).replace(/^\/Projects\//, '')
  return projects.findIndex((p) => p.slug === slug)
}

/**
 * Site-wide keyboard shortcuts. Mounted once from app.vue.
 *
 * Deliberately inert while a dialog is open: the carousel's fullscreen overlay binds Escape
 * itself, and both handlers sit on window, so a flag beats trying to stop propagation between
 * two listeners on the same target.
 */
export function useAppShortcuts() {
  const router = useRouter()
  const route = useRoute()

  function goToProject(offset: number) {
    const current = projectIndexFor(route.path)
    if (current < 0) return false
    const next = current + offset
    if (next < 0 || next >= projects.length) return false
    router.push(`/Projects/${projects[ next ].slug}`)
    return true
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return
    if (isTyping(event.target)) return
    if (document.querySelector('[role="dialog"]')) return

    if (event.key === 'Escape') {
      const path = normalize(route.path)
      if (path === CAROUSEL_ROUTE || path === '/') return
      event.preventDefault()
      if (path.startsWith('/Projects/')) router.push(CAROUSEL_ROUTE)
      else router.back()
      return
    }

    // Left/right walk the project list without going back to the carousel first.
    if (event.key === 'ArrowLeft' && goToProject(-1)) event.preventDefault()
    if (event.key === 'ArrowRight' && goToProject(1)) event.preventDefault()
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
}
