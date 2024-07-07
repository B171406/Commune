const mysql = require('mysql');

// MySQL connection pool setup
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notebook',
  connectionLimit: 10
});
if(!pool){
  console.log('err')
}
else{
  console.log("suc")
}

module.exports = pool;
