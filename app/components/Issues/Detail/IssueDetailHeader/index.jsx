import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import {
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
    id,
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
          value={open ? 'Open Issue' : 'Issue Closed'}
        />

        <IssueSubItem>
          {language.map(el => (
            <LanguageWrapper key={`${id}-${el}`} language={el} />
          ))}
        </IssueSubItem>
        <IssueSubItem>0 Open PR</IssueSubItem>
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
