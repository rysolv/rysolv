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
      ({ firstName, id, isOwner, lastName, user, userImage }) => (
        <ContributorListItem>
          <ContributorContent>
            <ContributorImage src={userImage} />
            <ContributorDetails>
              <span>
                <ContributorName
                  onClick={() => handleNav(`/admin/users/detail/${id}`)}
                >
                  {firstName} {lastName}
                </ContributorName>{' '}
                {isOwner ? '– Owner' : ''}
              </span>
              {user}
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
