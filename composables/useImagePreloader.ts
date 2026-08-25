import { ref } from 'vue'

export interface PreloadTarget {
  src: string
  /** Mirrors what the page will render, so the browser picks — and caches — the same file. */
  srcset?: string
  sizes?: string
}

export function useImagePreloader(imageList: (string | PreloadTarget)[]) {
  const loaded = ref(0)
  const total = imageList.length
  const progress = ref(0)

  const loadImages = () => {
    return new Promise<void>((resolve) => {
      if (total === 0) {
        progress.value = 100
        resolve()
        return
      }

      imageList.forEach((entry) => {
        const target: PreloadTarget = typeof entry === 'string' ? { src: entry } : entry
        const img = new Image()
        // sizes/srcset must be set before src for the browser to resolve the candidate once.
        if (target.sizes) img.sizes = target.sizes
        if (target.srcset) img.srcset = target.srcset
        img.src = target.src
        img.onload = img.onerror = () => {
          loaded.value++
          progress.value = Math.floor((loaded.value / total) * 100)
          if (loaded.value === total) resolve()
        }
      })
    })
  }

  return { progress, loadImages }
}
