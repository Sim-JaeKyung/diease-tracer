import TotalStatus from 'components/TotalStatus';
import { Link } from 'react-router-dom';
import { logout } from 'services/AccountService';
function Main({ userName }) {
  const onLogoutClick = async () => {
    const res = await logout();
    alert(res);
    window.location.reload();
  };

  return (
    <>
      <div>
        <h5>안녕하세요 {userName}님! ::::</h5>
        <Link to='/mypage'>마이페이지 가기</Link>
      </div>
      <div>
        <TotalStatus />
      </div>
      <div>
        <Link to='/mywork'>개인업무</Link>
      </div>
      <button onClick={onLogoutClick} className='btn btn-danger'>
        로그아웃
      </button>
      <br />
    </>
  );
}

export default Main;
