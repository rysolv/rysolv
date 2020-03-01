import React from 'react';
import T from 'prop-types';
import { AdminHeaderWrapper, HeaderTab, HeaderTitle } from './styledComponents';

export const AdminHeaderTabs = ({ activePage, handleNav }) => {
  const handleClick = view => {
    handleNav(view);
  };
  return (
    <AdminHeaderWrapper>
      <HeaderTab isActive={activePage === 'companies'}>
        <HeaderTitle
          isActive={activePage === 'companies'}
          label="Companies"
          onClick={() => handleClick({ subroute: 'companies' })}
          path="/admin/companies"
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

AdminHeaderTabs.defaultProps = { activePage: 'companies' };

AdminHeaderTabs.propTypes = {
  activePage: T.string,
  handleNav: T.func,
};

export default AdminHeaderTabs;
