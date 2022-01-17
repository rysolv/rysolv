import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';
import { usePlacesWidget } from 'react-google-autocomplete';
import isEmpty from 'lodash/isEmpty';

import { Input } from './styledComponents';

const LocationAutocompleteOption = ({ handleChangeInput, onBlur, value }) => {
  const { current: prevValue } = useRef(value);
  const [tempValue, setTempValue] = useState({});

  useEffect(() => {
    if (prevValue !== value) onBlur();
  }, [prevValue, value]);

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
    <Input
      ref={ref}
      height="4.9rem"
      onBlur={onBlur}
      onChange={e => setTempValue({ formattedAddress: e.target.value })}
      onFocus={handlePlacesWidgetFocus}
      value={tempValue.formattedAddress || value.formattedAddress || ''}
    />
  );
};

LocationAutocompleteOption.propTypes = {
  handleChangeInput: T.func.isRequired,
  onBlur: T.func.isRequired,
  value: T.object.isRequired,
};

export default LocationAutocompleteOption;
