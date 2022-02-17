const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../lib/db');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));//true는 사용자 querystring모듈을 인스톨한것을 쓸때 사용
//false는 express내장 querystring모듈을 사용
//parse application/json
router.use(bodyParser.json());


router.post('/login_process', function (req, res) {
    let uid = req.body.uid;
    let upass = req.body.upass;
    let nickname = '';
    let isLogined = false;
    db.query('SELECT * FROM login_info', function (err, login_info) {
        for (var i = 0; i < login_info.length; i++) {
            if (uid == login_info[i].id && upass == login_info[i].password) {
                isLogined = true;
                nickname = login_info[i].nickname;
                break;
            }
        }
        if (isLogined) {
            req.session.isLogined = true;
            req.session.nickname = nickname;
            req.session.save();
            res.redirect('/');
        } else if (!isLogined) {
            console.log('로그인 정보 x');
            res.redirect('/');
        }
    })
})

router.get('/logout_process', function (req, res) {
    req.session.destroy(function (error) {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/');
        }

    });
})
module.exports = router;