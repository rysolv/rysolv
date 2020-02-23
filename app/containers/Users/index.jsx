import React from 'react';
import UserContainer from './UserContainer';

const dummyUsers = [
  {
    userName: 'Tyler Maran',
  },
  {
    userName: 'Anna pojawis',
  },
  {
    userName: 'Jay Querie',
  },
];

const userList = dummyUsers.map(user => (
  <UserContainer userName={user.userName} key={user.userName} />
));

export const Users = () => (
  <div>
    <div className="header">Users:</div>
    <div className="body">{userList}</div>
  </div>
);

export default Users;
