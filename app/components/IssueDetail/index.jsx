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

import Comments from '../Coments';

const GlassesIcon = iconDictionary('glasses');

const IssueDetail = ({ data }) => {
  const hasDetails = isEmpty(data.issueDetail);

  console.log(data.IssueDetail);

  const {
    // attempts,
    comments,
    // id,
    language,
    datePosted,
    name,
    organization,
    organizationVerified,
    // overview,
    rep,
    setPrice,
    solved,
    watched,
  } = data.issueDetail;

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
                    When using anything else than NV12 or i420 with 601 colour
                    space, there are artefacts in the output. Theres something
                    like a pixel shift happening on the right part of the image.
                    It makes text very blurry. If you select NV12/i420/i444 with
                    709 or RGB in general. About 90% of the encoded frames are
                    dropped. My CPU nor GPU is significantly going up in usage.
                    To confirm OBS ignores the 709 part, I selected i444 with
                    709 and the other PC confirmed that its somehow a 709 matrix
                    over a 601 source. My Decklink card doesnt support keying,
                    only 1 SDI output, but I was recommended by der_rod on
                    Twitter to force keyer to 3 in the appdata config. This gave
                    me a very clean 4:4:4 output on 709, but it dropped so many
                    frames that its not usable. I wouldnt be able to use it
                    anyway since my Decklink card in the stream PC doesnt
                    support 4:4:4 above 1080p30.
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
              <Comments comments={['hello', 'goodbye']} />
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
      FallbackComponent={<div>Failed to load Issue Detail</div>}
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
