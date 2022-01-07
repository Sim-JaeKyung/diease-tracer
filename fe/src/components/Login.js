import React, { useState } from 'react';
import { login } from '../services/UserService';

function Login({ setIsLoggedin }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const loginOnClick = async () => {
    try {
      const res = await login(user);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
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
              type='text'
              name='email'
              value={user.email}
              onChange={onChange}
              placeholder='Email'
            />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='pw'>PW : </label>
            <input
              type='password'
              name='password'
              value={user.password}
              onChange={onChange}
              placeholder='Password'
            />
          </div>
          <div className='form-group col-md-6'>
            <button type='button' onClick={loginOnClick} className='btn btn-danger'>
              로그인
            </button>
            <button
              type='button'
              onClick={() => {
                setIsLoggedin(true);
              }}
              className='btn btn-danger'
            >
              회원가입
            </button>
            <br />
            <br />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
