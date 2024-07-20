const compressImage = async (imageBuffer) => {
    try {
      const { default: imagemin } = await import('imagemin');
      const imageminMozjpeg = (await import('imagemin-mozjpeg')).default;
      const imageminPngquant = (await import('imagemin-pngquant')).default;
  
      const compressedImageBuffer = await imagemin.buffer(imageBuffer, {
        plugins: [
          imageminMozjpeg({ quality: 50 }),
          imageminPngquant({ quality: [0.6, 0.8] }),
        ],
      });
      return compressedImageBuffer.toString('base64');
    } catch (error) {
      console.error('Error compressing image:', error);
      throw new Error('Image compression failed');
    }
  };
  
  module.exports = compressImage;
  