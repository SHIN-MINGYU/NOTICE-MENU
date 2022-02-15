module.exports = function (notice) {// 글 수정
    return `
    <h3>글 수정</h3>
    <form action = "/notice/update_process" method="post">
        <input class ="noticeTitle" name="title" type ="text" value = "${notice[0].title}">
        <input type ="hidden" name="notice_id" value="${notice[0].notice_id}">
        <textarea class ="noticeContent" name="content">${notice[0].content}</textarea>
        <div><button type ="submit">수정</button></div>
    </form>
    <button onclick ="location.href = '/notice/page/${notice[0].notice_id}'" style ="float : right; margin-top: 1%; margin-right : 1%">취소</button>
    `;

}