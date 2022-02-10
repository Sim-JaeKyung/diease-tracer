const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);
const app = express();
//json-parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//쿠키 및 세션 설정
const options = require('./database/cookie');
const sessionStore = new MySQLStore(options);
app.use(cookieParser());
app.use(
  session({
    key: 'session_ssim',
    secret: 'ssim', //암호화에 쓰일 키
    resave: false, //session을 언제나 저장할 지 설정함
    saveUninitialized: false, //session이 저장되기 전 uninitialized 상태로 미리 만들어 저장
    store: sessionStore,
    proxy: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true, //JS를 통해 세션 쿠키를 사용할 수 없도록 함
      // secure: true, //https 환경에서만 session 정보를 주고받도록 처리
    },
  })
);

//메인 화면 라우팅
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '../fe/build/index.html'));
});
//정적파일(빌드파일) 경로 설정
app.use(express.static(path.join(__dirname, '..', '../fe/build')));

//라우팅
const authRouter = require('./routes/auth');
const mypageRouter = require('./routes/mypage');
app.use('/api/auth', authRouter);
app.use('/api/mypage', mypageRouter);

//port 설정
const port = 7303;
app.listen(port, () => console.log(`Listening on ${port}`));

//프록시 설정
const cors = require('cors');
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
