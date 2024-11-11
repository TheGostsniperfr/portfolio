export default ({ app }, inject) => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
      });
    };
  
    const loadImages = (imageSources, updateProgress) => {
      let loaded = 0;
      const total = imageSources.length;
  
      return Promise.all(
        imageSources.map((src) =>
          loadImage(src).then(() => {
            loaded++;
            updateProgress(loaded, total);
          })
        )
      );
    };
  
    inject('loadImages', loadImages);
  };
  