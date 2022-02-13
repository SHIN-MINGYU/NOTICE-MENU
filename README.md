1. 알게 된 것
    res.send() => 우리가 어떤 데이터를 보내는지를 알아서 파악한다음 알맞게 content-type을 지정해 준다.
    res.end() => 보내줄 데이터가 없을 떄, 보통 404를 리턴해줘야 할때

    strict equal operator는 값과 타입가지고 검사  equal operator 값만가지고 검사
    
    라우팅주소가 /page/:pageId 일때 /page/1의 request.params.pageId는 1인데 이때 1은 문자열이다. 