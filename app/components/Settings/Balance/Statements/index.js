import React, { Fragment } from 'react';
import T from 'prop-types';

import BaseTable from '../Table';
import { ComponentText } from '../styledComponents';

const StatementsComponent = ({ statements = [] }) => (
  <Fragment>
    <ComponentText>
      View list of previous statements. You can also click on them to view as a
      PDF document.
    </ComponentText>
    <BaseTable
      headers={[
        'Statement number',
        'Statement date',
        'Amount',
        'Paid on',
        'Document',
      ]}
      rows={statements}
      type="statements"
    />
  </Fragment>
);

StatementsComponent.propTypes = { statements: T.array };

export default StatementsComponent;
