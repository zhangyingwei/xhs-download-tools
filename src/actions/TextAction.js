const getText = (container) => {
    // 提取文本内容
    const textElements = {
        authorDom: container.querySelector('.author-wrapper').querySelectorAll(".username"),
        noteContentDom: container.querySelectorAll('.note-content .desc'), // 仅获取 .desc 元素的内容
        commentsDom: container.querySelectorAll('.comments-container')
    }
    const authorText = Array.from(textElements.authorDom).map(el => el.innerText).join('\n\n');
    const noteText = Array.from(textElements.noteContentDom).map(el => el.innerText).join('\n\n');
    const commentsText = JSON.stringify(getComments(textElements.commentsDom))
    return {
        auth: authorText,
        note: noteText,
        comments: commentsText
    }
}

const getComments = (containers) => {
    const commentContainer = Array.from(containers)[0];
    const comments = [];
    commentContainer.querySelectorAll('.parent-comment').forEach(commentDom => {
        const author = commentDom.querySelector(".author-wrapper").querySelector(".author").innerText;
        const comment = commentDom.querySelector(".content").innerText;
        // 移除日期提取
        comments.push({
            author,
            comment
        })
    });
    return comments;
}


export {
    getText
}