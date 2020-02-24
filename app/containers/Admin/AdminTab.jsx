import React from 'react';
import T from 'prop-types';

export const AdminTab = props => (
  <div>
    <button type="button" onClick={() => props.setAdminTab('Companies')}>
      Companies
    </button>
    <button type="button" onClick={() => props.setAdminTab('Issues')}>
      Issues
    </button>
    <button type="button" onClick={() => props.setAdminTab('Users')}>
      Users
    </button>
  </div>
);

AdminTab.propTypes = {
  setAdminTab: T.func.isRequired,
};

export default AdminTab;
