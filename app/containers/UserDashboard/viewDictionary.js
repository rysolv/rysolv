import React from 'react';
import { Redirect } from 'react-router-dom';

import EditJobApplicationView from './Views/EditJobApplication';
import UserDashboardView from './Views/UserDashboard';

const viewDictionary = key => {
  switch (key) {
    case 'update':
      return EditJobApplicationView;
    case 'main':
      return UserDashboardView;
    default:
      return () => <Redirect to="/notfound" />;
  }
};

export default viewDictionary;
