const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database/pool');
const hashPW = require('../utils/hashPW');

//회원정보 열람
router.get('/users', async (req, res) => {
  console.log('api/users called!!!!');
  const viewUsers = await db.query(`SELECT * FROM users`);
  res.json(viewUsers[0]);
});

//회원가입
router.post('/signup', async (req, res, next) => {
  const user = req.body.data;
  console.log('Adding user::::::', user.name);
  //보안 암호화 설정
  if (user.password == null || user.password === '') user.password = 'bogun123';
  const { hashedPW, salt } = await hashPW.createHashedPassword(user.password);
  user.password = hashedPW;
  user.salt = salt;
  res.json(`user added`);
  await db.query(`INSERT INTO users SET ?`, user);
});

//로그인
router.get('/login', (req, res) => {});

//로그아웃
router.get('/logout', (req, res) => {
  console.log('clear cookie');
  res.clearCookie('userid');
  res.clearCookie('username');

  console.log('clear session');
  req.session.destroy();

  res.sendFile(path.join(__dirname, '..', '..', '../fe/build/회원가입.html'));
});

module.exports = router;
