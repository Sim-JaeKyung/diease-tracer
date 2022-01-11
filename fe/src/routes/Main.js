import { Link } from 'react-router-dom';
import { logout } from 'services/UserService';
function Main() {
  const onLogoutClick = async () => {
    const res = await logout();
    console.log(res);
  };
  return (
    <>
      <button onClick={onLogoutClick}>
        <Link to='/'>로그아웃</Link>
      </button>
    </>
  );
}

export default Main;
