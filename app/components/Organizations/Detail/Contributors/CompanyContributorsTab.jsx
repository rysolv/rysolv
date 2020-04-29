import React from 'react';
import T from 'prop-types';

import { ProfileImage } from 'components/base_ui';

import {
  ContributorContent,
  ContributorDetails,
  ContributorImageWrapper,
  ContributorListItem,
  ContributorName,
  ContributorsList,
} from '../styledComponents';

const CompanyContributorsTab = ({ contributors, handleNav }) => (
  <ContributorsList>
    {contributors.map(
      ({ firstName, isOwner, lastName, username, profilePic }) => (
        <ContributorListItem key={username}>
          <ContributorContent>
            <ContributorImageWrapper>
              <ProfileImage
                alt={username}
                detailRoute={`/admin/users/detail/${username}`}
                handleNav={handleNav}
                profilePic={profilePic}
                size="4.8rem"
              />
            </ContributorImageWrapper>
            <ContributorDetails>
              <span>
                <ContributorName
                  onClick={() => handleNav(`/admin/users/detail/${username}`)}
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

CompanyContributorsTab.propTypes = {
  contributors: T.array,
  handleNav: T.func,
};

export default CompanyContributorsTab;
