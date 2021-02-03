import React, { Fragment } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { LoadingIndicator } from 'components/base_ui';
import Message from 'components/Message';
import NotFoundPage from 'components/NotFoundPage';
import iconDictionary from 'utils/iconDictionary';

import { IconWrapper, LinkWrapper } from './styledComponents';

const WarningIcon = iconDictionary('warning');

const AsyncRender = ({
  asyncData,
  component,
  error,
  isNotFound,
  isRequiredData,
  loading,
  propsToPassDown,
}) => {
  const FootnoteComponent = (
    <Fragment>
      <span>You can</span>
      <LinkWrapper to="/contact-us"> contact us </LinkWrapper>
      <span>if the problem persists</span>.
    </Fragment>
  );
  if (loading) {
    return <LoadingIndicator />;
  }
  if (isNotFound) {
    return <NotFoundPage />;
  }
  if (error) {
    return (
      <Message
        body="We couldn't load the content for this page. Please try again later."
        footnote={FootnoteComponent}
        icon={<IconWrapper>{WarningIcon}</IconWrapper>}
        title="Error loading page."
      />
    );
  }
  if (!isRequiredData || !isEmpty(asyncData)) {
    const ComponentToRender = component;
    return <ComponentToRender data={asyncData} {...propsToPassDown} />;
  }
  return (
    <Message
      body="Please try reloading the page to see if this resolves the problem."
      footnote={FootnoteComponent}
      icon={<IconWrapper>{WarningIcon}</IconWrapper>}
      title="Sorry, something went wrong."
    />
  );
};

AsyncRender.defaultProps = {
  isNotFound: false,
  isRequiredData: false,
  propsToPassDown: {},
};

AsyncRender.propTypes = {
  asyncData: T.oneOfType([T.array, T.object]),
  component: T.oneOfType([T.func, T.object]),
  error: T.oneOfType([T.bool, T.object, T.string]),
  isNotFound: T.bool,
  isRequiredData: T.bool,
  loading: T.bool,
  propsToPassDown: T.object,
};

export default AsyncRender;
