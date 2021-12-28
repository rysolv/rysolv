import React from 'react';
import { Redirect } from 'react-router-dom';

import { EditJobApplication } from 'components/Jobs';
import UserDashboardView from 'components/UserDashboard';

const viewDictionary = key => {
  switch (key) {
    case 'update':
      return EditJobApplication;
    case 'main':
      return UserDashboardView;
    default:
      return () => <Redirect to="/notfound" />;
  }
};

export default viewDictionary;
