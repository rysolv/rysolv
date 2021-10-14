import React from 'react';
import T from 'prop-types';
import TableHead from '@material-ui/core/TableHead';

import { TableHeaderCell, TableHeaderRow } from './styledComponents';

const TableHeaders = ({ headers }) => (
  <TableHead>
    <TableHeaderRow>
      {headers.map(header => (
        <TableHeaderCell key={`table-data-header-${header}`} isHeader>
          {header === 'Skill' ? '' : header}
        </TableHeaderCell>
      ))}
    </TableHeaderRow>
  </TableHead>
);

TableHeaders.propTypes = { headers: T.array.isRequired };

export default TableHeaders;
