const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const noticeMenu = require('../component/notice/noticeMenu');
const template = require('../component/template');
const listFactory = require('../public/js/listFactory');
const loginstatus = require('../public/js/loginstatus');

router.get('/list/:listId', function (req, res) { //Notice manu list
    let view = 15
    let listId = req.params.listId;
    db.query('SELECT * FROM notice INNER JOIN sympathyGroup ON notice.notice_id = sympathyGroup.notice_id', function (err, allnotice) {
        db.query(`SELECT * FROM notice INNER JOIN sympathyGroup ON notice.notice_id = sympathyGroup.notice_id 
         ORDER BY sympathy_id desc limit ? offset ?`, [view, (req.params.listId - 1) * view],
            function (err, notice) {
                let list = template.list(notice);
                let main = noticeMenu('공감', list, listFactory('공감', Number(listId), allnotice.length / view, req));
                let link = `<link rel ="stylesheet" href ="/css/noticeMenu.css"> `
                let html = template.HTML(link, main, loginstatus(req));
                res.send(html);
            })
    })
})


module.exports = router;