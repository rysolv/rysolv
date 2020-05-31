import React from 'react';
import T from 'prop-types';
import moment from 'moment';

import { navHelper } from 'utils/globalHelpers';

import {
  FundingWrapper,
  IconToolTip,
  LanguageWrapper,
  Verified,
  WatchButton,
} from 'components/base_ui';

import {
  IssueDetailTopBar,
  IssueSubHeader,
  IssueSubItem,
  NameWrapper,
  OrganizationNameWrapper,
  StyledIssueHeader,
  StyledVerified,
} from './styledComponents';

const IssueDetailHeader = ({
  activeUser,
  data,
  dispatchOpenModal,
  handleIncrement,
  handleNav,
  isSignedIn,
}) => {
  const {
    id,
    createdDate,
    language,
    name,
    open,
    organizationId,
    organizationName,
    organizationVerified,
    watching,
  } = data;
  const userWatching =
    activeUser.watching && !!activeUser.watching.find(el => el.id === id);

  return (
    <IssueDetailTopBar>
      <StyledIssueHeader>
        <OrganizationNameWrapper
          href={`/organizations/detail/${organizationId}`}
          onClick={e =>
            navHelper(e, handleNav, `/organizations/detail/${organizationId}`)
          }
        >
          {organizationName}

          {organizationVerified ? (
            <IconToolTip toolTipText="Verified Contributor">
              <StyledVerified>
                <Verified />
              </StyledVerified>
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
            disabled={!open}
            dispatchOpenModal={dispatchOpenModal}
            handleWatch={() =>
              handleIncrement({
                userId: activeUser.id,
                id,
                column: 'watching',
                remove: userWatching,
              })
            }
            isSignedIn={isSignedIn}
            label={userWatching ? 'Watching' : 'Watch'}
            value={watching.length}
          />
        </IssueSubItem>
      </IssueSubHeader>
    </IssueDetailTopBar>
  );
};

IssueDetailHeader.propTypes = {
  activeUser: T.object,
  data: T.object,
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  handleNav: T.func,
  isSignedIn: T.bool,
};

export default IssueDetailHeader;
