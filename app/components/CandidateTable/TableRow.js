/* eslint-disable camelcase, react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { cellDictionary } from './constants';
import { StyledTableRow } from './styledComponents';

const TableRow = ({
  candidate,
  deviceView,
  dispatchOpenModal,
  dispatchSaveCandidate,
  handleNav,
  selectedPosition,
}) => (
  <StyledTableRow>
    {Object.keys(cellDictionary).map((header, index) => {
      const TableCellToRender = cellDictionary[header];

      return (
        <TableCellToRender
          key={`table-data-${header}-${index}`}
          deviceView={deviceView}
          dispatchOpenModal={dispatchOpenModal}
          dispatchSaveCandidate={dispatchSaveCandidate}
          handleNav={handleNav}
          selectedPosition={selectedPosition}
          {...candidate}
        />
      );
    })}
  </StyledTableRow>
);

TableRow.propTypes = {
  candidate: T.object.isRequired,
  deviceView: T.string.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  handleNav: T.func.isRequired,
  selectedPosition: T.string.isRequired,
};

export default TableRow;
