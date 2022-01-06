import React from 'react';

export const Users = ({ users }) => {
  if (users.length === 0 || users == null) return null;
  console.log('users legnth:::', users);

  const UserRow = (user, index) => {
    return (
      <tr key={index} className={index % 2 === 0 ? 'odd' : 'even'}>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
      </tr>
    );
  };
  const userTable = users.map((user, index) => UserRow(user, index));

  return (
    <div className='container'>
      <h2>Users</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>ID no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>{userTable}</tbody>
      </table>
    </div>
  );
};
