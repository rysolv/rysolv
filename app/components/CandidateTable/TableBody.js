/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import TableRow from './TableRow';
import { StyledTableBody } from './styledComponents';

const TableBody = ({
  candidates,
  deviceView,
  dispatchOpenModal,
  dispatchSaveCandidate,
  handleNav,
  selectedPosition,
}) => (
  <StyledTableBody>
    {candidates.map((candidate, index) => (
      <TableRow
        key={`table-row-${index}`}
        candidate={candidate}
        deviceView={deviceView}
        dispatchOpenModal={dispatchOpenModal}
        dispatchSaveCandidate={dispatchSaveCandidate}
        handleNav={handleNav}
        selectedPosition={selectedPosition}
      />
    ))}
  </StyledTableBody>
);

TableBody.propTypes = {
  candidates: T.array.isRequired,
  deviceView: T.string.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  handleNav: T.func.isRequired,
  selectedPosition: T.string.isRequired,
};

export default TableBody;
