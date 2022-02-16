const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const noticeMenu = require('../component/notice/noticeMenu');
const template = require('../component/template');
const pageListing = require('../public/js/listFactory');
const loginstatus = require('../public/js/loginstatus');

router.get('/', function (req, res) {//home main
    let view = 15;
    db.query('SELECT * FROM notice', function (err, allnotice) {
        db.query('SELECT * FROM notice ORDER BY notice_id desc limit ? offset ?', [view, 0], function (err, notice) {
            let list = template.list(notice);
            let main = noticeMenu('전체', list, pageListing('전체', 1, allnotice.length / view));
            let link = `<link rel ="stylesheet" href ="/css/noticeMenu.css"> `
            let html = template.HTML(link, main, loginstatus(req));
            res.send(html);
        });
    })
})

module.exports = router;