import { useState } from 'react';
import styles from '../css/CreateUser.module.css';

import { createUser } from '../services/UserService';

const Signup = ({ setIsLoggedin }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const signup = async () => {
    try {
      const res = await createUser(user);
      console.log(res);
      if (res == null) {
        alert('에러. 다시 확인하세요.');
      } else {
        alert(res);
        setIsLoggedin(false);
      }
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
      <h2>회원가입</h2>
      <div className='container'>
        <div className='row'>
          <div className='col-md-7 mrgnbtm'>
            <form>
              <div className='row'>
                <div className='form-group col-md-6'>
                  <label className={styles.registerFont} htmlFor='name'>
                    이름
                  </label>
                  <input
                    type='text'
                    onChange={onChange}
                    value={user.name}
                    className='form-control'
                    name='name'
                    id='name'
                    placeholder='Name'
                  />
                </div>
                <div className='form-group col-md-6'>
                  <label className='register-font' htmlFor='email'>
                    이메일
                  </label>
                  <input
                    type='text'
                    onChange={onChange}
                    className='form-control'
                    name='email'
                    value={user.email}
                    id='email'
                    placeholder='Email'
                  />
                </div>
              </div>
              <div className='row'>
                <div className='form-group col-md-12'>
                  <label className='register-font' htmlFor='password'>
                    비밀번호
                  </label>
                  <input
                    type='text'
                    onChange={onChange}
                    className='form-control'
                    name='password'
                    value={user.password}
                    id='password'
                    placeholder='Password'
                  />
                </div>
              </div>
              <button type='button' onClick={signup} className='btn btn-danger'>
                등록
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
