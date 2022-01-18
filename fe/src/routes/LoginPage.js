import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/AccountService';

function LoginPage() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const loginOnClick = async () => {
    try {
      const res = await login(user);
      alert(res);
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className='container'>
      <div className='col-md-7 mrgnbtm'>
        <form>
          <h2>로그인</h2>
          <div className='form-group col-md-6'>
            <label htmlFor='email'>Email : </label>
            <input
              className='form-control'
              type='text'
              name='email'
              value={user.email}
              onChange={onChange}
              placeholder='Email'
            />
          </div>
          <div className='form-group col-md-6 '>
            <label htmlFor='pw'>PW : </label>
            <input
              className='form-control'
              type='password'
              name='password'
              value={user.password}
              onChange={onChange}
              placeholder='Password'
            />
          </div>
          <div className='form-group col-md-6'>
            <Link to='/' onClick={loginOnClick} className='btn btn-danger'>
              로그인
            </Link>
            <Link to='/signup' className='btn btn-danger'>
              회원가입
            </Link>
            <br />
            <br />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
