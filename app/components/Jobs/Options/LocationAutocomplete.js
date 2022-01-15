import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';
import { usePlacesWidget } from 'react-google-autocomplete';
import isEmpty from 'lodash/isEmpty';

import {
  Input,
  InputError,
  StyledCheckboxWithLabel,
} from '../styledComponents';

const LocationAutocompleteOption = ({
  additionalInputProps,
  form,
  formErrors,
  handleChangeInput,
  handleValidateInput,
  id,
}) => {
  const { id: checkboxId, question } = additionalInputProps;
  const value = form[id];
  const { current: prevValue } = useRef(value);
  const [tempValue, setTempValue] = useState({});

  useEffect(() => {
    if (prevValue !== value)
      handleValidateInput({ field: id, formType: 'application', values: form });
  }, [prevValue, value]);

  const isChecked = form[checkboxId] === 'Yes';
  const newIsChecked = isChecked ? 'No' : 'Yes';

  const { ref } = usePlacesWidget({
    apiKey: process.env.GOOGLE_API_KEY,
    onPlaceSelected: ({
      address_components: addressComponents,
      formatted_address: formattedAddress,
      utc_offset_minutes: utcOffset,
    }) => {
      const locationData = {
        formattedAddress,
        utcOffset,
      };

      addressComponents.forEach(el => {
        if (el.types.includes('country')) {
          locationData.country = el.long_name;
          locationData.countryCode = el.short_name;
        }
      });

      handleChangeInput(locationData);
      setTempValue({});
    },
    options: {
      fields: ['address_components', 'formatted_address', 'utc_offset_minutes'],
    },
  });

  const handlePlacesWidgetFocus = () => {
    if (!isEmpty(tempValue) || !isEmpty(value)) {
      handleChangeInput({});
      setTempValue({});
    }
  };

  return (
    <div>
      <Input
        ref={ref}
        height="4.9rem"
        onBlur={() =>
          handleValidateInput({
            field: id,
            formType: 'application',
            values: form,
          })
        }
        onChange={e => setTempValue({ formattedAddress: e.target.value })}
        onFocus={handlePlacesWidgetFocus}
        value={tempValue.formattedAddress || value.formattedAddress || ''}
      />
      <StyledCheckboxWithLabel
        checked={isChecked}
        label={question}
        onBlur={() =>
          handleValidateInput({
            field: checkboxId,
            formType: 'application',
            values: form,
          })
        }
        onChange={() => handleChangeInput(newIsChecked, checkboxId)}
      />
      <InputError>{formErrors[id]}</InputError>
    </div>
  );
};

LocationAutocompleteOption.propTypes = {
  additionalInputProps: T.object.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleChangeInput: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  id: T.string.isRequired,
};

export default LocationAutocompleteOption;
