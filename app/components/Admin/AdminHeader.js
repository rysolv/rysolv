import React from 'react';
import T from 'prop-types';
import { AdminHeaderWrapper, HeaderTab, HeaderTitle } from './styledComponents';

export const AdminHeaderTabs = ({ activePage, setType }) => {
  const handleClick = type => {
    setType(type);
  };
  console.log('activePage', activePage)
  return (
    <AdminHeaderWrapper>
      <HeaderTab isActive={activePage === 'Companies'}>
        <HeaderTitle
          isActive={activePage === 'Companies'}
          label="Companies"
          onClick={() => handleClick('Companies')}
          path="/admin"
        />
      </HeaderTab>
      <HeaderTab isActive={activePage === 'Issues'}>
        <HeaderTitle
          isActive={activePage === 'Issues'}
          label="Issues"
          onClick={() => handleClick('Issues')}
          path="/admin"
        />
      </HeaderTab>
      <HeaderTab isActive={activePage === 'Users'}>
        <HeaderTitle
          isActive={activePage === 'Users'}
          label="Users"
          onClick={() => handleClick('Users')}
          path="/admin"
        />
      </HeaderTab>
    </AdminHeaderWrapper>
  );
};

AdminHeaderTabs.defaultProps = { activePage: 'Companies' };

AdminHeaderTabs.propTypes = {
  activePage: T.string,
  setType: T.func,
};

export default AdminHeaderTabs;
