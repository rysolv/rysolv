import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';
import { usePlacesWidget } from 'react-google-autocomplete';

import { Input, StyledCheckboxWithLabel } from './styledComponents';

const LocationAutocompleteOption = ({
  dispatchChangeRemoteStatus,
  handleChangeInput,
  onBlur,
  value,
}) => {
  const { current: prevValue } = useRef(value);
  const [tempValue, setTempValue] = useState('');

  useEffect(() => {
    if (prevValue !== value) onBlur();
  }, [prevValue, value]);

  const checked = value.includes('Remote');

  const { ref } = usePlacesWidget({
    apiKey: process.env.GOOGLE_API_KEY,
    onPlaceSelected: place => {
      handleChangeInput(place.formatted_address);
      setTempValue('');
    },
  });

  const tempValueArray = value.filter(val => val !== 'Remote');

  const handlePlacesWidgetFocus = () => {
    if (tempValue !== '' || tempValueArray.length !== 0) {
      handleChangeInput();
      setTempValue('');
    }
  };

  return (
    <div>
      <Input
        ref={ref}
        height="4.9rem"
        onChange={e => setTempValue(e.target.value)}
        onFocus={handlePlacesWidgetFocus}
        value={tempValueArray[0] || tempValue}
      />
      <StyledCheckboxWithLabel
        checked={checked}
        label="This position is remote"
        onChange={dispatchChangeRemoteStatus}
      />
    </div>
  );
};

LocationAutocompleteOption.propTypes = {
  dispatchChangeRemoteStatus: T.func.isRequired,
  handleChangeInput: T.func.isRequired,
  onBlur: T.func.isRequired,
  value: T.array.isRequired,
};

export default LocationAutocompleteOption;
