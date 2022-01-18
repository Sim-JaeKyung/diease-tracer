import axios from 'axios';

export async function getUserRole() {
  const res = await axios.post('/api/auth/loginCheck', {});
  const userRole = res.data.userData.role;
  return userRole;
}

export async function getAllUserInfo() {
  const res = await axios.post('/api/mypage/getalluserinfo', {});
  const users = res.data;
  return users;
}

export async function switchRole(email, role) {
  const res = await axios.post('/api/mypage/switchrole', { email, role });
  return res.data;
}
