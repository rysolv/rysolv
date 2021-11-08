import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';
import { usePlacesWidget } from 'react-google-autocomplete';

import { Input, StyledCheckboxWithLabel } from './styledComponents';

const LocationAutocompleteOption = ({
  additionalInputProps,
  handleChangeInput,
  onBlur,
  value,
}) => {
  const { id, question, value: checkboxValue } = additionalInputProps;
  const { current: prevValue } = useRef(value);
  const [tempValue, setTempValue] = useState('');

  useEffect(() => {
    if (prevValue !== value) onBlur();
  }, [prevValue, value]);

  const isChecked = checkboxValue === 'Yes';
  const newIsChecked = isChecked ? 'No' : 'Yes';

  const { ref } = usePlacesWidget({
    apiKey: process.env.GOOGLE_API_KEY,
    onPlaceSelected: place => {
      handleChangeInput(place.formatted_address);
      setTempValue('');
    },
  });

  const handlePlacesWidgetFocus = () => {
    if (tempValue !== '' || value !== '') {
      handleChangeInput();
      setTempValue('');
    }
  };

  return (
    <div>
      <Input
        ref={ref}
        height="4.9rem"
        onBlur={onBlur}
        onChange={e => setTempValue(e.target.value)}
        onFocus={handlePlacesWidgetFocus}
        value={value}
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
