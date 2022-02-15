module.exports = function (mode, list, num, listMaxNum) { //home main
    let body = '';
    let pagingMode = '';
    let Minnum = num - 1;
    let Maxnum = num + 1;
    if (Number.isInteger(listMaxNum)) {// 게시글갯수에 멎춰서 인덱싱번호 생성
        listMaxNum = listMaxNum;
    } else if (Number.isInteger(listMaxNum) != true) {
        listMaxNum = parseInt(listMaxNum) + 1;
    }
    if (listMaxNum > num + 9) { //db에 저장된 인스턴스의 갯수만큼 인덱싱번호를 생성하기 위해
        listMaxNum = num + 10;
    } else if (listMaxNum < num + 9) {
        listMaxNum = listMaxNum + 1
    }
    if (Minnum <= 0) { //이전 이후의 최솟 최댓범위
        Minnum = 1;
    }
    if (Maxnum >= listMaxNum) {
        Maxnum = listMaxNum - 1;
    }
    if (mode == '전체') {
        pagingMode = `/notice`;
    } else if (mode == '공감') {
        pagingMode = `/sympathy`;
    }
    body = body + `<a href= "${pagingMode}/list/${Minnum}"><이전</a>`
    for (var i = num; i < listMaxNum; i++) {//리스트페이징할떄 인덱스번호 생성.
        body = body + `<a href= "${pagingMode}/list/${i}">[${i}]</a>`
        if (i == listMaxNum - 1) {
            break;
        }
        body = body + ',';
    }
    body = body + `<a href= "${pagingMode}/list/${Maxnum}">이후></a>`
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
            <button style = "float : right;"onClick ="location.href='/notice/create'">생성</button>
        </div>
    `
}
