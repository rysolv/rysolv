import React, { Fragment } from 'react';
import T from 'prop-types';

import BaseTable from '../Table';
import { ComponentText } from '../styledComponents';

const WorkHistoryComponent = ({ workHistory = [] }) => (
  <Fragment>
    <ComponentText>Completed and paid out issues.</ComponentText>
    <BaseTable
      headers={['Issue', 'Submitted at', 'Status', 'Amount']}
      rows={workHistory}
      type="workHistory"
    />
  </Fragment>
);

WorkHistoryComponent.propTypes = { workHistory: T.array };

export default WorkHistoryComponent;
