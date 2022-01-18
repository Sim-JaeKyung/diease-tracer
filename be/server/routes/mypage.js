const express = require('express');
const db = require('../database/pool');
const router = express.Router();

router.post('/switchrole', (req, res) => {
  if (req.session.userData.role === '관리자') {
    const role = req.body.role;
    const email = req.body.email;
    try {
      db.query(`UPDATE users SET role='${role}' WHERE email='${email}'`);
    } catch (err) {
      console.log(err);
      res.json(`서버 에러:::::`);
    }
    res.json(`권한이 변경되었습니다`);
  } else {
    console.log(`해킹 의심!!!!!!!해킹 의심!!!!!!!`);
    res.json(`해킹 의심!!!!!!!해킹 의심!!!!!!!`);
  }
});

router.post('/getalluserinfo', async (req, res, next) => {
  if (req.session.userData) {
    const data = await db.query(`SELECT name, email, role  FROM users`);
    const users = data[0];
    res.json(users);
  }
});

module.exports = router;
