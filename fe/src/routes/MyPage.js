import UsersTable from 'components/UsersTable';
import React, { useEffect, useState } from 'react';
import { getAllUserInfo, getUserRole, switchRole } from 'services/CommonService';
function MyPage() {
  const [userRole, setUserRole] = useState('');
  const [selectedUserInfo, setSelectedUserInfo] = useState([]);
  const [allUsers, setAllUsers] = useState({});
  const [isUsersUpdated, setIsUsersUpdated] = useState(false);

  const handleSelect = async (role) => {
    const targetUserName = selectedUserInfo[0];
    const targetUserEmail = selectedUserInfo[1];
    const roleChangeCheck = await window.confirm(
      `${targetUserName} 님의 권한을 ${role}로 바꾸시겠습니까?`
    );
    if (roleChangeCheck) {
      await switchRole(targetUserEmail, role).then((res) => alert(res));
    }
  };

  useEffect(() => {
    getUserRole().then((response) => {
      setUserRole(response);
      if (response === '관리자') {
        getAllUserInfo().then((users) => {
          setAllUsers(users);
          setIsUsersUpdated(true);
        });
      }
    });
  }, []);

  return (
    <>
      <div>
        <h2>마이 페이지</h2>
      </div>
      {userRole === '관리자' && isUsersUpdated === true && (
        <div>
          <h3>회원 목록</h3> <p>등록된 회원 수: {allUsers.length}</p>
          <UsersTable
            allUsers={allUsers}
            handleSelect={handleSelect}
            setSelectedUserInfo={setSelectedUserInfo}
          />
        </div>
      )}
      <br />
    </>
  );
}

export default MyPage;
