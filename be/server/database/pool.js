//node 서버와 mysql 연동을 위한 js 파일
// 사용시 pool변수로 불러와서 pool.query('select * from xxx')로 사용(동기화 작업 필요)

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '',
  port: ,
  user: '',
  password: '!',
  database: '',
  connectionLimit: 40,
  charset: 'utf8',
  dateStrings: 'date',
});

module.exports = pool;
