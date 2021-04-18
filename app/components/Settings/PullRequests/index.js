import React, { Fragment } from 'react';
import T from 'prop-types';

import { HeaderWrapper, StyledH3 } from '../styledComponents';

const UserPullRequests = ({ Component }) => (
  <Fragment>
    <HeaderWrapper>
      <StyledH3 removeMarginTop>Your Pull Requests</StyledH3>
    </HeaderWrapper>
    <Component />
  </Fragment>
);

UserPullRequests.propTypes = {
  Component: T.oneOfType([T.func, T.node, T.object]).isRequired,
};

export default UserPullRequests;
