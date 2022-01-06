const express = require('express');
const path = require('path');

const app = express();

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
app.use('/api/auth', authRouter);

//port 설정
const port = 7303;
app.listen(port, () => console.log(`Listening on ${port} port`));
