const crateButton = (onProcessClick) => {
    if (document.getElementById('float-download-btn')) {
        return
    }
    const floatBtn = document.createElement('button');
    floatBtn.id = 'float-download-btn';
    floatBtn.innerHTML = '<span>下载笔记</span>';
    const style = document.createElement('style');
    style.textContent = buttonStyle();
    document.head.appendChild(style);
    document.body.appendChild(floatBtn);
    floatBtn.addEventListener('click', () => {
        onClick(this, floatBtn, onProcessClick);
    });
    return floatBtn
}

const remoteButton = () => {
    const floatBtn = document.getElementById('float-download-btn');
    if (floatBtn) {
        floatBtn.remove();
    }
}

const buttonStyle = () => {
    return `
  #float-download-btn {
    position: fixed !important;
    bottom: 40px;
    right: 10px;
    transform: translateX(-50%);
    padding: 10px 20px;
    background-color: #ff2e4d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    overflow: hidden;
    position: relative;
  }
  #float-download-btn:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  #float-download-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: var(--progress, 0%);
    height: 100%;
    background-color: #ff2e4d;
    transition: width 0.3s ease;
    z-index: -1;
  }
  #float-download-btn span {
    position: relative;
    z-index: 1;
  }
`;
}

const onClick = (e, floatBtn, processHandler) => {
    const container = document.getElementById('noteContainer');
    if (container) {
        // 更新按钮状态
        floatBtn.innerHTML = '<span>下载中...</span>';
        floatBtn.disabled = true;
        const {imageUrls, videoUrls, textContent} = processHandler(container);

        // 发送数据到后台脚本并等待响应
        chrome.runtime.sendMessage(
            {
                action: 'createZip',
                imageUrls: imageUrls,
                videoUrls: videoUrls,
                textContent: textContent
            },
            function (response) {
                if (chrome.runtime.lastError) {
                    console.error('错误:', chrome.runtime.lastError);
                    floatBtn.innerHTML = '<span>下载失败</span>';
                    floatBtn.disabled = false;
                    floatBtn.style.setProperty('--progress', '0%');
                } else {
                    console.log('后台脚本的响应:', response);
                    floatBtn.innerHTML = '<span>下载完成</span>';
                    floatBtn.style.setProperty('--progress', '100%');
                    setTimeout(() => {
                        floatBtn.innerHTML = '<span>下载笔记</span>';
                        floatBtn.disabled = false;
                        floatBtn.style.setProperty('--progress', '0%');
                    }, 2000);
                }
            }
        );

        // 模拟进度条更新
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            floatBtn.style.setProperty('--progress', `${progress}%`);
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 300);
    } else {
        console.error('未找到 noteContainer。');
    }
};

export {
    crateButton,
    remoteButton
}