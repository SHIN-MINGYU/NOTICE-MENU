var mysql = require('mysql');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@tlsalsrb123',
  database: 'nayami'
});
db.connect();
module.exports = db;
