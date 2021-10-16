import React, { Fragment } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { ConditionalRender, Table } from 'components/base_ui';

import { Autocomplete } from './styledComponents';

const RadioGroup = ({
  handleChangeInput,
  options,
  tableData,
  tableProps,
  type,
  value,
}) => {
  const handleAutocomplete = val => {
    const valArray = val.map(el => el.value);
    handleChangeInput(valArray[0]);
  };

  return (
    <Fragment>
      <Autocomplete
        height="4.9rem"
        onChange={(e, val) => handleAutocomplete(val)}
        options={options}
        value={[]}
      />
      <ConditionalRender
        Component={Table}
        propsToPassDown={{
          tableData,
          tableProps,
          type,
        }}
        shouldRender={!isEmpty(value)}
      />
    </Fragment>
  );
};

RadioGroup.propTypes = {
  handleChangeInput: T.func.isRequired,
  options: T.array.isRequired,
  tableData: T.array.isRequired,
  tableProps: T.object.isRequired,
  type: T.string.isRequired,
  value: T.array.isRequired,
};

export default RadioGroup;
