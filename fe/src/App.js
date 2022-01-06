// import React, { useState } from 'react';
// import { CreateUser } from './components/CreateUser';
// import { Users } from './components/Users';
// import { getAllUsers, createUser } from './services/UserService';
// import { DisplayBoard } from './components/DisplayBoard';
// import { Header } from './components/Header';

// function App() {
//   const [user, setUser] = useState('');
//   const [users, setUsers] = useState({});
//   const [numberOfUsers, setNumberOfUsers] = useState(0);

//   createUser = (e) => {
//     createUser(user).then((res) => {
//       console.log(res);
//       setNumberOfUsers(numberOfUsers + 1);
//     });
//   };

//   getAllUsers = () => {
//     getAllUsers().then((users) => {
//       console.log(users);
//       setUsers(users);
//     });
//   };

//   const onChangeForm = (e) => {
//     let user = this.user;
//     if (e.target.name === 'firstname') {
//       user.firstName = e.target.value;
//     } else if (e.target.name === 'lastname') {
//       user.lastName = e.target.value;
//     } else if (e.target.name === 'email') {
//       user.email = e.target.value;
//     }
//     setUser(user);
//   };
//   return (
//     <div className='App'>
//       <Header></Header>
//       <div className='container mrgnbtm'>
//         <div className='row'>
//           <div className='col-md-8'>
//             <CreateUser
//               user={user}
//               onChangeForm={onChangeForm}
//               createUser={createUser}
//             ></CreateUser>
//           </div>
//           <div className='col-md-4'>
//             <DisplayBoard numberOfUsers={numberOfUsers} getAllUsers={getAllUsers}></DisplayBoard>
//           </div>
//         </div>
//       </div>
//       <div className='row mrgnbtm'>
//         <Users users={users}></Users>
//       </div>
//       <button>서버로딩이 완료되면 나오는 버튼</button>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header';
import { Users } from './components/Users';
import { DisplayBoard } from './components/DisplayBoard';
import CreateUser from './components/CreateUser';
import { getAllUsers, createUser, login } from './services/UserService';
import Login from './components/Login';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(0);

  const userCreate = (e) => {
    createUser(user).then((response) => {
      console.log(response);
      setNumberOfUsers(numberOfUsers + 1);
    });
  };

  const fetchAllUsers = () => {
    getAllUsers().then((users) => {
      console.log(users);
      setUsers(users);
      setNumberOfUsers(users.length);
    });
  };

  const userlogin = (e) => {
    login(user).then((res) => {
      console.log(res);
      setIsLoggedin(true);
    });
  };

  // useEffect(() => {
  //   getAllUsers().then((users) => {
  //     console.log(users);
  //     setUsers(users);
  //     setNumberOfUsers(users.length);
  //   });
  // }, []);

  const onChangeForm = (e) => {
    if (e.target.name === 'name') {
      user.name = e.target.value;
    } else if (e.target.name === 'email') {
      user.email = e.target.value;
    } else if (e.target.name === 'password') {
      user.password = e.target.value;
    }
    setUser(user);
  };

  return (
    <>
      <div className='App'>
        <Header></Header>
        <div className='container mrgnbtm'>
          <div className='row'>
            <div className='col-md-8'>
              {isLoggedin ? (
                <CreateUser
                  user={user}
                  onChangeForm={onChangeForm}
                  createUser={userCreate}
                ></CreateUser>
              ) : (
                <Login user={user} onChangeForm={onChangeForm} onClickLogin={userlogin} />
              )}
            </div>
            <div className='col-md-4'>
              <DisplayBoard
                numberOfUsers={numberOfUsers}
                getAllUsers={fetchAllUsers}
              ></DisplayBoard>
            </div>
          </div>
        </div>
        <div className='row mrgnbtm'>
          <Users users={users}></Users>
        </div>
      </div>
    </>
  );
}

export default App;
