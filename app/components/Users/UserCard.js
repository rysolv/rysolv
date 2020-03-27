import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import SettingsMenu from 'components/SettingsMenu';

import {
  ImageContainer,
  InfoContainer,
  NameWrapper,
  StyledImage,
  StyledListItem,
  StyledSettingWrapper,
  StyledUserCard,
} from './styledComponents';

const UserCard = ({ data, handleDeleteUser, handleFetchInfo, handleNav }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = ({ userId }) => {
    handleDeleteUser({ userId });
    handleNav(`/admin/users`);
    setAnchorEl(null);
  };

  const handleEdit = ({ userId }) => {
    handleFetchInfo({ userId });
    handleNav(`/admin/users/edit`);
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <StyledUserCard>
        {data.map(({ id, image, joinDate, name }) => (
          <StyledListItem key={name}>
            <div>
              <StyledSettingWrapper>
                <SettingsMenu
                  anchorEl={anchorEl}
                  handleClick={handleClick}
                  handleClose={() => handleClose()}
                  handleDelete={() => handleDelete({ userId: id })}
                  handleEdit={() => handleEdit({ userId: id })}
                />
              </StyledSettingWrapper>
              <ImageContainer>
                <StyledImage alt="Profile Image" src={image} />
              </ImageContainer>
              <InfoContainer>
                <NameWrapper>{name}</NameWrapper>
                Member since {joinDate}
              </InfoContainer>
            </div>
          </StyledListItem>
        ))}
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
