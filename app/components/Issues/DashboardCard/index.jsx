import React from 'react';
import T from 'prop-types';

import { IssueCard, IssuesHeader, IssueTitle } from './styledComponents';

const DashboardIssueCard = ({ data, deviceView, handleNav }) => {
  const { title } = data;
  return (
    <IssueCard>
      <IssuesHeader>{title}</IssuesHeader>
      <IssueTitle>{title}</IssueTitle>
      {/* button row */}
      {/* description (100 characters) */}
      {/* date */}
      {/*  */}
    </IssueCard>
  );
};

DashboardIssueCard.propTypes = {
  data: T.object.isRequired,
  deviceView: T.string.isRequired,
};

export default DashboardIssueCard;
