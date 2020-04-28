import React from 'react';
import T from 'prop-types';

import {
  CommentIcon,
  FundingWrapper,
  IconToolTip,
  Upvote,
  Verified,
} from 'components/base_ui';
import { formatDollarAmount, navHelper } from 'utils/globalHelpers';
import SettingsMenu from 'components/SettingsMenu';
import ListAltIcon from '@material-ui/icons/ListAlt';

import {
  NameWrapper,
  StyledListItem,
  StyledIssueHeader,
  IssueLanguage,
  StyledIssueContent,
  StyledIssueText,
  StyledIssueFooter,
  OrganizationNameWrapper,
  UpvotePanel,
  StyledFlatIconButton,
} from './styledComponents';

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
      <div key={id}>
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

              <IssueLanguage>{language}</IssueLanguage>
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
            <StyledIssueFooter>
              <div>
                {open ? (
                  <div>
                    <CommentIcon /> {comments.length} comments
                  </div>
                ) : null}
              </div>
              <div>
                {open ? (
                  <div>
                    <ListAltIcon />
                    {attempting.length} attempting
                  </div>
                ) : null}
              </div>
              <div>{open ? <div>{watching.length} Watch</div> : null}</div>

              <FundingWrapper
                open={open}
                value={open ? formatDollarAmount(value) : 'Closed'}
              />
            </StyledIssueFooter>
          </StyledIssueContent>
        </StyledListItem>
      </div>
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
