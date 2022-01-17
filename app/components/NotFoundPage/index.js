/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React, { Fragment, useEffect } from 'react';

import AlertMessage from 'components/AlertMessage';

import { LinkWrapper, NotFoundIcon } from './styledComponents';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found';
  }, []);
  const FootnoteComponent = (
    <Fragment>
      <span>If you feel something is missing that should be here, </span>
      <LinkWrapper to="/contact-us">contact us</LinkWrapper>.
    </Fragment>
  );
  return (
    <Fragment>
      <AlertMessage
        body="We're sorry, we couldn't find the page you requested."
        footnote={FootnoteComponent}
        icon={<NotFoundIcon>404</NotFoundIcon>}
        title="Page not found."
      />
    </Fragment>
  );
};

NotFound.propTypes = {};

export default NotFound;
