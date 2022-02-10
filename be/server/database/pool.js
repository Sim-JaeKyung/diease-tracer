//node 서버와 mysql 연동을 위한 js 파일
// 사용시 pool변수로 불러와서 pool.query('select * from xxx')로 사용(동기화 작업 필요)

const mariadb = require('mariadb');
require('dotenv').config();
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 40,
  charset: 'utf8',
  dateStrings: 'date',
});

module.exports = pool;
