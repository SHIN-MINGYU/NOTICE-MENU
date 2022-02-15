const ud = require('../../public/js/userDiscriminate');
module.exports = function (comment) {
    let body = '';
    var i = 0;
    while (i < comment.length) {
        body = body + `<div style ="border-bottom : 1px gray solid;">
                            <div style ="width: 10%; height: 100%; display : inline-block; float: left;">${comment[i].Cname}</div>
                            <div style ="float:right;"><spam>2020-02-02</spam>
                            <form style = "display : inline-block" action ="/comment/delete_process" id = "form_delete_comment" method = "post">
                                <input type = "hidden" name = "comment_id" value ="${comment[i].comment_id}">
                                <input type = "hidden" name = "notice_id" value = "${comment[i].notice_id}">
                                <button type = "button" class ="comment_delete_button" onClick = "${ud.modal(comment[i].Cpassword, comment[i].comment_id, 'delete_comment')}">삭제</button>
                            </form>
                                </div>
                                <div style ="width : 70%; display: inline-block; white-space:pre-line;
                                word-break:break-all; padding: 1%;">${comment[i].Ccontent}</div> 
                        </div>`;
        i = i + 1;
    }

    return body;
}