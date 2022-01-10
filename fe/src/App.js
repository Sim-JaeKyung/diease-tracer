import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header';
import { Users } from './components/Users';
import { DisplayBoard } from './components/DisplayBoard';
import Signup from './components/Signup';
import Login from './components/Login';
import Main from './components/Main';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('session_ssim') === null) {
      console.log('isLoggedin::', isLoggedin);
    } else {
      setIsLoggedin(true);
      console.log('isLoggedin::', isLoggedin);
    }
  });
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
      <div className='App'>
        <Header></Header>
        <div className='container mrgnbtm'>
          <div className='row'>
            <div className='col-md-8'>
              {isLoggedin ? (
                <>
                  <Main />
                </>
              ) : (
                <Login setIsLoggedin={setIsLoggedin} />
              )}
            </div>
            <div className='col-md-4'></div>
          </div>
        </div>
        <div className='row mrgnbtm'>
          <Users users={''}></Users>
        </div>
      </div>
    </>
  );
}

export default App;
