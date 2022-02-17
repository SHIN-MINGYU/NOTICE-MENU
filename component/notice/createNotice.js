module.exports = function (notice) {//게시판 생성
    let notice_id = notice[notice.length - 1].notice_id + 1;
    return `
    <h3>글 생성하기</h3>
    <form action = "/notice/create_process" method="post">
        <input class ="noticeTitle" name="title" type ="text" placeholder ="제목을 입력해주세요">
        <input type ="hidden" name="notice_id" value="${notice_id}">
        <input class = "noticeNP" type ="text" name ="name" placeholder ="이름">
        <input class = "noticeNP" type ="text" name ="password" placeholder ="비밀번호">
        <textarea class ="noticeContent" name="content" placeholder ="내용을 입력해주세요" ></textarea>
        <div><button type ="submit">생성</button></div>
    </form>
    <button onclick ="location.href = '/'" style ="float : right; margin-top: 1%; margin-right : 1%">취소</button>
    `;
}