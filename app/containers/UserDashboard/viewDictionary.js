import React from 'react';
import { Redirect } from 'react-router-dom';

import UserDashboardView from 'components/UserDashboard';
import UpdateDetails from 'components/UserDashboard/UpdateDetails';

const viewDictionary = key => {
  switch (key) {
    case 'update':
      return UpdateDetails;
    case 'main':
      return UserDashboardView;
    default:
      return () => <Redirect to="/notfound" />;
  }
};

export default viewDictionary;
