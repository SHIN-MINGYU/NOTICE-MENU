module.exports = function (mode, num, listMaxNum, req) {
    let pageListing = ''
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
    } else if (mode == `검색`) {
        pagingMode = `/search`
    }
    if (mode == '전체' || mode == '공감') {
        pageListing = pageListing + `<a href= "${pagingMode}/list/${Minnum}"><이전</a>`
        for (var i = num; i < listMaxNum; i++) {//리스트페이징할떄 인덱스번호 생성.
            pageListing = pageListing + `<a href= "${pagingMode}/list/${i}">[${i}]</a>`
            if (i == listMaxNum - 1) {
                break;
            }
            pageListing = pageListing + ',';
        }
        pageListing = pageListing + `<a href= "${pagingMode}/list/${Maxnum}">이후></a>`
    }
    else if (mode == '검색') {
        pageListing = pageListing + `<a href= "${pagingMode}/list/${Minnum}/type/${req.params.typeId}/searchText/${req.params.textId}"><이전</a>`
        for (var i = num; i < listMaxNum; i++) {//리스트페이징할떄 인덱스번호 생성.
            pageListing = pageListing + `<a href= "${pagingMode}/list/${i}/type/${req.params.typeId}/searchText/${req.params.textId}">[${i}]</a>`
            if (i == listMaxNum - 1) {
                break;
            }
            pageListing = pageListing + ',';
        }
        pageListing = pageListing + `<a href= "${pagingMode}/list/${Maxnum}/type/${req.params.typeId}/searchText/${req.params.textId}">이후></a>`
    }
    return pageListing;
}
