import React from 'react';
import T from 'prop-types';

import ConditionalRender from '../ConditionalRender';
import IconSections from './IconSections';
import { IconCellContainer, StyledIconCell } from './styledComponents';

const TableIconCell = ({
  cellData,
  handleRedirect,
  id,
  isHoveredRow,
  route,
  type,
}) => (
  <StyledIconCell>
    <IconCellContainer onClick={() => handleRedirect(`${route}/${id}`)}>
      {cellData}
      <ConditionalRender
        Component={IconSections[type]}
        propsToPassDown={{ id }}
        shouldRender={IconSections[type] && isHoveredRow}
      />
    </IconCellContainer>
  </StyledIconCell>
);

TableIconCell.propTypes = {
  cellData: T.oneOfType([T.number, T.string]).isRequired,
  handleRedirect: T.func,
  id: T.string.isRequired,
  isHoveredRow: T.bool.isRequired,
  route: T.string,
  type: T.string.isRequired,
};

export default TableIconCell;
