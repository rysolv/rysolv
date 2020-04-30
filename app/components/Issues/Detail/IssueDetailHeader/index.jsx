import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import {
  FundingWrapper,
  IconToolTip,
  WatchButton,
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

const IssueDetailHeader = ({ data, activeUser, handleIncrement }) => {
  const {
    id,
    createdDate,
    language,
    name,
    open,
    organization,
    organizationVerified,
    watching,
  } = data;

  const userWatching = activeUser.watching.includes(id);

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
          <WatchButton
            label={userWatching ? 'Watching' : 'Watch'}
            value={watching.length}
            handleWatch={() =>
              handleIncrement({
                userId: activeUser.id,
                id,
                column: 'watching',
                remove: userWatching,
              })
            }
          />
        </IssueSubItem>
      </IssueSubHeader>
    </IssueDetailTopBar>
  );
};

IssueDetailHeader.propTypes = {
  activeUser: T.object,
  data: T.object,
  handleIncrement: T.func,
};

export default IssueDetailHeader;
