import React, { Fragment } from 'react';
import T from 'prop-types';

import {
  CommentIcon,
  MonocleIcon,
  IconToolTip,
  Upvote,
  Verified,
  LanguageWrapper,
} from 'components/base_ui';
import { formatDollarAmount, navHelper } from 'utils/globalHelpers';
import SettingsMenu from 'components/SettingsMenu';
import IconDictionary from 'utils/iconDictionary';

import {
  IssueCardIconWrapper,
  IssueCardItem,
  IssueCardLabelWrapper,
  NameWrapper,
  OrganizationNameWrapper,
  StyledFlatIconButton,
  StyledFundingWrapper,
  StyledIssueContent,
  StyledIssueFooter,
  StyledIssueHeader,
  StyledIssueText,
  StyledListItem,
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
                href={`/admin/companies/detail/${organizationId}`}
                onClick={e =>
                  navHelper(
                    e,
                    handleNav,
                    `/admin/companies/detail/${organizationId}`,
                  )
                }
              >
                {organizationName}

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
              <LanguageWrapper language={language} />

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
