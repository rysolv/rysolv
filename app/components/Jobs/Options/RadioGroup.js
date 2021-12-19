import React, { Fragment } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { ConditionalRender, Table } from 'components/base_ui';

import { Autocomplete } from '../styledComponents';

const RadioGroupOption = ({
  form,
  handleChangeInput,
  handleValidateInput,
  id,
  options,
  tableData,
  tableProps,
  type,
}) => {
  const handleAutocomplete = val => {
    const valArray = val.map(el => el.value);
    handleChangeInput(valArray[0]);
  };

  return (
    <Fragment>
      <Autocomplete
        height="4.9rem"
        onBlur={() => handleValidateInput({ field: id, values: form })}
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
        shouldRender={!isEmpty(form[id])}
      />
    </Fragment>
  );
};

RadioGroupOption.propTypes = {
  form: T.object.isRequired,
  handleChangeInput: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  id: T.string.isRequired,
  options: T.array.isRequired,
  tableData: T.array.isRequired,
  tableProps: T.object.isRequired,
  type: T.string.isRequired,
};

export default RadioGroupOption;
