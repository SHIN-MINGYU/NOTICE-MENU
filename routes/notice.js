const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const noticeMenu = require('../component/notice/noticeMenu');
const template = require('../component/template');
const createNotice = require('../component/notice/createNotice');
const noticeMain = require('../component/notice/noticeMain');
const commentList = require('../component/comment/commentList');
const updateNotice = require('../component/notice/updateNotice');
const formatdate = require('../public/js/formatdate');
const listFactory = require('../public/js/listFactory');
const bodyParser = require('body-parser');
const loginstatus = require('../public/js/loginstatus');


// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));//true는 사용자 querystring모듈을 인스톨한것을 쓸때 사용
//false는 express내장 querystring모듈을 사용
//parse application/json
router.use(bodyParser.json());

router.get('/list/:listId', function (req, res) { //Notice manu list
    const listId = req.params.listId;
    let view = 15;
    db.query('SELECT * FROM notice', function (err, allnotice) {
        db.query('SELECT * FROM notice ORDER BY notice_id desc limit ? offset ?', [view, (listId - 1) * view], function (err, notice) {
            let list = template.list(notice);
            let main = noticeMenu('전체', list, listFactory('전체', Number(listId), allnotice.length / view, req));
            let link = `<link rel ="stylesheet" href ="/css/noticeMenu.css"> `
            let html = template.HTML(link, main, loginstatus(req));
            res.send(html);
        })
    })
})


router.get('/create', function (req, res) { //게시판 생성
    db.query('SELECT * FROM notice', function (err, notice) {
        let main = createNotice(notice);
        let link = `<link rel ="stylesheet" href ="/css/CUNotice.css">`;
        let html = template.HTML(link, main, loginstatus(req));
        res.send(html);
    })
})

router.get(`/page/:pageId`, function (req, res) { //게시판 상세보기
    db.query('SELECT * FROM notice WHERE notice_id = ?', [req.params.pageId], function (err, notice) {
        db.query('SELECT * FROM comment WHERE notice_id = ?', [req.params.pageId], function (err, comment) {
            if (commentList(comment) === undefined) {
                commentList(comment) = '';
            }
            let main = noticeMain(notice, commentList(comment));
            let link = `<link rel = "stylesheet" href = "/css/noticeContent.css">`;
            let html = template.HTML(link, main, loginstatus(req));
            res.send(html);
        })
    })
})

router.get(`/page/:pageId/update`, function (req, res) {//게시판 업데이트
    db.query('SELECT * FROM notice WHERE notice_id =?', [req.params.pageId], function (err, notice) {
        let main = updateNotice(notice);
        let link = `<link rel ="stylesheet" href ="/css/CUNotice.css">`;
        let html = template.HTML(link, main, loginstatus(req));
        res.send(html);
    })
})

router.post('/create_process', function (req, res) { //게시판 생성 과정
    let NOW = formatdate(new Date());
    let title = req.body.title;
    let notice_id = req.body.notice_id;
    let name = req.body.name;
    let content = req.body.content;
    let password = req.body.password;
    db.query(`INSERT INTO notice (notice_id, title, name, date, sympathy,hate,content,password)  
                 VALUES ("${notice_id}","${title}","${name}","${NOW}",0,0,"${content}","${password}")`,
        function (err, result) {
            if (err) {
                throw err;
            }
            res.redirect('/');
        })
})

router.post(`/delete`, function (req, res) {//게시판 삭제
    let notice_id = req.body.notice_id;
    db.query('DELETE FROM sympathyGroup WHERE notice_id =?', [notice_id], function (err, result3) {
        db.query('DELETE FROM comment WHERE notice_id = ?', [notice_id], function (err, result2) {
            db.query('DELETE FROM notice WHERE notice_id =?', [notice_id], function (err, result) {
                //db안에 참조하는 속성이 있어서 위의 참조되는 속성을 먼저 제거해준후 제거 작업 실행
                //db.table.noticeの中にreferenceされるcomponentがあるからreferenceするcomponentを先に消しておく
                res.redirect('/');
            })
        })
    })
})

router.post(`/update_process`, function (req, res) { //게시판 업데이트
    let title = req.body.title;
    let notice_id = req.body.notice_id;
    let content = req.body.content;
    db.query(`UPDATE notice SET title = ?, content = ? WHERE notice_id = ?`, [title, content, notice_id], function (err, result) {
        res.redirect(`/notice/page/${notice_id}`);
    })
})
router.post(`/recommend`, function (req, res) {//공감 버튼 db에 저장
    let notice_id = req.body.notice_id;
    let isHave = false
    db.query('SELECT sympathy FROM notice WHERE notice_id = ?', [notice_id], function (err, sympathy) {
        db.query('UPDATE notice SET sympathy =? WHERE notice_id = ?', [sympathy[0].sympathy + 1, notice_id], function (err, result) {
            if (sympathy[0].sympathy > 10) {
                db.query(`SELECT * FROM sympathyGroup`, function (err, sG) {
                    for (var i = 0; i < sG.length; i++) {
                        if (sG[i].notice_id == notice_id) {
                            isHave = true;
                        }
                    }
                    if (isHave) {
                    } else {
                        db.query(`INSERT INTO sympathyGroup (sympathy_id, notice_id) VALUES (?,?)`, [sG.length, notice_id], function (err, result3) {
                        })
                    }
                })
            }
            res.redirect(`/notice/page/${notice_id}`);
        })
    })
})

router.post(`/hate`, function (req, res) {//비공감 버튼 db에 저장
    let notice_id = req.body.notice_id;
    db.query('SELECT hate FROM notice WHERE notice_id = ?', [notice_id], function (err, hate) {
        db.query('UPDATE notice SET hate =? WHERE notice_id = ?', [hate[0].hate + 1, notice_id], function (err, result) {
            res.redirect(`/notice/page/${notice_id}`);
        })
    })
})

router.post(`/search_process`, function (req, res) {
    let type = req.body.type;
    let searchText = req.body.searchText;
    res.redirect(`/search/list/1/type/${type}/searchText/${searchText}`);
})

module.exports = router;