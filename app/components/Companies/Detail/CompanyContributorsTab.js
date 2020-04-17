import React from 'react';
import T from 'prop-types';

import {
  ContributorContent,
  ContributorDetails,
  ContributorImage,
  ContributorListItem,
  ContributorName,
  ContributorsList,
} from './styledComponents';

const CompanyContributorsTab = ({ contributors, handleNav }) => (
  <ContributorsList>
    {contributors.map(
      ({ firstName, id, isOwner, lastName, username, profilePic }) => (
        <ContributorListItem>
          <ContributorContent>
            <ContributorImage src={profilePic} />
            <ContributorDetails>
              <span>
                <ContributorName
                  onClick={() => handleNav(`/admin/users/detail/${id}`)}
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
