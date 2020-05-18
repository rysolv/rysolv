import React from 'react';
import T from 'prop-types';

import { emptyTableMessageDictionary } from './constants';
import { EmptyTableRow, StyledTableBody } from './styledComponents';

const EmptyTableMessage = ({ numColumn, type }) => (
  <StyledTableBody>
    <EmptyTableRow>
      <td colSpan={numColumn}>{emptyTableMessageDictionary[type]}</td>
    </EmptyTableRow>
  </StyledTableBody>
);

EmptyTableMessage.propTypes = {
  numColumn: T.number.isRequired,
  type: T.string.isRequired,
};

export default EmptyTableMessage;
