const crypto = require('crypto');

//salt column
const createSalt = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString('base64'));
    });
  });

//해쉬 비밀번호 만들기
module.exports.createHashedPassword = (plainPassword) =>
  new Promise(async (resolve, reject) => {
    const salt = await createSalt();
    crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve({ hashedPW: key.toString('base64'), salt });
    });
  });

//로그인 요청 받은 비밀번호 해쉬화
module.exports.createHashedPasswordForLogin = (password, salt) =>
  new Promise(async (resolve, reject) => {
    crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve({ hashedPW: key.toString('base64') });
    });
  });
