(() => {
    function findVideoUrlFromInitialState() {
        if (window.__INITIAL_STATE__ && window.__INITIAL_STATE__.note && window.__INITIAL_STATE__.note.noteDetailMap) {
            const noteId = Object.keys(window.__INITIAL_STATE__.note.noteDetailMap)[0];
            if (noteId) {
                const noteDetail = window.__INITIAL_STATE__.note.noteDetailMap[noteId];
                if (noteDetail && noteDetail.note && noteDetail.note.video && noteDetail.note.video.media && noteDetail.note.video.media.stream && noteDetail.note.video.media.stream.h264 && noteDetail.note.video.media.stream.h264.length > 0) {
                    return noteDetail.note.video.media.stream.h264[0].masterUrl || noteDetail.note.video.media.stream.h264[0].backupUrls[0];
                }
            }
        }
        return null;
    }

    function getMetadataFromInitialState() {
        const metadata = {};
        if (window.__INITIAL_STATE__) {
            // 1. 登录用户信息
            if (window.__INITIAL_STATE__.user && window.__INITIAL_STATE__.user.loggedIn && window.__INITIAL_STATE__.user.userInfo && window.__INITIAL_STATE__.user.userInfo._value) {
                metadata.loggedInUser = {
                    nickname: window.__INITIAL_STATE__.user.userInfo._value.nickname,
                    userId: window.__INITIAL_STATE__.user.userInfo._value.userId,
                    avatar: window.__INITIAL_STATE__.user.userInfo._value.images
                };
            }

            // 笔记相关信息
            if (window.__INITIAL_STATE__.note && window.__INITIAL_STATE__.note.noteDetailMap) {
                const noteId = Object.keys(window.__INITIAL_STATE__.note.noteDetailMap)[0];
                if (noteId) {
                    const noteDetail = window.__INITIAL_STATE__.note.noteDetailMap[noteId];
                    if (noteDetail && noteDetail.note) {
                        // 2. 笔记用户信息
                        if (noteDetail.note.user) {
                            metadata.noteUser = {
                                nickname: noteDetail.note.user.nickname,
                                userId: noteDetail.note.user.userId,
                                avatar: noteDetail.note.user.avatar
                            };
                        }

                        // 3. 笔记中图片地址
                        if (noteDetail.note.imageList && noteDetail.note.imageList.length > 0) {
                            metadata.imageUrls = noteDetail.note.imageList.map(img => img.urlDefault || img.urlPre);
                        }

                        // 4. 笔记中视频地址 (从 findVideoUrlFromInitialState 获取)
                        metadata.videoUrl = findVideoUrlFromInitialState();

                        // 5. 笔记的标签
                        if (noteDetail.note.tagList && noteDetail.note.tagList.length > 0) {
                            metadata.tags = noteDetail.note.tagList.map(tag => tag.name);
                        }

                        // 6. 笔记内容
                        if (noteDetail.note.desc) {
                            metadata.content = noteDetail.note.desc;
                        }
                    }
                }
            }
        }
        return metadata;
    }

    // 检查 window.__INITIAL_STATE__ 是否可用且包含笔记详情
    const checkInitialStateInterval = setInterval(() => {
        if (window.__INITIAL_STATE__ && window.__INITIAL_STATE__.note && window.__INITIAL_STATE__.note.noteDetailMap && Object.keys(window.__INITIAL_STATE__.note.noteDetailMap).length > 0) {
            clearInterval(checkInitialStateInterval);
            const metadata = getMetadataFromInitialState();
            window.postMessage({ type: 'XHS_DOWNLOADER_DATA', payload: metadata }, '*');
        }
    }, 500); // 每500毫秒检查一次
})();
