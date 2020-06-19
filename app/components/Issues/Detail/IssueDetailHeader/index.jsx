import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { ConditionalRender, IconToolTip } from 'components/base_ui';
import { navHelper } from 'utils/globalHelpers';

import {
  IssueDetailContainer,
  NameWrapper,
  OrganizationNameContainer,
  StyledBaseTextInput,
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
  displayEditView,
  handleNav,
  nameChange,
  setNameChange,
}) => {
  const EditNameComponent = (
    <StyledBaseTextInput
      onChange={e => setNameChange(e.target.value)}
      multiline
      value={nameChange}
      width="100%"
    />
  );

  const NameComponent = <Fragment>{name}</Fragment>;
  return (
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
        <NameWrapper>
          <ConditionalRender
            Component={NameComponent}
            FallbackComponent={EditNameComponent}
            shouldRender={!displayEditView}
          />
        </NameWrapper>
      </IssueDetailContainer>
    </Fragment>
  );
};

IssueDetailHeader.propTypes = {
  data: T.object,
  displayEditView: T.bool,
  handleNav: T.func,
  nameChange: T.string,
  setNameChange: T.func,
};

export default IssueDetailHeader;
