import React from 'react';
import T from 'prop-types';

import ConditionalRender from '../ConditionalRender';

import TableCell from './TableCell';
import TableIconCell from './TableIconCell';
import { StyledTableRow } from './styledComponents';

const TableRow = ({ handleHovered, headers, isHoveredRow, rowData, type }) => (
  <StyledTableRow onMouseEnter={handleHovered}>
    {headers.map((header, index) => {
      const { [header]: cellData, id } = rowData;
      const isIconCell = index === 0;
      return (
        <ConditionalRender
          key={`table-data-${id}-${header}`}
          Component={TableIconCell}
          FallbackComponent={<TableCell cellData={cellData} />}
          propsToPassDown={{
            cellData,
            id,
            isHoveredRow,
            type,
          }}
          shouldRender={isIconCell}
        />
      );
    })}
  </StyledTableRow>
);

TableRow.propTypes = {
  handleHovered: T.func.isRequired,
  headers: T.array.isRequired,
  isHoveredRow: T.bool.isRequired,
  rowData: T.shape({ id: T.number }).isRequired,
  type: T.string.isRequired,
};

export default TableRow;
