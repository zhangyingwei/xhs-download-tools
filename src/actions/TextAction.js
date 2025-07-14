const getText = (container) => {
    // 提取文本内容
    const textElements = {
        authorDom: container.querySelector('.author-wrapper').querySelectorAll(".username"),
        noteDom: container.querySelectorAll('.note-content'),
        commentsDom: container.querySelectorAll('.comments-container')
    }
    // const textContent = textElements.map(el => el.innerText).join('\n\n');
    console.log("-------------",textElements)
    const authorText = Array.from(textElements.authorDom).map(el => el.innerText).join('\n\n');
    const noteText = Array.from(textElements.noteDom).map(el => el.innerText).join('\n\n');
    const commentsText = JSON.stringify(getComments(textElements.commentsDom))
    console.log("-------------",authorText,noteText,commentsText)
    return {
        auth: authorText,
        note: noteText,
        comments: commentsText
    }
}

const getComments = (containers) => {
    const commentContainer = Array.from(containers)[0];
    // Array.from(textElements.commentsDom).map(el => el.innerText).join('\n\n');
    const comments = [];
    commentContainer.querySelectorAll('.parent-comment').forEach(commentDom => {
        const author = commentDom.querySelector(".author-wrapper").querySelector(".author").innerText;
        const comment = commentDom.querySelector(".content").innerText;
        const date = commentDom.querySelector(".date").innerText;
        comments.push({
            author,
            comment,
            date
        })
    });
    return comments;
}


export {
    getText
}