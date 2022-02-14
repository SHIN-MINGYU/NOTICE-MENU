const express =require('express');
const qs = require('querystring');
let template = require('./component/template');
let db = require('./lib/db');
let path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname+'/public')));

app.get('/',function(req,res){//home main
    db.query('SELECT * FROM notice',function(err,allnotice){
        db.query('SELECT * FROM notice WHERE notice_id>=? AND notice_id <= ? ORDER BY notice_id desc',[(allnotice.length)-15 ,(allnotice.length)-1],function(err,notice){
            let list = template.list(notice);
            let main = template.noticeMenu('전체',list,1,allnotice.length/15);
            let link =`<link rel ="stylesheet" href ="/css/noticeMenu.css"> `
            let html = template.HTML(link,main);
            res.send(html);
        });
    })
})
app.get('/list/:listId',function(req,res){ //Notice manu list
    db.query('SELECT * FROM notice',function(err, allnotice){
        db.query('SELECT * FROM notice WHERE notice_id>= ? AND notice_id <= ? ORDER BY notice_id desc',[(allnotice.length)-(15*req.params.listId),(allnotice.length-1)-(req.params.listId-1)*15],function(err,notice){
            let list = template.list(notice);
            let main = template.noticeMenu('전체',list,Number(req.params.listId),allnotice.length/15);
            let link =`<link rel ="stylesheet" href ="/css/noticeMenu.css"> `
            let html = template.HTML(link,main);
            res.send(html);
        })
    })
})

app.get('/sympathy/list/:listId',function(req,res){ //Notice manu list
    db.query('SELECT * FROM notice WHERE sympathy >= 10',function(err, allnotice){
        db.query('SELECT * FROM notice WHERE sympathy >=10 ORDER BY notice_id desc',function(err,notice){
            let list = template.list(notice);
            let main = template.noticeMenu('공감',list,Number(req.params.listId),allnotice.length/15);
            let link =`<link rel ="stylesheet" href ="/css/noticeMenu.css"> `
            let html = template.HTML(link,main);
            res.send(html);
        })
    })
})

app.get('/create',function(req,res){ //게시판 생성
    db.query('SELECT * FROM notice',function(err, notice){
        let main = template.createNotice(notice);
        let link = `<link rel ="stylesheet" href ="/css/CUNotice.css">`;
        let html = template.HTML(link, main);
        res.end(html);
    })
})
app.get(`/page/:pageId`,function(req, res){ //게시판 상세보기
    db.query('SELECT * FROM notice WHERE notice_id = ?',[req.params.pageId],function(err, notice){
        db.query('SELECT * FROM comment WHERE notice_id = ?',[req.params.pageId],function(err,comment){
            let commentList =template.commentList(comment);
            if(commentList === undefined){
                commentList = '';
            }
            let main = template.noticeMain(notice,commentList);
            let link = `<link rel = "stylesheet" href = "/css/noticeContent.css">`;
            let html = template.HTML(link,main);
            res.send(html);
        })
    })
})

app.get(`/page/:pageId/update`,function(req,res){//게시판 업데이트
    db.query('SELECT * FROM notice WHERE notice_id =?',[req.params.pageId],function(err,notice){
            let main = template.updateNotice(notice);
            let link = `<link rel ="stylesheet" href ="/css/CUNotice.css">`;
            let html = template.HTML(link, main);
            res.send(html);
    })
})

app.post('/create_notice',function(req,res){ //게시판 생성 과정
    var body = '';
    req.on('data',function(data){
        body = body + data;
    })
    req.on('end', function(){
        const post =qs.parse(body);
        function formatdate(dt){
            var y = dt.getFullYear();
            var m = ('00' + (dt.getMonth()+1)).slice(-2);
            var d = ('00' + dt.getDate()).slice(-2);
            return (y + '-' + m +'-'+d );
        }
        let NOW = formatdate(new Date());
        let title = post.title;
        let notice_id = post.notice_id;
        let name = post.name;
        let content = post.content;
        let password = post.password;
        db.query(`INSERT INTO notice (notice_id, title, name, date, sympathy,hate,content,password)  
                 VALUES ("${notice_id}","${title}","${name}","${NOW}",0,0,"${content}","${password}")`,
                function(err,result){
                    if(err){
                        throw err;
                    }
                    res.writeHead(302, {Location: `/`});
                    res.end();
                })
    })
})

