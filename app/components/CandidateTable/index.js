import React from 'react';
import T from 'prop-types';
import Table from '@material-ui/core/Table';

import TableBody from './TableBody';

const CandidateTable = ({
  candidates,
  deviceView,
  dispatchOpenModal,
  dispatchSaveCandidate,
  handleNav,
  selectedPosition,
}) => (
  <Table>
    <TableBody
      candidates={candidates}
      deviceView={deviceView}
      dispatchOpenModal={dispatchOpenModal}
      dispatchSaveCandidate={dispatchSaveCandidate}
      handleNav={handleNav}
      selectedPosition={selectedPosition}
    />
  </Table>
);

CandidateTable.propTypes = {
  candidates: T.array.isRequired,
  deviceView: T.string.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  handleNav: T.func.isRequired,
  selectedPosition: T.string.isRequired,
};

export default CandidateTable;
