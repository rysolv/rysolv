import React, { Fragment, useState } from 'react';
import T from 'prop-types';
import AdminHeader from '../../components/Admin/AdminHeader';
import { typeDictionary } from './constants';

export const Admin = ({ handleNav }) => {
  const [type, setType] = useState('Companies');
  const Component = typeDictionary[type];
  return (
    <Fragment key={type}>
      <AdminHeader activePage={type} setType={setType} />
      <Component type={type} />
    </Fragment>
  );
};

Admin.propTypes = { handleNav: T.func };

export default Admin;
