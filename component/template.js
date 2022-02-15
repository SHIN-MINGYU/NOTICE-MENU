module.exports = {
    HTML: function (pageStyle, main) {//default page
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
    list: function (notice) {
        let body = '';
        var i = 0;
        function formatdate(dt) {
            var y = dt.getFullYear();
            var m = ('00' + (dt.getMonth() + 1)).slice(-2);
            var d = ('00' + dt.getDate()).slice(-2);
            return (y + '-' + m + '-' + d);
        }
        while (i < notice.length) {
            body = body + `<tr class = "noticeClick" onClick = "location.href ='/notice/page/${notice[i].notice_id}'">`;
            body = body + `<td>${notice[i].notice_id}</td><td>${notice[i].title}</td><td>${notice[i].name}</td><td>${formatdate(notice[i].date)}</td><td>${notice[i].sympathy}</td>`
            body = body + `</tr>`;
            i = i + 1;
        }
        return body;
    }
}
