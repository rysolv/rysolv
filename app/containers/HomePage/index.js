/*
 * HomePage
 */

import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Splash from '../../components/Spash';

export default function HomePage() {
  return (
    <Fragment>
      <Splash />
      <FormattedMessage {...messages.header} />
    </Fragment>
  );
}
