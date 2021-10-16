import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';

import { Input } from './styledComponents';

let autoComplete;

const loadScript = (url, callback) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

const handleScriptLoad = (updateQuery, autoCompleteRef) => {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ['(cities)'], componentRestrictions: { country: 'us' } },
  );
  autoComplete.setFields(['address_components', 'formatted_address']);
  autoComplete.addListener('place_changed', () =>
    handlePlaceSelect(updateQuery),
  );
};

const handlePlaceSelect = async updateQuery => {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
};

const LocationAutocompleteOption = ({ onBlur, value }) => {
  const [query, setQuery] = useState(value);
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${
        process.env.REACT_APP_GOOGLE_API_KEY
      }&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef),
    );
  }, []);

  return (
    <Input
      height="4.9rem"
      onBlur={onBlur}
      onChange={event => setQuery(event.target.value)}
      value={query}
    />
  );
};

LocationAutocompleteOption.propTypes = {
  onBlur: T.func.isRequired,
  value: T.string.isRequired,
};

export default LocationAutocompleteOption;
