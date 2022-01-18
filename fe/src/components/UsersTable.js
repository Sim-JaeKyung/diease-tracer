import User from './User';

function UsersTable({ allUsers, handleSelect, setSelectedUserInfo }) {
  const headers = ['선택', '이메일', '이름', '권한'];

  return (
    <>
      {allUsers != null && (
        <>
          <table>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <User
                  user={user}
                  key={user.email}
                  handleSelect={handleSelect}
                  setSelectedUserInfo={setSelectedUserInfo}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default UsersTable;
