let mysql  = require('mysql');
let conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'weekly-report'
});
console.log(mysql)
// console.log(conn)
conn.connect();
module.exports=conn
