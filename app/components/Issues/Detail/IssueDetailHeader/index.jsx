import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { IconToolTip } from 'components/base_ui';
import { navHelper } from 'utils/globalHelpers';

import {
  IssueDetailContainer,
  NameWrapper,
  OrganizationNameContainer,
  StyledIssueDetail,
  StyledVerified,
} from './styledComponents';

const IssueDetailHeader = ({
  data: {
    createdDate,
    name,
    organizationId,
    organizationName,
    organizationVerified,
  },
  handleNav,
}) => (
  <Fragment>
    <IssueDetailContainer>
      <StyledIssueDetail>
        <OrganizationNameContainer
          href={`/organizations/detail/${organizationId}`}
          onClick={e =>
            navHelper(e, handleNav, `/organizations/detail/${organizationId}`)
          }
        >
          {organizationName}
          {organizationVerified ? (
            <IconToolTip toolTipText="Verified Contributor">
              <StyledVerified />
            </IconToolTip>
          ) : (
            ''
          )}
        </OrganizationNameContainer>
        <div>
          Issue opened{' '}
          {moment(createdDate)
            .utc()
            .format('M/D/YYYY')}
        </div>
      </StyledIssueDetail>
      <NameWrapper>{name}</NameWrapper>
    </IssueDetailContainer>
  </Fragment>
);

IssueDetailHeader.propTypes = {
  data: T.object,
  handleNav: T.func,
};

export default IssueDetailHeader;
