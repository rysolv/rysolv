import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import IssuesComponent from './IssuesComponent';
import EmptyComponent from './EmptyComponent';
import { HeaderWrapper, StyledH3 } from '../styledComponents';

const UserIssues = ({ handleNav, issues }) => (
  <Fragment>
    <HeaderWrapper>
      <StyledH3>Your Issues</StyledH3>
    </HeaderWrapper>
    <ConditionalRender
      Component={IssuesComponent}
      FallbackComponent={EmptyComponent}
      propsToPassDown={{ handleNav, issues }}
      shouldRender={!!issues.length}
    />
  </Fragment>
);

UserIssues.propTypes = {
  handleNav: T.func,
  issues: T.array,
};

export default UserIssues;
