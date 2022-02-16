module.exports = function (mode, list, pageListing) { //home main
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
            <div style ="display:inline-block; font-family : SF_IceLemon">${pageListing}</div>
            <button style = "float : right;"onClick ="location.href='/notice/create'">생성</button>
            <br>
            <form action = "/notice/search_process" method = "post">
                <select name = "type">
                    <option value = "content" selected = "selected">내용</option>
                    <option value = "name">이름</option>
                </select>
                <input type = "text" name = "searchText"/>
                <button type = "submit">검색</button>
            </form>
        </div>
    `
}
