import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';
import { usePlacesWidget } from 'react-google-autocomplete';
import isEmpty from 'lodash/isEmpty';

import { Input, StyledCheckboxWithLabel } from './styledComponents';

const LocationAutocompleteOption = ({
  additionalInputProps,
  handleChangeInput,
  onBlur,
  value,
}) => {
  const { id, question, value: checkboxValue } = additionalInputProps;
  const { current: prevValue } = useRef(value);
  const [tempValue, setTempValue] = useState({});

  useEffect(() => {
    if (prevValue !== value) onBlur();
  }, [prevValue, value]);

  const isChecked = checkboxValue === 'Yes';
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
        onBlur={onBlur}
        onChange={e => setTempValue({ formattedAddress: e.target.value })}
        onFocus={handlePlacesWidgetFocus}
        value={tempValue.formattedAddress || value.formattedAddress || ''}
      />
      <StyledCheckboxWithLabel
        checked={isChecked}
        onBlur={onBlur}
        label={question}
        onChange={() => handleChangeInput(newIsChecked, id)}
      />
    </div>
  );
};

LocationAutocompleteOption.propTypes = {
  additionalInputProps: T.object.isRequired,
  handleChangeInput: T.func.isRequired,
  onBlur: T.func.isRequired,
  value: T.string.isRequired,
};

export default LocationAutocompleteOption;
