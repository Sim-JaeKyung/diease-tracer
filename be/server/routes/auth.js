const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../database/pool');
const hashPW = require('../utils/hashPW');
const axios = require('axios');

//인증 쿠키 값을 전달하기 위한 설정
axios.default.defaults.withCredentials = true;

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

//이메일 중복체크
router.post('/emailcheck', async (req, res) => {
  const newEmail = req.body.data;

  db.query(`SELECT email FROM users WHERE email='${newEmail}'`)
    .then((result) => {
      const selectResult = result[0][0].email;
      if (newEmail === selectResult) res.json(`해당 메일은 사용 중입니다`);
    })
    .catch((err) => res.json(`사용 가능한 이메일입니다`));
});

//로그인
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body.data;
  try {
    const saltData = await db.query(`SELECT * FROM users WHERE email='${email}'`);
    const dbsalt = saltData[0][0].salt;
    //요청 받은 비밀번호 암호화 후 대조
    const { hashedPW } = await hashPW.createHashedPasswordForLogin(password, dbsalt);
    const dbpassword = saltData[0][0].password;
    const role = saltData[0][0].role;
    if (hashedPW == dbpassword) {
      const name = saltData[0][0].name;
      console.log(`login success::::: ${name}`);
      if (req.session.userData == undefined) {
        req.session.userData = {
          email,
          name,
          role,
        };
        req.session.save(() => {
          res.json(`환영합니다. ${name} 님`);
        });
      } else {
        console.log('세션 관련 문제 ...');
      }
    } else {
      res.json(`비밀번호를 확인해주세요`);
    }
  } catch (err) {
    console.log(err);
    res.send(`이메일을 확인해주세요`);
  }
});

//로그인 체크
router.post('/loginCheck', (req, res) => {
  if (req.session.userData) {
    res.send({ loggedIn: true, userData: req.session.userData });
  } else {
    res.send({ loggedIn: false });
  }
});

//로그아웃
router.post('/logout', (req, res) => {
  if (req.session.userData) {
    const name = req.session.userData.name;
    console.log('clear session');
    req.session.destroy(() => {
      res.clearCookie('session_ssim');
      console.log(`logout success::::: ${name}`);
      res.send(`로그아웃 완료::::: ${name}`);
    });
  }
});

module.exports = router;
