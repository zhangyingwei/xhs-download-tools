const getExtensionFromMimeType = (mimeType) => {
    const mimeToExtension = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/webp': '.webp',
        'image/svg+xml': '.svg',
        'video/mp4': '.mp4',
        'video/webm': '.webm',
        // 其他视频格式...
    };
    return mimeToExtension[mimeType] || '.bin';
}

const getFilenameFromUrl = (url) => {
    const path = new URL(url).pathname;
    const parts = path.split('/');
    return parts[parts.length - 1].replace(/\.[^/.]+$/, '');
}

export {
    getExtensionFromMimeType,
    getFilenameFromUrl
}