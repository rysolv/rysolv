import React from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import iconDictionary from 'utils/iconDictionary';
import {
  ConditionalRender,
  BaseContainer,
  Upvote,
  CommentIcon,
  Verified,
  IconToolTip,
} from 'components/base_ui';
import Markdown from 'components/Markdown';
import {
  DollarWrapper,
  IssueDetailBody,
  IssueDetailColumn,
  IssueDetailHeader,
  IssueDetailOverview,
  IssueDetailTopBar,
  IssueDetailWrapper,
  IssueLanguage,
  IssueResolved,
  IssueSideBar,
  IssueSubHeader,
  IssueSubItem,
  LeftPanel,
  NameWrapper,
  OrganizationNameWrapper,
  OverviewActivityContainer,
  StyledImage,
  StyledIssueHeader,
  UpvotePanel,
} from './styledComponents';
import EmptyIssue from './EmptyIssue';

const GlassesIcon = iconDictionary('glasses');

const IssueDetail = ({ data: { issueDetail } }) => {
  const hasDetails = isEmpty(issueDetail.id);

  const {
    // attempts,
    comments,
    language,
    datePosted,
    name,
    organization,
    organizationVerified,
    body,
    rep,
    setPrice,
    solved,
    watched,
  } = issueDetail;

  const IssueDetailComponent = (
    <BaseContainer>
      <IssueDetailWrapper>
        <LeftPanel>
          <UpvotePanel>
            <Upvote />
            {rep}
          </UpvotePanel>
        </LeftPanel>
        <div>
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
              <IssueResolved solved={solved}>
                {solved ? 'Closed' : 'Open Issue'}
              </IssueResolved>

              <IssueSubItem>Posted {datePosted}</IssueSubItem>
              <IssueSubItem>0 Open PR</IssueSubItem>
              <IssueSubItem>
                <CommentIcon /> {comments} comments
              </IssueSubItem>
              <IssueSubItem>{watched} Watch</IssueSubItem>
            </IssueSubHeader>
          </IssueDetailTopBar>

          <IssueDetailColumn>
            <div>
              <OverviewActivityContainer>
                <StyledImage>AP</StyledImage>

                <IssueDetailOverview>
                  <IssueDetailHeader>Posted {datePosted}</IssueDetailHeader>
                  <IssueDetailBody>
                    <Markdown body={body} />
                  </IssueDetailBody>
                </IssueDetailOverview>
              </OverviewActivityContainer>
              <OverviewActivityContainer>
                <IssueDetailOverview>
                  <IssueDetailHeader>Recent Activity</IssueDetailHeader>
                  <IssueDetailBody>
                    <li>Issue accepted by Anna Pojawis</li>
                    <li>Issue accepted by Tyler Maran</li>
                    <li>Issue timed out by Anna Pojawis</li>
                    <li>PR Submitted by Tyler Maran</li>
                  </IssueDetailBody>
                </IssueDetailOverview>
              </OverviewActivityContainer>
              <br />

              <OverviewActivityContainer>
                <StyledImage>PH</StyledImage>

                <IssueDetailOverview>
                  <IssueDetailHeader>Paul House</IssueDetailHeader>
                  <IssueDetailBody>
                    Please report the NvidiaBlackmagic driver version (Desktop
                    Video) you used and also the Ubuntu, kernel and OBS-Studio
                    version. Did OBS-studio in Ubuntu linux show you the options
                    to set color space for Decklink output, since OBS-Studio
                    24.03 only shows Mode as in resolution and framerate for me
                    (BMD Desktop video 11.4 Ubuntu 19.04/kernel 5.0.0-37)?
                  </IssueDetailBody>
                </IssueDetailOverview>
              </OverviewActivityContainer>
              <OverviewActivityContainer>
                <StyledImage>PH</StyledImage>

                <IssueDetailOverview>
                  <IssueDetailHeader>Paul House</IssueDetailHeader>
                  <IssueDetailBody>Please report the</IssueDetailBody>
                </IssueDetailOverview>
              </OverviewActivityContainer>
              <OverviewActivityContainer>
                <StyledImage>PH</StyledImage>

                <IssueDetailOverview>
                  <IssueDetailHeader>Paul House</IssueDetailHeader>
                  <IssueDetailBody>
                    Please report the NvidiaBlackmagic driver version (Desktop
                    only shows Mode as in resolution and framerate for me (BMD
                    Desktop video 11.4 Ubuntu 19.04/kernel 5.0.0-37)?
                  </IssueDetailBody>
                </IssueDetailOverview>
              </OverviewActivityContainer>
              {/* <Comments comments={['hello', 'goodbye']} /> */}
            </div>
            <IssueSideBar>
              <IssueDetailHeader>Labels</IssueDetailHeader>
              <IssueDetailBody>Good first issue</IssueDetailBody>
              <IssueDetailHeader>Linked pull request</IssueDetailHeader>
              <IssueDetailBody>None</IssueDetailBody>
              <IssueDetailHeader>Payment</IssueDetailHeader>
              <IssueDetailBody>
                {' '}
                <DollarWrapper>${setPrice}</DollarWrapper>
              </IssueDetailBody>
              <IssueDetailHeader>Watching</IssueDetailHeader>
              <IssueDetailBody>
                <button
                  style={{
                    width: '6rem',
                    height: '2rem',
                  }}
                  type="button"
                  aria-label="Watch"
                >
                  {watched} {GlassesIcon}
                </button>
              </IssueDetailBody>
            </IssueSideBar>
          </IssueDetailColumn>
        </div>
      </IssueDetailWrapper>
    </BaseContainer>
  );

  return (
    <ConditionalRender
      Component={IssueDetailComponent}
      FallbackComponent={EmptyIssue}
      shouldRender={!hasDetails}
    />
  );
};

IssueDetail.propTypes = {
  alerts: T.shape({
    error: T.oneOfType([T.bool, T.object]),
    success: T.oneOfType([T.bool, T.object]),
  }),
  // clearAlerts: T.func,
  data: T.object,
  // handleDelete: T.func,
  // handleNav: T.func,
};

export default IssueDetail;
