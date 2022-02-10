module.exports = {
    HTML : function(pageStyle,main){
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel ="stylesheet" href = "./header.css">
            <link rel ="stylesheet" href ="./default.css">
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
    noticeMenu : function(list){
        return `
        <h3 style ="margin-left : 2vw">전체 글</h3>
        <div class ="choosemenu">
            <button class = "type" style ="background-color: blue;">전체</button>
            <button class = "type">공감</button>
        </div>
        <div style ="margin-left : 2vw; margin-right:2vw; margin-top : 0.5vw">
            <div class ="noticeHeader">
                <table style ="width:100%; text-align: center;">
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
                <button style = "float : right;"onClick ="location.href='/create'">생성</button>
            </div>
        </div>
    `
    },
    createMain : function(notice){
        return`
        <h3>글 생성하기</h3>
        <form action = "/create_process" method="post">
            <input class ="noticeTitle" name="title" type ="text" placeholder ="제목을 입력해주세요">
            <input type ="hidden" name="notice_id" value="${notice.length}">
            <input class = "noticeName" type ="text" name ="name" placeholder ="이름">
            <textarea class ="noticeContent" name="content" placeholder ="내용을 입력해주세요" ></textarea>
            <div><button type ="submit">생성</button></div>
        </form>
        <button onclick ="location.href = '/'" style ="float : right; margin-top: 1%; margin-right : 1%">취소</button>
        `;
    },noticeMain : function(notice){
        function formatdate(dt){
            var y = dt.getFullYear();
            var m = ('00' + (dt.getMonth()+1)).slice(-2);
            var d = ('00' + dt.getDate()).slice(-2);
            return (y + '-' + m +'-'+d );
        }
        return `
            <h1>고민 상담</h1>
            <div class ="notice_header">
                <h3>${notice[0].title}</h3>
                <div class="noticeUI"><spam>${notice[0].name}</spam>  <spam>${formatdate(notice[0].date)}</spam>
                <form action="/delete_process" method ="post" style ="display:inline-block; float: right;">
                    <input type ="hidden" name = "notice_id" value ="${notice[0].notice_id}">
                    <button type ="submit"  class ="delete">삭제</button>
                </form></div>
                <p>${notice[0].content}</p>
                <div class ="noticeSideBanner"></div>
            </div>
            <form class ="comment" method ="post">
                <div><input type ="text" placeholder= "name">
                    <input type="text" placeholder="password"></div>
                <textarea class ="comment_content"></textarea><br>
                <button type ="submit">작성</button>
            </form>
        `;
    }
}