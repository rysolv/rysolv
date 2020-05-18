import React from 'react';
import T from 'prop-types';

import ConditionalRender from '../ConditionalRender';

import IconSections from './IconSections';
import { IconCellContainer, StyledIconCell } from './styledComponents';

const TableIconCell = ({ cellData, id, isHoveredRow, type }) => (
  <StyledIconCell>
    <IconCellContainer>
      {cellData}
      <ConditionalRender
        Component={IconSections[type]}
        propsToPassDown={{ id }}
        shouldRender={isHoveredRow}
      />
    </IconCellContainer>
  </StyledIconCell>
);

TableIconCell.propTypes = {
  cellData: T.oneOfType([T.number, T.string]).isRequired,
  id: T.number.isRequired,
  isHoveredRow: T.bool.isRequired,
  type: T.string.isRequired,
};

export default TableIconCell;
