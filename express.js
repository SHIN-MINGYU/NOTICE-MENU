const express = require('express');
const indexRouter = require('./routes/index');
const noticeRouter = require('./routes/notice');
const sympathyRouter = require('./routes/sympathy');
const commentRouter = require('./routes/comment');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname + '/public')));

app.use('/', indexRouter);
app.use('/notice', noticeRouter);
app.use('/comment', commentRouter);
app.use('/sympathy', sympathyRouter);

app.listen(port);