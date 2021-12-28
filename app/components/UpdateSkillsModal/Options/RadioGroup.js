import React, { Fragment } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { ConditionalRender, Table } from 'components/base_ui';

import { Autocomplete } from '../styledComponents';

const RadioGroupOption = ({
  dispatchChangeInput,
  form,
  handleValidateInput,
  options,
  tableProps,
}) => {
  const handleAutocomplete = val => {
    const valArray = val.map(el => el.value);
    dispatchChangeInput({
      field: 'skills',
      form: 'application',
      value: valArray[0],
    });
  };

  return (
    <Fragment>
      <Autocomplete
        height="4.9rem"
        onBlur={() =>
          handleValidateInput({
            field: 'skills',
            formType: 'application',
            values: form,
          })
        }
        onChange={(e, val) => handleAutocomplete(val)}
        options={options}
        value={[]}
      />
      <ConditionalRender
        Component={Table}
        propsToPassDown={{
          tableData: form.skills,
          tableProps,
          type: 'skills',
        }}
        shouldRender={!isEmpty(form.skills)}
      />
    </Fragment>
  );
};

RadioGroupOption.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  handleValidateInput: T.func.isRequired,
  options: T.array.isRequired,
  tableProps: T.object.isRequired,
};

export default RadioGroupOption;
