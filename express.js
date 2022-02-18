const express = require('express');
const indexRouter = require('./routes/index');
const noticeRouter = require('./routes/notice');
const sympathyRouter = require('./routes/sympathy');
const commentRouter = require('./routes/comment');
const searchRouter = require('./routes/search');
const authRouter = require('./routes/auth');
const db = require('./lib/db');
const chatRouter = require('./routes/chat');
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

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
    key: ' f919208d949256bc062e5c23e02ba9a2',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
    }
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));//true는 사용자 querystring모듈을 인스톨한것을 쓸때 사용
//false는 express내장 querystring모듈을 사용
//parse application/json
app.use(bodyParser.json());



app.use(express.static(path.join(__dirname + '/public')));

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, done) {
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    console.log('deserializeUser');
    db.query('SELECT * FROM login_info WHERE id = ?', [id], function (err, user) {
        done(null, user);
    })
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        db.query('SELECT * FROM login_info WHERE id = ?', [username], function (err, logininfo) {
            if (err) {
                console.log(0);
                return done(err);
            }
            if (logininfo == '') {
                console.log(1);
                return done(null, false, { message: 'Incorrect username' })
            } else if (logininfo[0].password != password) {
                console.log(2);
                return done(null, false, { message: 'Incorrect password' });
            }
            console.log(3);
            return done(null, logininfo[0]);
        })
    }
))




app.use('/', indexRouter);
app.use('/notice', noticeRouter);
app.use('/comment', commentRouter);
app.use('/sympathy', sympathyRouter);
app.use('/search', searchRouter);
app.use('/auth', authRouter);
app.use('/chat', chatRouter);
app.post('/auth/login_process', passport.authenticate('local', {
    failureRedirect: '/'
}), function (req, res) {
    req.session.save(() =>
        res.redirect('/'));
})


app.listen(port);