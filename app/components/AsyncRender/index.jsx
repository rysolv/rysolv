import React, { Fragment } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { LoadingIndicator } from 'components/base_ui';
import AlertMessage from 'components/AlertMessage';
import iconDictionary from 'utils/iconDictionary';

import { IconWrapper, LinkWrapper } from './styledComponents';

const WarningIcon = iconDictionary('warning');

const AsyncRender = ({
  asyncData,
  component,
  error,
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
  if (error) {
    return (
      <AlertMessage
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
    <AlertMessage
      body="Please try reloading the page to see if this resolves the problem."
      footnote={FootnoteComponent}
      icon={<IconWrapper>{WarningIcon}</IconWrapper>}
      title="Sorry, something went wrong."
    />
  );
};

AsyncRender.defaultProps = { isRequiredData: false, propsToPassDown: {} };

AsyncRender.propTypes = {
  asyncData: T.oneOfType([T.array, T.object, T.string]),
  component: T.oneOfType([T.func, T.object]),
  error: T.oneOfType([T.bool, T.object, T.string]),
  isRequiredData: T.bool,
  loading: T.bool,
  propsToPassDown: T.object,
};

export default AsyncRender;
