/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import T from 'prop-types';

import { Star, ProfileImage } from 'components/base_ui';
import SettingsMenu from 'components/SettingsMenu';
import { navHelper } from 'utils/globalHelpers';

import {
  ActiveContainer,
  ContentWrapper,
  IconWrapper,
  ImageContainer,
  IssuesContainer,
  IssuesWrapper,
  MemberInfoContainer,
  MemberWrapper,
  NameWrapper,
  NumberContainer,
  StyledListSquare,
  StyledSettingWrapper,
  StyledSquare,
  StyledUserCard,
} from './styledComponents';

const UserCard = ({ data, handleDeleteUser, handleFetchInfo, handleNav }) => {
  const deleteRoute = `/admin/users`;
  const editRoute = `/admin/users/edit`;

  return (
    <Fragment>
      <StyledUserCard>
        {data.map(
          (
            {
              attempting,
              createdDate,
              id,
              issuesNumber,
              name,
              pointsNumber,
              profilePic,
              username,
            },
            index,
          ) => (
            <StyledListSquare key={`${name}-${index}`}>
              <StyledSquare>
                <StyledSettingWrapper>
                  <MemberWrapper>
                    <NameWrapper
                      onClick={e =>
                        navHelper(
                          e,
                          handleNav,
                          `/admin/users/detail/${username}`,
                        )
                      }
                      href={`/admin/users/detail/${username}`}
                    >
                      {name}
                    </NameWrapper>
                    <MemberInfoContainer>
                      Member since {createdDate}
                    </MemberInfoContainer>
                  </MemberWrapper>
                  <SettingsMenu
                    deleteRoute={deleteRoute}
                    editRoute={editRoute}
                    handleDelete={handleDeleteUser}
                    handleFetchInfo={handleFetchInfo}
                    handleNav={handleNav}
                    id={id}
                  />
                </StyledSettingWrapper>
                <ContentWrapper>
                  <ImageContainer>
                    <ProfileImage
                      alt="Profile Image"
                      detailRoute={`/admin/users/detail/${username}`}
                      handleNav={handleNav}
                      profilePic={profilePic}
                      size="7.5rem"
                    />
                    <IconWrapper>
                      <div>
                        <Star />
                      </div>
                      <NumberContainer>{pointsNumber}</NumberContainer>
                    </IconWrapper>
                  </ImageContainer>
                </ContentWrapper>
                <IssuesWrapper>
                  <IssuesContainer>
                    {issuesNumber.length} Issues
                  </IssuesContainer>
                  <ActiveContainer>{attempting.length} Active</ActiveContainer>
                </IssuesWrapper>
              </StyledSquare>
            </StyledListSquare>
          ),
        )}
      </StyledUserCard>
    </Fragment>
  );
};

UserCard.propTypes = {
  data: T.array.isRequired,
  handleDeleteUser: T.func.isRequired,
  handleFetchInfo: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default UserCard;
