import { Link } from 'react-router-dom';
import { logout } from 'services/UserService';
function Main({ userName }) {
  const onLogoutClick = async () => {
    const res = await logout();
    alert(res);
    window.location.reload();
  };

  return (
    <>
      <div>
        <Link to='/profile'>안녕하세요 {userName}님!</Link>
      </div>
      <button onClick={onLogoutClick} className='btn btn-danger'>
        로그아웃
      </button>
    </>
  );
}

export default Main;
