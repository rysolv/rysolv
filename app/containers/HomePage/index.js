/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import BaseButton from '../../components/base_ui/buttons/BaseButton';
import BaseLink from '../../components/base_ui/links/BaseLink';
import Footer from '../../components/Footer';

export default function HomePage() {
  return (
    <h1>
      <BaseButton label="hello" />
      <BaseLink label="hello" path="/" />
      <FormattedMessage {...messages.header} />
      <Footer />
    </h1>
  );
}
