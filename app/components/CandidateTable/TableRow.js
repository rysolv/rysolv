/* eslint-disable camelcase, react/no-array-index-key */
import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import { cellDictionary } from './constants';
import { StyledIconButton, StyledTableRow } from './styledComponents';

const SaveIcon = iconDictionary('bookmarkBorder');
const UnsaveIcon = iconDictionary('bookmark');

const TableRow = ({
  candidate,
  deviceView,
  dispatchOpenModal,
  dispatchSaveCandidate,
  handleNav,
  selectedPosition,
}) => {
  const ref = useRef(null);
  const [hideLanguages, setHideLanguages] = useState(true);
  const CardIcon = candidate.isSaved ? UnsaveIcon : SaveIcon;
  const CardLabel = candidate.isSaved ? 'Unshortlist' : 'Shortlist';

  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : 0;
    setHideLanguages(width < 600);
  }, [ref.current]);

  return (
    <StyledTableRow ref={ref}>
      <StyledIconButton
        icon={CardIcon}
        isSaved={candidate.isSaved}
        label={CardLabel}
        onClick={() =>
          dispatchSaveCandidate({
            candidateId: candidate.id,
            positionId: selectedPosition,
          })
        }
      />
      {Object.keys(cellDictionary).map((header, index) => {
        const TableCellToRender = cellDictionary[header];

        if (header === 'languages' && hideLanguages) return null;
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
};

TableRow.propTypes = {
  candidate: T.object.isRequired,
  deviceView: T.string.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  handleNav: T.func.isRequired,
  selectedPosition: T.string.isRequired,
};

export default TableRow;
