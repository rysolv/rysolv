import React from 'react';
import T from 'prop-types';

export const UserContainer = props => (
  <div style={{ border: '1px solid' }}>
    <div className="name">{props.userName}</div>
  </div>
);

UserContainer.propTypes = {
  userName: T.string.isRequired,
};

export default UserContainer;
