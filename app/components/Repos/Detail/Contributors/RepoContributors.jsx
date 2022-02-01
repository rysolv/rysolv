import React from 'react';
import T from 'prop-types';

import { ImageLinkWrapper } from 'components/base_ui';

import {
  ContributorContent,
  ContributorDetails,
  ContributorImageWrapper,
  ContributorListItem,
  ContributorName,
} from './styledComponents';

const RepoContributors = ({ contributors, handleNav }) => (
  <ul>
    {contributors.map(
      ({ firstName, isOwner, lastName, profilePic, username }) => (
        <ContributorListItem key={username}>
          <ContributorContent>
            <ContributorImageWrapper>
              <ImageLinkWrapper
                alt={username}
                image={profilePic}
                route={`/users/${username}`}
                size="4.8rem"
              />
            </ContributorImageWrapper>
            <ContributorDetails>
              <span>
                <ContributorName
                  onClick={() => handleNav(`/users/${username}`)}
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
  </ul>
);

RepoContributors.propTypes = {
  contributors: T.array,
  handleNav: T.func,
};

export default RepoContributors;
