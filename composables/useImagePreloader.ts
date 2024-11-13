// composables/useImagePreloader.ts
import { ref } from 'vue';

export function useImagePreloader(imageList: string[]) {
  const loaded = ref(0);
  const total = imageList.length;
  const progress = ref(0);

  const loadImages = () => {
    return new Promise<void>((resolve) => {
      imageList.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = img.onerror = () => {
          loaded.value++;
          progress.value = Math.floor((loaded.value / total) * 100);
          if (loaded.value === total) resolve();
        };
      });
    });
  };

  return { progress, loadImages };
}
