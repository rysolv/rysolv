import React, { Fragment, useState } from 'react';
import { BaseContainer } from 'components/base_ui';

import AdminHeader from '../../components/Admin/AdminHeader';
import { typeDictionary } from './constants';

export const Admin = () => {
  const [type, setType] = useState('Companies');
  const Component = typeDictionary[type];
  return (
    <Fragment key={type}>
      <BaseContainer>
        <AdminHeader activePage={type} setType={setType} />
        <Component type={type} />
      </BaseContainer>
    </Fragment>
  );
};

export default Admin;
