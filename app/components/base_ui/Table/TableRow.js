/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { formatToSnakeCase } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import TableCell from './TableCell';
import TableInput from './TableInput';
import { StyledChip, StyledTableRow } from './styledComponents';

const CloseIcon = iconDictionary('close');

const TableRow = ({
  dispatchChangeSkillLevel,
  dispatchDeleteSkill,
  headers,
  rowData,
}) => (
  <StyledTableRow>
    {headers.map((header, index) => {
      const formattedHeader = formatToSnakeCase(header);
      const { [formattedHeader]: cellData } = rowData;
      const { skill } = rowData;
      const formattedCellData = {
        beginner: (
          <TableInput
            checked={cellData}
            onChange={() =>
              dispatchChangeSkillLevel({ skill, level: 'beginner' })
            }
          />
        ),
        expert: (
          <TableInput
            checked={cellData}
            onChange={() =>
              dispatchChangeSkillLevel({ skill, level: 'expert' })
            }
          />
        ),
        intermediate: (
          <TableInput
            checked={cellData}
            onChange={() =>
              dispatchChangeSkillLevel({ skill, level: 'intermediate' })
            }
          />
        ),
        skill: (
          <StyledChip
            classes={{ deletable: 'deletable' }}
            deleteIcon={CloseIcon}
            label={cellData}
            onDelete={() => dispatchDeleteSkill({ skill: cellData })}
          />
        ),
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
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  headers: T.array.isRequired,
  rowData: T.shape({ id: T.string }).isRequired,
};

export default TableRow;
