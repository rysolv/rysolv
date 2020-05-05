import React from 'react';

import Splash from 'components/Splash';
import Landing from 'components/Landing';

import { HomePageContainer } from './styledComponents';

export default function HomePage() {
  document.title = 'Rysolv';
  return (
    <HomePageContainer>
      <Splash />
      <Landing />
    </HomePageContainer>
  );
}
