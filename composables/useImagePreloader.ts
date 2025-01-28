import { ref } from 'vue';
// import { useRuntimeConfig } from '#app';

export function useImagePreloader(imageList: string[]) {
  // const config = useRuntimeConfig();
  // const baseURL = config.public.baseURL;
  
  const loaded = ref(0);
  const total = imageList.length;
  const progress = ref(0);

  const loadImages = () => {
    return new Promise<void>((resolve) => {
      imageList.forEach((src) => {
        const img = new Image();
        // img.src = `${baseURL}${src}`;
        img.src = `${src}`;
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
