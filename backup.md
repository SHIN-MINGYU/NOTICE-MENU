<h1>고민 상담</h1>
            <div class ="notice_header">
                <h3>${notice[0].title}</h3>
                <div class="noticeUI"><spam>${notice[0].name}</spam> 
                <div style ="display:inline-block; float:right;"><spam>${formatdate(notice[0].date)}</spam>
                <button class ="notice_update" onClick = "location.href = '/page/${notice[0].notice_id}/update'">수정</button>
                <form action="/delete_notice" method ="post" style ="display:inline-block;">
                    <input type ="hidden" name = "notice_id" value ="${notice[0].notice_id}">
                    <button type ="submit"  class ="notice_delete">삭제</button>
                </form></div></div>
                <p>${notice[0].content}</p>
                <div class ="noticeSideBanner"></div>
            </div>
            <form class ="commentcreate" action = "/create_comment" method ="post">
                <div>
                <input type ="hidden" name = "id" value = "${notice[0].notice_id}">
                <input type ="text" name ="name" placeholder= "name">
                <input type="text" name = "password" placeholder="password"></div>
                <div><textarea name="content" class ="comment_content"></textarea> <button type ="submit">작성</button></div>
            </form>
            <div class ="comment" style ="margin-left:2vw; margin-right:2vw;">
            ${commentList}
            </br>
        </div>