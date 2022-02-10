const http = require('http');
const url = require('url');
const qs = require('qs');
var db = require('./lib/db');
var template = require('./component/template');


var app =http.createServer(function(request, response){
    var _url = request.url;
    var quaryData = url.parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;
    if(pathname === '/'){
        response.writeHead(200);
        response.end(template.HTML());
    }

});
app.listen(3000);