import React from 'react';
import T from 'prop-types';

import { LinkWrapper } from 'components/base_ui';

import {
  ContributorContent,
  ContributorDetails,
  ContributorImageWrapper,
  ContributorListItem,
  ContributorName,
  ContributorsList,
} from '../styledComponents';

const OrganizationContributorsTab = ({ contributors, handleNav }) => (
  <ContributorsList>
    {contributors.map(
      ({ firstName, id, isOwner, lastName, profilePic, username }) => (
        <ContributorListItem key={username}>
          <ContributorContent>
            <ContributorImageWrapper>
              <LinkWrapper
                alt={username}
                detailRoute={`/users/detail/${id}`}
                profilePic={profilePic}
                size="4.8rem"
                type="image"
              />
            </ContributorImageWrapper>
            <ContributorDetails>
              <span>
                <ContributorName
                  onClick={() => handleNav(`/users/detail/${id}`)}
                >
                  {firstName} {lastName}
                </ContributorName>{' '}
                {isOwner ? '– Owner' : ''}
              </span>
              {username}
            </ContributorDetails>
          </ContributorContent>
        </ContributorListItem>
      ),
    )}
  </ContributorsList>
);

OrganizationContributorsTab.propTypes = {
  contributors: T.array,
  handleNav: T.func,
};

export default OrganizationContributorsTab;
