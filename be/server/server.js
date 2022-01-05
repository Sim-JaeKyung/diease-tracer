const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');

//const indexRouter = require('./routes/index');
//app.use('/', indexRouter);

const users = [];
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', '../fe/build')));

app.get('/api/users', (req, res) => {
  console.log('api/users called!!!!');
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user::::::', user);
  users.push(user);
  res.json('user added');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '../fe/build/index.html'));
});

//port 설정
const port = 7303;
app.listen(port, () => console.log(`Listening on ${port} port`));
