import React from 'react';
import T from 'prop-types';
import moment from 'moment';
import iconDictionary from 'utils/iconDictionary';

import {
  BaseContainer,
  CommentIcon,
  IconToolTip,
  BackIcon,
  Upvote,
  Verified,
} from 'components/base_ui';
import CommentCard from 'components/CommentCard';
import {
  // DollarWrapper,
  Divider,
  IssueDetailColumn,
  IssueDetailTopBar,
  IssueDetailWrapper,
  IssueLanguage,
  IssueResolved,
  IssueSubHeader,
  IssueSubItem,
  LeftPanel,
  NameWrapper,
  OrganizationNameWrapper,
  StyledFlatIconButton,
  StyledIssueHeader,
  UpvotePanel,
} from './styledComponents';

const MonocleIcon = iconDictionary('monocle');

const IssueDetail = ({ data, handleUpvote, handleNav }) => {
  const {
    // attempts,
    id,
    comments,
    language,
    createdDate,
    name,
    organization,
    organizationVerified,
    body,
    rep,
    // setPrice,
    open,
    watched,
    user: { username, profilePic },
  } = data;

  const userProfile = {
    small: true,
    detailRoute: `/admin/users/detail/${username}`,
    alt: username,
    username,
    profilePic,
  };

  return (
    <BaseContainer>
      <BackIcon /> Back to Issues
      <IssueDetailWrapper>
        <LeftPanel>
          <UpvotePanel>
            <StyledFlatIconButton
              Icon={<Upvote />}
              onClick={() => handleUpvote({ itemId: id })}
            />
            {rep}
          </UpvotePanel>
        </LeftPanel>
        <div>
          <IssueDetailColumn>
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

                <IssueLanguage>{language}</IssueLanguage>
              </StyledIssueHeader>
              <NameWrapper>{name}</NameWrapper>
              <IssueSubHeader>
                <IssueResolved open={open}>
                  {open ? 'Open Issue' : 'Closed'}
                </IssueResolved>

                <IssueSubItem>
                  Issue opened {moment(createdDate).format('M/D/YYYY')}
                </IssueSubItem>
                <IssueSubItem>0 Open PR</IssueSubItem>
                <IssueSubItem>
                  <CommentIcon /> {comments.length}{' '}
                  {comments.length > 1 ? 'comments' : 'comment'}
                </IssueSubItem>
                <IssueSubItem>
                  <StyledFlatIconButton Icon={MonocleIcon} />
                  {watched} Watch
                </IssueSubItem>
              </IssueSubHeader>
            </IssueDetailTopBar>
            <CommentCard
              primary
              body={body}
              date={createdDate}
              userProfile={userProfile}
              handleNav={handleNav}
            />
            <Divider>Comments</Divider>
            <CommentCard
              body="It's a feature not a bug dude"
              date={createdDate}
              userProfile={userProfile}
            />
            <CommentCard
              body="More different **comments** on something"
              date={createdDate}
              userProfile={userProfile}
            />
          </IssueDetailColumn>
        </div>
      </IssueDetailWrapper>
    </BaseContainer>
  );
};

IssueDetail.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  handleUpvote: T.func,
  data: T.object,
  handleNav: T.func,
};

export default IssueDetail;
