import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // login 버튼 클릭 이벤트
  const onClickLogin = () => {
    console.log('click login');
  };

  // 페이지 렌더링 후 가장 처음 호출되는 함수
  useEffect(
    () => {
      axios
        .get('/user_inform/login')
        .then((res) => console.log(res))
        .catch();
    },
    // 페이지 호출 후 처음 한번만 호출될 수 있도록 [] 추가
    []
  );

  return (
    <div className='container'>
      <div className='col-md-7 mrgnbtm'>
        <form>
          <h2>로그인</h2>
          <div className='form-group col-md-6'>
            <label htmlFor='email'>Email : </label>
            <input type='text' name='email' value={inputId} onChange={handleInputId} />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='pw'>PW : </label>
            <input type='password' name='pw' value={inputPw} onChange={handleInputPw} />
          </div>
          <div className='form-group col-md-6'>
            <button type='button' onClick={onClickLogin} className='btn btn-danger'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
