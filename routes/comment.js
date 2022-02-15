const express = require('express');
const router = express.Router();
const qs = require('querystring');
const bodyParser = require('body-parser');
const db = require('../lib/db');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));//true는 사용자 querystring모듈을 인스톨한것을 쓸때 사용
//false는 express내장 querystring모듈을 사용
//parse application/json
router.use(bodyParser.json());


router.post(`/create_process`, function (req, res) { //댓글 생성 과정
    let name = req.body.name;
    let password = req.body.password;
    let notice_id = req.body.id;
    let content = req.body.content;
    db.query(`SELECT * FROM comment`, function (err, comment) {
        if (err) {
            throw err;
        }
        db.query(`INSERT INTO comment (Cname, Cpassword, Ccontent,comment_id,notice_id) VALUES ("${name}","${password}","${content}",${comment.length},${notice_id})`,
            function (err, result) {
                if (err) {
                    throw err;
                }
                res.redirect(`/notice/page/${notice_id}`);
            })
    })
})


router.post(`/delete_process`, function (req, res) {//댓글 제거 process
    let comment_id = req.body.comment_id;
    let notice_id = req.body.notice_id;
    db.query('DELETE FROM comment WHERE comment_id = ?', [comment_id], function (err, result) {
        res.redirect(`/notice/page/${notice_id}`);
    })
})


module.exports = router;