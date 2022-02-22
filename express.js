const express = require('express');
const indexRouter = require('./routes/index');
const noticeRouter = require('./routes/notice');
const sympathyRouter = require('./routes/sympathy');
const commentRouter = require('./routes/comment');
const searchRouter = require('./routes/search');
const authRouter = require('./routes/auth');
const path = require('path');
const app = express();
const port = 3000;

var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '@tlsalsrb123',
    database: 'nayami'
};

var connection = mysql.createConnection(options); // or mysql.createPool(options);
var sessionStore = new MySQLStore({}/* session store options */, connection);

app.use(session({
    key: 'asdfasdf@FASDEWRASFDAfdsfasdfde23',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 3600,
    }

}));
app.use(express.static(path.join(__dirname + '/public')));

app.use('/', indexRouter);
app.use('/notice', noticeRouter);
app.use('/comment', commentRouter);
app.use('/sympathy', sympathyRouter);
app.use('/search', searchRouter);
app.use('/auth', authRouter);

app.listen(port);