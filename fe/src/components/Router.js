import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from 'routes/Login';
import Main from 'routes/Main';
import Signup from 'routes/Signup';
import { Header } from './Header';
const AppRouter = ({ isLoggedin, userName }) => {
  return (
    <Router>
      <Header />
      <Routes>
        {isLoggedin ? (
          <>
            <Route path='/' element={<Main userName={userName} />} />
          </>
        ) : (
          <>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
