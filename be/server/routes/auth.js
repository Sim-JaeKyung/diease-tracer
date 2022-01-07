const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../database/pool");
const hashPW = require("../utils/hashPW");
const axios = require("axios");

//인증 쿠키 값을 전달하기 위한 설정
axios.default.defaults.withCredentials = true;

//회원정보 열람
router.get("/users", async (req, res) => {
  console.log("api/users called!!!!");
  const viewUsers = await db.query(`SELECT * FROM users`);
  res.json(viewUsers[0]);
});

//회원가입
router.post("/signup", async (req, res, next) => {
  const user = req.body.data;
  console.log("Adding user::::::", user.name);
  //보안 암호화 설정
  if (user.password == null || user.password === "") user.password = "bogun123";
  const { hashedPW, salt } = await hashPW.createHashedPassword(user.password);
  user.password = hashedPW;
  user.salt = salt;
  res.json(`user added`);
  await db.query(`INSERT INTO users SET ?`, user);
});

//로그인
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body.data;
  try {
    const saltData = await db.query(
      `SELECT * FROM users WHERE email='${email}'`
    );
    const dbsalt = saltData[0][0].salt;
    //요청 받은 비밀번호 암호화 후 대조
    const { hashedPW } = await hashPW.createHashedPasswordForLogin(
      password,
      dbsalt
    );
    const dbpassword = saltData[0][0].password;
    if (hashedPW == dbpassword) {
      const name = saltData[0][0].name;
      console.log(`login success:::::`);
      //세션 생성
      // if (req.session.userData) {
      //   console.log(`세션이 존재합니다.`);
      // } else {
      //   req.session.userData = {
      //     email: email,
      //     password: password,
      //   };
      //   req.session.save((error) => {
      //     if (error) console.log(error);
      //   });
      // }
      res.json(`환영합니다. ${name} 님`);
    } else {
      res.json(`비밀번호를 확인해주세요`);
    }
  } catch (err) {
    console.log(err);
    res.send(`이메일을 확인해주세요`);
  }
});

//로그인 체크
router.get("/loginCheck", (req, res) => {
  if (req.session.userData) {
    res.send({ loggedIn: true, userData: req.session.userData });
  } else {
    res.send({ loggedIn: false });
  }
});

//로그아웃
router.get("/logout", (req, res) => {
  console.log("clear cookie");
  res.clearCookie("userid");
  res.clearCookie("username");

  console.log("clear session");
  req.session.destroy((error) => {
    if (error) console.log(error);
  });
});

module.exports = router;
