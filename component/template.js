var ud = require('../public/js/userDiscriminate');

module.exports = {
    HTML : function(pageStyle,main){//default page
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel ="stylesheet" href = "/css/header.css">
            <link rel ="stylesheet" href ="/css/default.css">
            ${pageStyle}
        </head>
        <body>
            <div class = "header">
                <div class = "title" onClick = "location.href = '/' ">민규의 <br>고민 상담소</div>
                <div class = "menu">
                    <ul>
                        <li onClick = "location.href = '/'">HOME</li>
                        <li>여기는?</li>
                        <li>저는?</li>
                        <li>연락처</li>
                    </ul>
                </div>
            </div>
            <div class = "Desc">
                <div class = "leftside"></div>
                <div class = "main">
                ${main}
                </div>
                <div class ="rightside"></div>
            </div>
            <div class = "tail"></div>
        </body>
        </html>`;
    }, 
    list : function(notice){
        let body = '';
        var i =0;
        function formatdate(dt){
            var y = dt.getFullYear();
            var m = ('00' + (dt.getMonth()+1)).slice(-2);
            var d = ('00' + dt.getDate()).slice(-2);
            return (y + '-' + m +'-'+d );
        }
        while(i<notice.length){
            body = body+ `<tr class = "noticeClick" onClick = "location.href ='/page/${notice[i].notice_id}'">`;
            body = body + `<td>${notice[i].notice_id}</td><td>${notice[i].title}</td><td>${notice[i].name}</td><td>${formatdate(notice[i].date)}</td><td>${notice[i].sympathy}</td>`
            body = body + `</tr>`;
            i = i+1;
        }
        return body;
    }, 
    noticeMenu : function(mode,list,num,listMaxNum){ //home main
        let body = '';
        let Minnum = num-1;
        let Maxnum = num +1;
        if(Number.isInteger(listMaxNum)){// 게시글갯수에 멎춰서 인덱싱번호 생성
            listMaxNum = listMaxNum;
        }else if(Number.isInteger(listMaxNum) != true){
            listMaxNum = parseInt(listMaxNum) + 1;
        }
        if(listMaxNum > num+9){ //db에 저장된 인스턴스의 갯수만큼 인덱싱번호를 생성하기 위해
            listMaxNum = num +10;
        } else if(listMaxNum < num+9){
            listMaxNum = listMaxNum+1
        }
        if(Minnum<=0){
            Minnum = 1;
        }
        if(Maxnum >=listMaxNum){
            Maxnum = listMaxNum-1;
        }
        body = body + `<a href= "/list/${Minnum}"><이전</a>`
        for(var i= num; i< listMaxNum;i++){//리스트페이징할떄 인덱스번호 생성.
            body = body + `<a href= "/list/${i}">[${i}]</a>`
            if(i == listMaxNum-1){
                break;
            }
            body = body + ',';  
        }
        body = body + `<a href= "/list/${Maxnum}">이후></a>`
        return `
        <h3 style ="margin-left : 2vw; font-size: 1.5vw; font-family : SF_IceLemon">${mode} 글</h3>
        <div class ="choosemenu">
            <button class = "type1" onclick = "location.href ='/'">전체</button>
            <button class = "type2" onclick = "location.href ='/sympathy/list/1'" >공감</button>
            <script>
                let allType = document.querySelector('.type1');
                let sympathyType = document.querySelector('.type2');
                let mode = document.querySelector('h3');
                if(mode.textContent == '전체 글'){
                    allType.style.backgroundColor = 'blue';
                } else if(mode.textContent == '공감 글'){
                    sympathyType.style.backgroundColor = 'blue';
                }
            </script>
        </div>
        <div style ="margin-left : 2vw; margin-right:2vw; margin-top : 0.5vw; text-align:center">
            <div class ="noticeHeader">
                <table style ="width:100%; text-align: center; ">
                    <colgroup>
                        <col style ="width:7%">
                        <col>
                        <col style ="width:7%">
                        <col style ="width:14%">
                        <col style ="width:7%">
                    </colgroup>
                    <thead>
                        <tr>
                            <td>번호</td>
                            <td>제목</td>
                            <td>작성자</td>
                            <td>작성일자</td>
                            <td>공감수</td>
                        </tr>
                    </thead>
                    <tbody>
                       ${list}
                    </tbody>
                </table>
            </div>
            <div style ="display:inline-block; font-family : SF_IceLemon">${body}</div>
            <button style = "float : right;"onClick ="location.href='/create'">생성</button>
        </div>
    `
    },
    createNotice : function(notice){//게시판 생성
        return`
        <h3>글 생성하기</h3>
        <form action = "/create_notice" method="post">
            <input class ="noticeTitle" name="title" type ="text" placeholder ="제목을 입력해주세요">
            <input type ="hidden" name="notice_id" value="${notice.length}">
            <input class = "noticeNP" type ="text" name ="name" placeholder ="이름">
            <input class = "noticeNP" type ="text" name ="password" placeholder ="비밀번호">
            <textarea class ="noticeContent" name="content" placeholder ="내용을 입력해주세요" ></textarea>
            <div><button type ="submit">생성</button></div>
        </form>
        <button onclick ="location.href = '/'" style ="float : right; margin-top: 1%; margin-right : 1%">취소</button>
        `;
    },noticeMain : function(notice,commentList){ //게시판 상세보기
        function formatdate(dt){
            var y = dt.getFullYear();
            var m = ('00' + (dt.getMonth()+1)).slice(-2);
            var d = ('00' + dt.getDate()).slice(-2);
            return (y + '-' + m +'-'+d );
        }
        return `
            <h1>고민 상담</h1>
            <div class ="notice_header"><!-- 게시글 만 wrap-->
                <h3>${notice[0].title}</h3>
                <div class="noticeUI"><!-- 이름 시간 수정 삭제 wrap -->
                    <spam>${notice[0].name}</spam> 
                    <div style ="display:inline-block; float:right;"><!-- 시간, 수정, 삭제 wrap -->
                        <spam>${formatdate(notice[0].date)}</spam>
                        <button class ="notice_update" onClick = "${ud.modal(notice[0].password,notice[0].notice_id,'update_notice')}">수정</button>
                        <!-- 게시글 수정 -->
                        <form action="/delete_notice" method ="post" id = "form_delete_notice" style ="display:inline-block;" onsumbit = "return false;">
                            <!-- 게시글 삭제 -->
                            <input type ="hidden" name = "notice_id" value ="${notice[0].notice_id}">
                            <button type = "button" class ="notice_delete" onClick ="${ud.modal(notice[0].password, notice[0].notice_id,'delete_notice')}">삭제</button>
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
                    <form action ="/recommend" method = "post" style ="display: inline-block;">
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
            <form class ="commentcreate" action = "/create_comment" method ="post">
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
    },commentList : function(comment){
        let body = '';
        var i =0;
        while(i<comment.length){
            body = body + `<div style ="border-bottom : 1px gray solid;">
                                <div style ="width: 10%; height: 100%; display : inline-block; float: left;">${comment[i].Cname}</div>
                                <div style ="float:right;"><spam>2020-02-02</spam>
                                <form style = "display : inline-block" action ="/delete_comment" id = "form_delete_comment" method = "post">
                                    <input type = "hidden" name = "comment_id" value ="${comment[i].comment_id}">
                                    <input type = "hidden" name = "notice_id" value = "${comment[i].notice_id}">
                                    <button type = "button" class ="comment_delete_button" onClick = "${ud.modal(comment[i].Cpassword,comment[i].comment_id,'delete_comment')}">삭제</button>
                                    </form>
                                    </div>
                                    <div style ="width : 70%; display: inline-block; white-space:pre-line;
                                    word-break:break-all; padding: 1%;">${comment[i].Ccontent}</div> 
                            </div>`;
            i = i+1;
        }
        
        return body;
    }, updateNotice : function(notice){// 글 수정
        return`
        <h3>글 수정</h3>
        <form action = "/update_notice" method="post">
            <input class ="noticeTitle" name="title" type ="text" value = "${notice[0].title}">
            <input type ="hidden" name="notice_id" value="${notice[0].notice_id}">
            <textarea class ="noticeContent" name="content">${notice[0].content}</textarea>
            <div><button type ="submit">수정</button></div>
        </form>
        <button onclick ="location.href = '/page/${notice[0].notice_id}'" style ="float : right; margin-top: 1%; margin-right : 1%">취소</button>
        `;

    }
}
