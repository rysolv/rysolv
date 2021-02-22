import React, { Fragment } from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { ConditionalRender, IconToolTip } from 'components/base_ui';

import {
  IssueDetailContainer,
  NameWrapper,
  RepoNameContainer,
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
          <RepoNameContainer>
            <Link to={`/repos/detail/${organizationId}`}>
              {organizationName}
            </Link>
            {organizationVerified ? (
              <IconToolTip toolTipText="Verified Contributor">
                <StyledVerified />
              </IconToolTip>
            ) : (
              ''
            )}
          </RepoNameContainer>
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
  nameChange: T.string,
  setNameChange: T.func,
};

export default IssueDetailHeader;
