import React, { useState } from 'react';
import T from 'prop-types';

import { Table } from 'components/base_ui';

import {
  Autocomplete,
  OptionError,
  OptionLabel,
  OptionWrapper,
} from './styledComponents';

const RadioGroup = ({
  error,
  label,
  onChange,
  options,
  tableData,
  tableProps,
  type,
  value,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = useState(value || []);

  return (
    <OptionWrapper>
      <OptionLabel>{label}</OptionLabel>
      <Autocomplete
        height="4.9rem"
        onChange={onChange}
        options={options}
        value={selected.map(el => ({ value: el.value || el }))}
      />
      <Table
        onChange={onChange}
        tableData={tableData}
        tableProps={tableProps}
        type={type}
      />
      <OptionError>{error}</OptionError>
    </OptionWrapper>
  );
};

RadioGroup.propTypes = {
  error: T.oneOfType([T.bool, T.string]).isRequired,
  label: T.string.isRequired,
  onChange: T.func.isRequired,
  options: T.array.isRequired,
  tableData: T.array.isRequired,
  tableProps: T.object.isRequired,
  type: T.string.isRequired,
  value: T.string.isRequired,
};

export default RadioGroup;
