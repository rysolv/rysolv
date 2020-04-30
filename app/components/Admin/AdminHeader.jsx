import React from 'react';
import T from 'prop-types';

import { AdminHeaderWrapper, HeaderTab, HeaderTitle } from './styledComponents';

export const AdminHeaderTabs = ({ activePage, handleNav }) => {
  const handleClick = view => {
    handleNav(view);
  };
  return (
    <AdminHeaderWrapper>
      <HeaderTab isActive={activePage === 'organizations'}>
        <HeaderTitle
          isActive={activePage === 'organizations'}
          label="Organizations"
          onClick={() => handleClick({ subroute: 'organizations' })}
          path="/admin/organizations"
        />
      </HeaderTab>
      <HeaderTab isActive={activePage === 'issues'}>
        <HeaderTitle
          isActive={activePage === 'issues'}
          label="Issues"
          onClick={() => handleClick({ subroute: 'issues' })}
          path="/admin/issues"
        />
      </HeaderTab>
      <HeaderTab isActive={activePage === 'users'}>
        <HeaderTitle
          isActive={activePage === 'users'}
          label="Users"
          onClick={() => handleClick({ subroute: 'users' })}
          path="/admin/users"
        />
      </HeaderTab>
    </AdminHeaderWrapper>
  );
};

AdminHeaderTabs.defaultProps = { activePage: 'organizations' };

AdminHeaderTabs.propTypes = {
  activePage: T.string,
  handleNav: T.func,
};

export default AdminHeaderTabs;
