const express =require('express');
const qs = require('querystring');
let template = require('./component/template');
let db = require('./lib/db');
const app = express();
const port = 3000;

app.use(express.static(__dirname+'/css'))

app.get('/',function(req,res){
    db.query('SELECT * FROM notice',function(err,notice){
        let list = template.list(notice);
        let main = template.noticeMenu(list);
        let link =`<link rel ="stylesheet" href ="./noticeMenu.css"> `
        let html = template.HTML(link,main);
        res.end(html);
    });
})

app.get('/create',function(req,res){
    db.query('SELECT * FROM notice',function(err, notice){
        let main = template.createMain(notice);
        let link = `<link rel ="stylesheet" href ="./createMain.css">`;
        let html = template.HTML(link, main);
        res.end(html);
    })
})
app.get(`/page/:pageId`,function(req, res){
    db.query('SELECT * FROM notice WHERE notice_id = ?',[req.params.pageId],function(err, notice){
        let main = template.noticeMain(notice);
        let link = `<link rel = "stylesheet" href = "./noticeContent.css">`;
        let html = template.HTML(link,main);
        res.end(html);
    })
})


app.post('/create_process',function(req,res){
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
        db.query(`INSERT INTO notice (notice_id, title, name, date, sympathy, content)  
                 VALUES ("${notice_id}","${title}","${name}","${NOW}","${0}","${content}")`,
                function(err,result){
                    if(err){
                        throw err;
                    }
                    res.writeHead(302, {Location: `/`});
                    res.end()
                })
    })
})
app.post(`/delete_process`,function(req,res){
    body = '';
    req.on('data',function(data){
        body = body + data;
    })
    req.on('end',function(){
        var post = qs.parse(body);
        db.query('DELETE FROM notice WHERE notice_id =?',[post.notice_id],function(err,result){
            res.writeHead(302, {Location: `/`});
            res.end()
        })
    })
})

app.listen(port);