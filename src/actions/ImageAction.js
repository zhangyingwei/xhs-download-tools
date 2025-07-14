import {getExtensionFromMimeType, getFilenameFromUrl} from "../utils/Utils";

const getImageUrls = (container) => {
    const mediaContainers = container.querySelectorAll('.media-container');
    const imageUrls = [];
    mediaContainers.forEach(mediaContainer => {
        const imgs = mediaContainer.querySelectorAll('img');
        imgs.forEach(img => {
            imageUrls.push(img.src);
        });
    });
    return imageUrls
}

const downloadImages = (zip, imageUrls) => {
    return imageUrls.map(url => {
        return fetch(url)
            .then(response => {
                const contentType = response.headers.get('Content-Type');
                const extension = getExtensionFromMimeType(contentType);
                return response.blob().then(blob => ({
                    blob,
                    extension
                }));
            })
            .then(data => {
                const { blob, extension } = data;
                const filename = getFilenameFromUrl(url);
                zip.file(`images/${filename}${extension}`, blob);
            })
            .catch(error => {
                console.error(`获取资源 ${url} 失败:`, error);
            });
    });
}

export {
    getImageUrls,
    downloadImages
}