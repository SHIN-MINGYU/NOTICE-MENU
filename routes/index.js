const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const noticeMenu = require('../component/notice/noticeMenu');
const template = require('../component/template');

router.get('/', function (req, res) {//home main
    db.query('SELECT * FROM notice', function (err, allnotice) {
        db.query('SELECT * FROM notice WHERE notice_id>=? AND notice_id <= ? ORDER BY notice_id desc', [(allnotice.length) - 15, (allnotice.length) - 1], function (err, notice) {
            let list = template.list(notice);
            let main = noticeMenu('전체', list, 1, allnotice.length / 15);
            let link = `<link rel ="stylesheet" href ="/css/noticeMenu.css"> `
            let html = template.HTML(link, main);
            res.send(html);
        });
    })
})

module.exports = router;