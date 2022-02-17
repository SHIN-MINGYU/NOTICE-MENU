const longinWindow = require('./loginWindow');

module.exports = function (req) {
    if (req.session.isLogined) {
        return `<div class = "login">
        <span style ="color : blue; margin-right: 1vw">${req.session.nickname}</span >
        <a onclick = "location.href = '/auth/logout_process'">logout</a></div>`;
    }
    else {
        return `<div class = "login" onclick = "${longinWindow(0, 0, 'update_notice')}"><span></span><a>login</a></div>`;
    }
}