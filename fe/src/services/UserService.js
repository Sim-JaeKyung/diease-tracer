import axios from 'axios';

export async function getAllUsers() {
  const res = await axios.get('/api/auth/users');
  const res2 = await res.data;
  return res2;
}

export async function createUser(data) {
  try {
    const res = await axios.post('/api/auth/signup', { data });
    return res.json(data);
  } catch (error) {
    console.error(error);
  }
}

export async function login(data) {
  try {
    const res = await axios.post('/api/auth/login', { data });
    return res.json(data);
  } catch (error) {
    console.error(error);
  }
}

// export async function getAllUsers() {
//   try {
//     const response = await fetch('/api/users');
//     return await response.json();
//   } catch (error) {
//     return [];
//   }
// }

// export async function createUser(data) {
//   const response = await fetch(`/api/user`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ user: data }),
//   });
//   return await response.json();
// }
