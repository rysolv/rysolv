import React, { Fragment, useState } from 'react';
import AdminHeader from '../../components/Admin/AdminHeader';
import { typeDictionary } from './constants';

export const Admin = () => {
  const [type, setType] = useState('Companies');
  const Component = typeDictionary[type];
  return (
    <Fragment key={type}>
      <AdminHeader activePage={type} setType={setType} />
      <Component type={type} />
    </Fragment>
  );
};

export default Admin;
