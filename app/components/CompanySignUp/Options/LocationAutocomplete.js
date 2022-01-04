import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';
import { usePlacesWidget } from 'react-google-autocomplete';

import { Input } from './styledComponents';

const LocationAutocompleteOption = ({ handleChangeInput, onBlur, value }) => {
  const { current: prevValue } = useRef(value);
  const [tempValue, setTempValue] = useState('');

  useEffect(() => {
    if (prevValue !== value) onBlur();
  }, [prevValue, value]);

  const { ref } = usePlacesWidget({
    apiKey: process.env.GOOGLE_API_KEY,
    onPlaceSelected: place => {
      handleChangeInput(place.formatted_address);
      setTempValue('');
    },
    options: {
      fields: ['address_components', 'formatted_address', 'utc_offset_minutes'],
    },
  });

  const handlePlacesWidgetFocus = () => {
    if (tempValue !== '' || value !== '') {
      handleChangeInput('');
      setTempValue('');
    }
  };

  return (
    <Input
      ref={ref}
      height="4.9rem"
      onBlur={onBlur}
      onChange={e => setTempValue(e.target.value)}
      onFocus={handlePlacesWidgetFocus}
      value={tempValue || value}
    />
  );
};

LocationAutocompleteOption.propTypes = {
  handleChangeInput: T.func.isRequired,
  onBlur: T.func.isRequired,
  value: T.string.isRequired,
};

export default LocationAutocompleteOption;
