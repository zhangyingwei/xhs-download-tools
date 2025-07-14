import {downloadImages} from '../actions/ImageAction.js';
import {downloadVideos} from '../actions/VideoAction.js';

importScripts('jszip.js');

const download = (request, sender, sendResponse) => {
    console.log("收到消息:", request.action);
    if (request.action === 'createZip') {
        createZip(request.imageUrls, request.videoUrls, request.textContent, sendResponse);
        return true;
    }
}

function createZip(imageUrls, videoUrls, textContent, sendResponse) {
    const zip = new JSZip();
    console.log("下载中...");

    // 添加文本文件
    zip.file("笔记内容.txt", textContent.note);
    zip.file("评论内容.txt", textContent.comments);

    // 获取并添加图片到 ZIP
    const imagePromises = downloadImages(zip, imageUrls);

    // 获取并添加视频到 ZIP
    const videoPromises = downloadVideos(zip, videoUrls);

    // 等待所有图片和视频获取完成
    Promise.all([...imagePromises, ...videoPromises])
        .then(() => zip.generateAsync({ type: "blob" }))
        .then(blob => {
            const reader = new FileReader();
            reader.onloadend = function () {
                const base64Data = reader.result.split(',')[1];
                console.log("ZIP 文件已创建，准备下载。", `${textContent.auth}.zip`);
                chrome.downloads.download({
                    url: `data:application/zip;base64,${base64Data}`,
                    filename: `${textContent.auth}.zip`,
                    saveAs: true
                });
            };
            reader.readAsDataURL(blob);
            sendResponse({ success: true, message: "ZIP 文件已创建并下载。" });
        })
        .catch(error => {
            console.error('生成 ZIP 文件失败:', error);
            sendResponse({ success: false, message: "创建 ZIP 文件失败。" });
        });
}

export {
    download
}