import React from 'react';
import T from 'prop-types';

import ConditionalRender from '../ConditionalRender';

import TableCell from './TableCell';
import TableIconCell from './TableIconCell';
import { StyledTableRow } from './styledComponents';

const TableRow = ({
  handleHovered,
  handleRedirect,
  headers,
  isHoveredRow,
  route,
  rowData,
  type,
}) => (
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
            handleRedirect,
            id,
            isHoveredRow,
            route,
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
  handleRedirect: T.func,
  headers: T.array.isRequired,
  isHoveredRow: T.bool.isRequired,
  route: T.string,
  rowData: T.object.isRequired,
  type: T.string.isRequired,
};

export default TableRow;
