import axios from 'axios';

export async function getAllUsers() {
  const res = await axios.get('/api/auth/users');
  const res2 = await res.data;
  return res2;
}

export async function createUser(data) {
  try {
    const res = await axios.post('/api/auth/signup', { data });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function login(data) {
  try {
    const res = await axios.post('/api/auth/login', { data });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    const res = await axios.post('/api/auth/logout');
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function emailCheck(data) {
  try {
    const res = await axios.post('/api/auth/emailcheck', { data });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
