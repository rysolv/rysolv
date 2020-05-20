import React, { useState } from 'react';
import T from 'prop-types';
import Table from '@material-ui/core/Table';

import ConditionalRender from '../ConditionalRender';

import { tableHeaderDictionary } from './constants';
import EmptyTableMessage from './EmptyTableMessage';
import TableBody from './TableBody';
import TableHeaders from './TableHeaders';
import { TableWrapper } from './styledComponents';

const BaseTable = ({ handleRedirect, route, tableData, type }) => {
  const [hoveredRow, setHovered] = useState('0');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('Issue');
  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const headers = tableHeaderDictionary[type];
  return (
    <TableWrapper>
      <Table>
        <TableHeaders
          headers={headers}
          onRequestSort={handleRequestSort}
          order={order}
          orderBy={orderBy}
        />
        <ConditionalRender
          Component={TableBody}
          FallbackComponent={
            <EmptyTableMessage numColumn={headers.length} type={type} />
          }
          propsToPassDown={{
            handleHovered: setHovered,
            handleRedirect,
            headers,
            hoveredRow,
            order,
            orderBy,
            route,
            tableData,
            type,
          }}
          shouldRender={!!tableData.length}
        />
      </Table>
    </TableWrapper>
  );
};

BaseTable.propTypes = {
  handleRedirect: T.func,
  route: T.string,
  tableData: T.arrayOf(T.object).isRequired,
  type: T.string.isRequired,
};

export default BaseTable;
