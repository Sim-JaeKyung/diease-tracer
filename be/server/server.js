const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
//json-parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//메인 화면 라우팅
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '../fe/build/index.html'));
});
//정적파일(빌드파일) 경로 설정
app.use(express.static(path.join(__dirname, '..', '../fe/build')));

//라우팅
const authRouter = require('./routes/auth');
const cookieRouter = require('./utils/cookie');
app.use('/api/auth', authRouter);
app.use('/api/util', cookieRouter);

//port 설정
const port = 7303;
app.listen(port, () => console.log(`Listening on ${port} port`));

//프록시 설정
const cors = require('cors');
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//쿠키 및 세션 설정
app.use(cookieParser());
app.use(
  session({
    key: 'user',
    secret: 'ssim',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);
