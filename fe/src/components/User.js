import { useState } from 'react';

function User({ user, handleSelect, setSelectedUserInfo }) {
  const [isRadioChecked, setIsRadioChecked] = useState(false);
  const options = ['관리자', '병상배정반', '역조관', '역조원', '입력&통보원', '직원'];

  const handleRadio = (checked) => {
    if (checked) {
      setIsRadioChecked(true);
    } else setIsRadioChecked(false);
  };

  const onRoleClick = () => {
    if (isRadioChecked === false) alert('권한을 변경할 사용자를 체크해주세요');
  };

  return (
    <tr>
      <td>
        <input
          type='radio'
          name='userCheck'
          onClick={() => setSelectedUserInfo([user.name, user.email])}
          onChange={(e) => handleRadio(e.currentTarget.checked)}
        ></input>
      </td>
      <td>{user.email}</td>
      <td>{user.name}</td>
      <td>
        <select
          defaultValue={user.role}
          onChange={(e) => handleSelect(e.currentTarget.value)}
          onClick={onRoleClick}
        >
          {options.map((optionName) => (
            <option
              key={optionName}
              value={optionName}
              disabled={user.role === optionName ? true : false}
            >
              {optionName}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}

export default User;
