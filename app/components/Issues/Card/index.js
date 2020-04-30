import React, { Fragment } from 'react';
import T from 'prop-types';

import {
  CommentIcon,
  IconToolTip,
  LanguageWrapper,
  MonocleIcon,
  Upvote,
  Verified,
} from 'components/base_ui';
import SettingsMenu from 'components/SettingsMenu';
import { formatDollarAmount, navHelper } from 'utils/globalHelpers';
import IconDictionary from 'utils/iconDictionary';

import {
  IssueCardIconWrapper,
  IssueCardItem,
  IssueCardLabelWrapper,
  IssueLanguageContainer,
  NameWrapper,
  OrganizationNameWrapper,
  StyledFlatIconButton,
  StyledFundingWrapper,
  StyledIssueContent,
  StyledIssueFooter,
  StyledIssueHeader,
  StyledIssueText,
  StyledListItem,
  StyledVerified,
  UpvotePanel,
} from './styledComponents';

const AttemptingIcon = IconDictionary('attempt');

const IssueCard = ({ data, handleDeleteIssue, handleNav, handleUpvote }) => {
  const deleteRoute = `/admin/issues`;
  const editRoute = `/admin/issues/edit`;

  return data.map(
    ({
      id,
      name,
      organizationName,
      organizationId,
      organizationVerified,
      language,
      open,
      attempting,
      rep,
      watching,
      comments,
      value,
    }) => (
      <Fragment key={id}>
        <StyledListItem>
          <UpvotePanel>
            <StyledFlatIconButton
              Icon={<Upvote />}
              onClick={() => handleUpvote({ itemId: id })}
            />
            {rep}
          </UpvotePanel>
          <StyledIssueContent>
            <StyledIssueHeader>
              <OrganizationNameWrapper
                href={`/admin/organizations/detail/${organizationId}`}
                onClick={e =>
                  navHelper(
                    e,
                    handleNav,
                    `/admin/organizations/detail/${organizationId}`,
                  )
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
              <SettingsMenu
                handleDelete={handleDeleteIssue}
                handleNav={handleNav}
                deleteRoute={deleteRoute}
                editRoute={editRoute}
                handleFetchInfo={() => {}}
                id={id}
              />
            </StyledIssueHeader>
            <StyledIssueText>
              <NameWrapper
                href={`/admin/issues/detail/${id}`}
                onClick={e =>
                  navHelper(e, handleNav, `/admin/issues/detail/${id}`)
                }
              >
                {name}
              </NameWrapper>
              <IssueLanguageContainer>
                {language.map(el => (
                  <LanguageWrapper key={`${id}-${el}`} language={el} />
                ))}
              </IssueLanguageContainer>
            </StyledIssueText>

            <StyledIssueFooter open={open}>
              {open ? (
                <IssueCardItem>
                  <IssueCardIconWrapper>
                    <CommentIcon />
                  </IssueCardIconWrapper>
                  <IssueCardLabelWrapper>
                    {comments.length} comments
                  </IssueCardLabelWrapper>
                </IssueCardItem>
              ) : null}

              {open ? (
                <IssueCardItem>
                  <IssueCardIconWrapper>{AttemptingIcon}</IssueCardIconWrapper>
                  <IssueCardLabelWrapper>
                    {attempting.length} attempting
                  </IssueCardLabelWrapper>
                </IssueCardItem>
              ) : null}

              {open ? (
                <IssueCardItem>
                  <IssueCardIconWrapper>
                    <MonocleIcon />
                  </IssueCardIconWrapper>
                  <IssueCardLabelWrapper>
                    {watching.length} Watch
                  </IssueCardLabelWrapper>
                </IssueCardItem>
              ) : null}

              <StyledFundingWrapper
                open={open}
                value={open ? formatDollarAmount(value) : 'Issue Closed'}
                medium
              />
            </StyledIssueFooter>
          </StyledIssueContent>
        </StyledListItem>
      </Fragment>
    ),
  );
};

IssueCard.propTypes = {
  data: T.array.isRequired,
  handleDeleteIssue: T.func.isRequired,
  handleUpvote: T.func.isRequired,
  // handleFetchInfo: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default IssueCard;
