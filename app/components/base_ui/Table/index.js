import React from 'react';
import T from 'prop-types';
import Table from '@material-ui/core/Table';

import ConditionalRender from '../ConditionalRender';

import TABLE_HEADERS from './constants';
import TableBody from './TableBody';
import TableHeaders from './TableHeaders';
import { TableWrapper } from './styledComponents';

const BaseTable = ({ onChange, tableData, tableProps, type }) => {
  const headers = TABLE_HEADERS[type];

  return (
    <TableWrapper>
      <Table>
        <TableHeaders headers={headers} />
        <ConditionalRender
          Component={TableBody}
          propsToPassDown={{
            headers,
            numColumn: headers.length,
            onChange,
            tableData,
            tableProps,
          }}
          shouldRender={!!tableData.length}
        />
      </Table>
    </TableWrapper>
  );
};

BaseTable.propTypes = {
  onChange: T.func.isRequired,
  tableData: T.arrayOf(T.object).isRequired,
  tableProps: T.object.isRequired,
  type: T.string.isRequired,
};

export default BaseTable;
