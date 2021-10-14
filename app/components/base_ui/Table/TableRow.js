/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { formatToSnakeCase } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import TableCell from './TableCell';
import TableInput from './TableInput';
import { StyledChip, StyledTableRow } from './styledComponents';

const CloseIcon = iconDictionary('close');

const TableRow = ({ dispatchDeleteSkill, headers, onChange, rowData }) => (
  <StyledTableRow>
    {headers.map((header, index) => {
      const formattedHeader = formatToSnakeCase(header);
      const { [formattedHeader]: cellData } = rowData;
      const formattedCellData = {
        skill: (
          <StyledChip
            deleteIcon={CloseIcon}
            label={cellData}
            onDelete={() => dispatchDeleteSkill({ skill: cellData })}
          />
        ),
        level_1: <TableInput checked={cellData} onChange={onChange} />,
        level_2: <TableInput checked={cellData} onChange={onChange} />,
        level_3: <TableInput checked={cellData} onChange={onChange} />,
      };
      return (
        <TableCell
          key={`table-data-${header}-${index}`}
          cellData={formattedCellData[formattedHeader]}
        />
      );
    })}
  </StyledTableRow>
);

TableRow.propTypes = {
  dispatchDeleteSkill: T.func.isRequired,
  onChange: T.func.isRequired,
  headers: T.array.isRequired,
  rowData: T.shape({ id: T.string }).isRequired,
};

export default TableRow;
