const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const noticeMenu = require('../component/notice/noticeMenu');
const template = require('../component/template');
const listFactory = require('../public/js/listFactory');
const loginstatus = require('../public/js/loginstatus');

router.get('/list/:listId/type/:typeId/searchText/:textId', function (req, res) { //search
    const type = req.params.typeId;
    const text = req.params.textId;
    const listId = req.params.listId
    let view = 15;
    db.query(`SELECT * FROM notice WHERE ${type} LIKE '%${text}%'`, function (err, allnotice) {
        db.query(`SELECT * FROM notice WHERE ${type} LIKE '%${text}%' ORDER BY notice_id desc limit ? offset ?`,
            [view, (listId - 1) * view], function (err, notice) {
                let list = template.list(notice);
                let main = noticeMenu('검색', list, listFactory('검색', Number(listId), allnotice.length / view, req));
                let link = `<link rel ="stylesheet" href ="/css/noticeMenu.css"> `
                let html = template.HTML(link, main, loginstatus(req));
                res.send(html);
            })
    })
})

module.exports = router;