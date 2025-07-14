

const getVideoUrls = (container) => {
    const mediaContainers = container.querySelectorAll('.media-container');
    const videoUrls = [];
    mediaContainers.forEach(mediaContainer => {
        const videos = mediaContainer.querySelectorAll('video');
        videos.forEach(video => {
            videoUrls.push(video.src);
        });
    })
    return videoUrls;
}

const downloadVideos = (zip, videoUrls) => {
    // return videoUrls.map(url => {
    //     return fetch(url)
    //         .then(response => {
    //             const contentType = response.headers.get('Content-Type');
    //             const extension = getExtensionFromMimeType(contentType);
    //             return response.blob().then(blob => ({
    //                 blob,
    //                 extension
    //             }));
    //         })
    //         .then(data => {
    //             const { blob, extension } = data;
    //             const filename = getFilenameFromUrl(url);
    //             zip.file(`videos/${filename}${extension}`, blob);
    //         })
    //         .catch(error => {
    //             console.error(`获取资源 ${url} 失败:`, error);
    //         });
    // });
    return []
}


export {
    getVideoUrls,
    downloadVideos
}