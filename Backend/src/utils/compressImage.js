const compressImage = async (imageBuffer) => {
    try {
        // Dynamically import modules for image compression
        const { default: imagemin } = await import('imagemin');
        const imageminMozjpeg = (await import('imagemin-mozjpeg')).default;
        const imageminPngquant = (await import('imagemin-pngquant')).default;

        // Compress the image buffer
        const compressedImageBuffer = await imagemin.buffer(imageBuffer, {
            plugins: [
                imageminMozjpeg({ quality: 50 }), // JPEG compression quality
                imageminPngquant({ quality: [0.6, 0.8] }), // PNG compression quality
            ],
        });

        // Determine the image type (assumes JPEG or PNG)
        const imageType = compressedImageBuffer[0] === 0xFF ? 'jpeg' : 'png';

        // Convert the compressed image buffer to base64
        const base64Image = compressedImageBuffer.toString('base64');

        // Return the base64 string with the appropriate data URL prefix
        return `data:image/${imageType};base64,${base64Image}`;
    } catch (error) {
        console.error('Error compressing image:', error);
        throw new Error('Image compression failed');
    }
};

module.exports = compressImage;
