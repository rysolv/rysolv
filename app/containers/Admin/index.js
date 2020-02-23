import React, { Fragment } from 'react';
import T from 'prop-types';
import { typeDictionary } from './constants';

export const Admin = ({ handleNav, type = 'Companies' }) => {
  const Component = typeDictionary[type];
  return (
    <Fragment>
      <Component handleNav={handleNav} type={type} />
    </Fragment>
  );
};

Admin.propTypes = {
  handleNav: T.func.isRequired,
  type: T.oneOf(['Companies', 'Issues', 'Users']).isRequired,
};

export default Admin;