app.post(`/create_comment`,function(req,res){ //댓글 생성 과정
    var body = '';
    req.on('data',function(data){
        body = body + data;
    })
    req.on('end',function(){
        const post = qs.parse(body);
        let name = post.name;
        let password = post.password;
        let notice_id = post.id;
        let content = post.content;
        db.query(`SELECT * FROM comment`,function(err, comment){
                if(err){
                    throw err;
                }
            db.query(`INSERT INTO comment (Cname, Cpassword, Ccontent,comment_id,notice_id) VALUES ("${name}","${password}","${content}",${comment.length},${notice_id})`,
                function(err,result){
                    if(err){
                        throw err;
                    }
                    res.writeHead(302, {Location: `/page/${notice_id}`});
                    res.end()
                })
            })
        })
    })



app.post(`/delete_notice`,function(req,res){//게시판 삭제
    body = '';
    req.on('data',function(data){
        body = body + data;
    })
    req.on('end',function(){
        const post = qs.parse(body);
        let notice_id = post.notice_id;
        db.query('DELETE FROM comment WHERE notice_id = ?',[notice_id], function(err, result2){
            db.query('DELETE FROM notice WHERE notice_id =?',[notice_id],function(err,result){
                //db안에 참조하는 속성이 있어서 위의 참조되는 속성을 먼저 제거해준후 제거 작업 실행
                //db.table.noticeの中にreferenceされるcomponentがあるからreferenceするcomponentを先に消しておく
                res.writeHead(302, {Location: `/`});
                res.end()
            })
        })
    })
})

app.post(`/delete_comment`,function(req,res){//댓글 제거 process
    body = '';
    req.on('data',function(data){
        body = body + data;
    })
    req.on('end',function(){
        const post = qs.parse(body);
        let comment_id = post.comment_id;
        let notice_id = post.notice_id;
        db.query('DELETE FROM comment WHERE comment_id = ?',[comment_id],function(err,result){
            res.writeHead(302, {Location : `/page/${notice_id}`});
            res.end()
        }) 
    })
})

app.post(`/update_notice`,function(req,res){ //게시판 업데이트
    body = '';
    req.on('data',function(data){
        body = body + data;
    })
    req.on('end',function(){
        const post = qs.parse(body);
        let title = post.title;
        let notice_id = post.notice_id;
        let content = post.content;
        db.query(`UPDATE notice SET title = ?, content = ? WHERE notice_id = ?`,[title,content,notice_id],function(err,result){
            res.writeHead(302, {Location : `/page/${notice_id}`});
            res.end();
        })
    })
})
app.post(`/recommend`,function(req,res){//공감 버튼 db에 저장
    body = '';
    req.on('data',function(data){
        body = body + data;
    })
    req.on('end',function(){
        const post = qs.parse(body);
        let notice_id = post.notice_id;
        db.query('SELECT sympathy FROM notice WHERE notice_id = ?',[notice_id],function(err,sympathy){
            db.query('UPDATE notice SET sympathy =? WHERE notice_id = ?',[sympathy[0].sympathy+1,notice_id],function(err,result){
                res.writeHead(302, {Location : `/page/${notice_id}`});
                res.end();
            })
        })
    })
})

app.post(`/hate`,function(req,res){//비공감 버튼 db에 저장
    body = '';
    req.on('data',function(data){
        body = body + data;
    })
    req.on('end',function(){
        const post = qs.parse(body);
        let notice_id = post.notice_id;
        db.query('SELECT hate FROM notice WHERE notice_id = ?',[notice_id],function(err,hate){
            db.query('UPDATE notice SET hate =? WHERE notice_id = ?',[hate[0].hate+1,notice_id],function(err,result){
                res.writeHead(302, {Location : `/page/${notice_id}`});
                res.end();
            })
        })
    })
})

app.listen(port);