import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from 'routes/LoginPage';
import Main from 'routes/Main';
import MyPage from 'routes/MyPage';
import MyWorkPage from 'routes/MyWorkPage';
import SignupPage from 'routes/SignupPage';
import { Header } from './Header';

const AppRouter = ({ isLoggedin, userName }) => {
  return (
    <Router>
      <Header />
      <Routes>
        {isLoggedin ? (
          <>
            <Route path='/' element={<Main userName={userName} />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/mywork' element={<MyWorkPage />} />
          </>
        ) : (
          <>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
