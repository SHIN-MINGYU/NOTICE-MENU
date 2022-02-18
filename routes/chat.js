const express = require('express');
const sympathyChat = require('../component/chat/sympathyChat');
const template = require('../component/template');
const loginstatus = require('../public/js/loginstatus');
const router = express.Router();

router.get('/', function (req, res) {
    let link = '<link rel ="stylesheet" href ="/css/chat.css">';
    res.send(html);
})

module.exports = router;