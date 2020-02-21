/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {
  BaseButton,
  BaseCheckbox,
  BaseInput,
  BaseLink,
} from '../../components/base_ui';
import Footer from '../../components/Footer';

export default function HomePage() {
  return (
    <h1>
      <BaseButton label="hello" />
      <BaseLink label="hello" path="/" />
      <FormattedMessage {...messages.header} />
      <Footer />
      <BaseInput label="hello" />
      <BaseCheckbox label="hello" />
    </h1>
  );
}
