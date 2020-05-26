import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import EmptyComponent from './EmptyComponent';
import OrganizationsComponent from './OrganizationsComponent';
import { HeaderWrapper, StyledH3 } from '../styledComponents';

const UserOrganizations = ({ organizations }) => (
  <Fragment>
    <HeaderWrapper>
      <StyledH3>Your Organizations</StyledH3>
    </HeaderWrapper>
    <ConditionalRender
      Component={OrganizationsComponent}
      FallbackComponent={EmptyComponent}
      propsToPassDown={{ organizations }}
      shouldRender={!!organizations.length}
    />
  </Fragment>
);

UserOrganizations.propTypes = { organizations: T.array };

export default UserOrganizations;
