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

  // @TODO: Location
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

      // TODO: Send this object to the backend
      console.log(locationData);

      handleChangeInput(formattedAddress);
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
