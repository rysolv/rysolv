/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';

import SideNav from 'components/SideNav';

const Test = () => {
  const [body, setBody] = useState('');

  if (body === '') {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://api.github.com/repos/obsproject/obs-studio/issues/2675',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setBody(result.body);
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div>
      <SideNav />
    </div>
  );
};

export default Test;
