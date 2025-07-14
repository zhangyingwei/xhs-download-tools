import {crateButton, remoteButton} from './content/button.js';
import {getImageUrls} from './actions/ImageAction.js';
import {getText} from './actions/TextAction.js';
import { getVideoUrls } from './actions/VideoAction.js';

let buttonChanged = false;
(function () {
    createButton();
    // 定义 MutationObserver 回调函数
    const observer = new MutationObserver(handleDomChanges);
    observer.observe(document.body, {
        childList: true, // 监听子节点变化
        subtree: false,   // 包括子树的所有变化
    });



    const resources = performance.getEntriesByType('resource');
    resources.forEach(resource => {
        console.log("resources", resource.name);

        // TODO 失败，无法获取视频请求
        // if (resource.initiatorType === 'script' && resource.name.endsWith('.mp4') || resource.name.endsWith('.m3u8')) {
        //     console.log("resources", resource);
        // }
    });
    console.log("初次运行脚本逻辑");
})();

function handleDomChanges(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            // console.log("DOM 结构发生了变化:", mutation);
            createButton();
        }
    }
}

function createButton(){
    if (buttonChanged) {
        return;
    }
    const container = document.getElementById('noteContainer');
    if (container) {
        const button = crateButton(containerDom => {
            return {
                imageUrls: getImageUrls(containerDom),
                videoUrls: getVideoUrls(containerDom),
                textContent: getText(containerDom)
            }
        });
        buttonChanged = true
        setTimeout(() => {
            buttonChanged = false
        }, 1000)
    } else {
        remoteButton()
        buttonChanged = true
        setTimeout(() => {
            buttonChanged = false
        }, 1000)
    }
}