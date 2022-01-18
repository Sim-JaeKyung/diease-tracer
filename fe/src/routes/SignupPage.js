import { useState } from 'react';

import { createUser, emailCheck } from '../services/AccountService';

const SignupPage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [emailCheckedMsg, setEmailCheckedMsg] = useState('');

  const signup = async () => {
    if (emailCheckedMsg === '해당 메일은 사용 중입니다') {
      alert('다른 이메일을 사용해주세요');
    } else if (emailCheckedMsg === '') {
      alert('이메일 중복 확인을 한 후 등록해주세요');
    } else {
      if (user.name === '' || user.email === '') {
        alert('이름과 이메일을 확인해주세요');
      } else {
        try {
          const res = await createUser(user);
          console.log(res);
          if (res == null) {
            alert('에러. 다시 확인하세요.');
          } else {
            alert(res);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const emailCheckHandler = (e) => {
    e.preventDefault();
    const newEmail = user.email;
    emailCheck(newEmail).then((response) => setEmailCheckedMsg(response));
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
                  <label htmlFor='name'>이름</label>
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
                  <button className='btn btn-info' onClick={emailCheckHandler}>
                    중복확인
                  </button>
                  {emailCheckedMsg === '사용 가능한 이메일입니다' ? (
                    <span style={{ color: '#00a3d2' }}>{emailCheckedMsg}</span>
                  ) : (
                    <span style={{ color: 'red' }}>{emailCheckedMsg}</span>
                  )}
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
              <button onClick={signup} className='btn btn-danger'>
                등록
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
