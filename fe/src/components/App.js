import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import AppRouter from './Router';
import axios from 'axios';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userName, setUserName] = useState('');

  const loginCheck = async () => {
    const res = await axios.post('/api/auth/loginCheck', {});
    const isUserIdentified = res.data.loggedIn;
    if (isUserIdentified) {
      setUserName(res.data.userData.name);
      setIsLoggedin(true);
    } else {
      console.log(res.data);
    }
  };

  useEffect(() => {
    loginCheck();
    setInit(true);
  }, []);

  // const [numberOfUsers, setNumberOfUsers] = useState(0);
  // const fetchAllUsers = () => {
  //   getAllUsers().then((users) => {
  //     console.log(users);
  //     setUsers(users);
  //     setNumberOfUsers(users.length);
  //   });
  // };

  return (
    <>
      {init ? <AppRouter isLoggedin={isLoggedin} userName={userName} /> : 'initilizing ...'}
      <a href='/'>
        <footer> &copy;Disease Tracer {new Date().getFullYear()} </footer>
      </a>
    </>
  );
}

export default App;
