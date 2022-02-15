const ud = require('../../public/js/userDiscriminate');
const formatdate = require('../../public/js/formatdate');

module.exports = function (notice, commentList) { //게시판 상세보기
    return `
        <h1>고민 상담</h1>
        <div class ="notice_header"><!-- 게시글 만 wrap-->
            <h3>${notice[0].title}</h3>
            <div class="noticeUI"><!-- 이름 시간 수정 삭제 wrap -->
                <spam>${notice[0].name}</spam> 
                <div style ="display:inline-block; float:right;"><!-- 시간, 수정, 삭제 wrap -->
                    <spam>${formatdate(notice[0].date)}</spam>
                    <button class ="notice_update" onClick = "${ud.modal(notice[0].password, notice[0].notice_id, 'update_notice')}">수정</button>
                    <!-- 게시글 수정 -->
                    <form action="/notice/delete" method ="post" id = "form_delete_notice" style ="display:inline-block;" onsumbit = "return false;">
                        <!-- 게시글 삭제 -->
                        <input type ="hidden" name = "notice_id" value ="${notice[0].notice_id}">
                        <button type = "button" class ="notice_delete" onClick ="${ud.modal(notice[0].password, notice[0].notice_id, 'delete_notice')}">삭제</button>
                    </form>
                </div>
            </div>
                <p>${notice[0].content}</p>
            <div class ="noticeSideBanner"></div>
        </div>
        <div class ="recommend_box">
        <!--추천 비추천박스-->
            <div class ="recommend">
                <span>${notice[0].sympathy}</span>
                <form action ="/notice/recommend" method = "post" style ="display: inline-block;">
                    <input type ="hidden" value ="${notice[0].notice_id}" name ="notice_id" >
                    <button><img src ="/picture/good.png"></button>
                </form>
            </div>
            <div class = "hate">
            <form action ="/hate" method = "post" style ="display: inline-block;">
                <input type ="hidden" value ="${notice[0].notice_id}" name ="notice_id" >
                <button><img src ="/picture/hate.png"></button>
            </form>
                <span>${notice[0].hate}</span>
            </div>
        </div>
        <form class ="commentcreate" action = "/comment/create_process" method ="post">
        <!-- 댓글 생성 -->
            <div>
                <input type ="hidden" name = "id" value = "${notice[0].notice_id}">
                <input type ="text" name ="name" placeholder= "name">
                <input type="text" name = "password" placeholder="password"></div>
                <div>
                    <textarea name="content" class ="comment_content"></textarea> 
                    <button type ="submit">작성</button>
                </div>
        </form>
        <div class ="comment" style ="margin-left:2vw; margin-right:2vw;"><!-- 댓글 리스트-->
        ${commentList}</br></div>
    `;
}