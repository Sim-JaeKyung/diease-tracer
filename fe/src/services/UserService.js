import axios from 'axios';

export async function getAllUsers() {
  try {
    const res = await axios.get('/api/users');
    return res.json();
  } catch (error) {
    return [];
  }
}

export async function createUser(data) {
  const res = await axios.post('/api/user');
  return res.json();
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
