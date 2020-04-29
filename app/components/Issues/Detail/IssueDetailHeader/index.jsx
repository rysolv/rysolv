import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import {
  CommentIcon,
  FundingWrapper,
  IconToolTip,
  MonocleIcon,
  Verified,
  LanguageWrapper,
} from 'components/base_ui';

import {
  IssueDetailTopBar,
  IssueSubHeader,
  IssueSubItem,
  NameWrapper,
  OrganizationNameWrapper,
  StyledIssueHeader,
} from './styledComponents';

const IssueDetailHeader = ({ data }) => {
  const {
    comments,
    createdDate,
    language,
    name,
    open,
    organization,
    organizationVerified,
    watched,
  } = data;

  return (
    <IssueDetailTopBar>
      <StyledIssueHeader>
        <OrganizationNameWrapper>
          {organization}

          {organizationVerified ? (
            <IconToolTip toolTipText="Verified Contributor">
              <div>
                <Verified />
              </div>
            </IconToolTip>
          ) : (
            ''
          )}
        </OrganizationNameWrapper>
        Issue opened {moment(createdDate).format('M/D/YYYY')}
      </StyledIssueHeader>
      <NameWrapper>{name}</NameWrapper>
      <IssueSubHeader>
        <FundingWrapper
          medium
          open={open}
          value={open ? 'Open Issue' : 'Closed'}
        />

        <IssueSubItem>
          {' '}
          <LanguageWrapper language={language} />
          {/* <IssueLanguage></IssueLanguage> */}
        </IssueSubItem>
        <IssueSubItem>0 Open PR</IssueSubItem>
        <IssueSubItem>
          <CommentIcon /> {comments.length}{' '}
          {comments.length > 1 ? 'comments' : 'comment'}
        </IssueSubItem>
        <IssueSubItem>
          <MonocleIcon />
          {watched} Watch
        </IssueSubItem>
      </IssueSubHeader>
    </IssueDetailTopBar>
  );
};

IssueDetailHeader.propTypes = {
  data: T.object,
};

export default IssueDetailHeader;
