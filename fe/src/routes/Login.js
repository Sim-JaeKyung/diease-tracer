import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../services/UserService';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const loginOnClick = async () => {
    try {
      const res = await login(user);
      alert(res);
    } catch (err) {
      console.error();
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
            <button onClick={loginOnClick} className='btn btn-danger'>
              로그인
            </button>
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

export default Login;
