const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const noticeMenu = require('../component/notice/noticeMenu');
const template = require('../component/template');

router.get('/list/:listId', function (req, res) { //Notice manu list
    db.query('SELECT * FROM notice INNER JOIN sympathyGroup ON notice.notice_id = sympathyGroup.notice_id', function (err, allnotice) {
        db.query(`SELECT * FROM notice INNER JOIN sympathyGroup ON notice.notice_id = sympathyGroup.notice_id 
        WHERE sympathy_id >= ? AND sympathy_id <= ? ORDER BY sympathy_id desc`, [(allnotice.length) - (15 * req.params.listId), (allnotice.length - 1) - (req.params.listId - 1) * 15],
            function (err, notice) {
                let list = template.list(notice);
                let main = noticeMenu('공감', list, Number(req.params.listId), allnotice.length / 15);
                let link = `<link rel ="stylesheet" href ="/css/noticeMenu.css"> `
                let html = template.HTML(link, main);
                res.send(html);
            })
    })
})


module.exports = router;