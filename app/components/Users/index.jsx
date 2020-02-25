import React from 'react';
import T from 'prop-types';
import { PrimaryButton, ConditionalRender } from 'components/base_ui';
import {
  ButtonContainer,
  Divider,
  ImageContainer,
  InfoContainer,
  NameWrapper,
  StyledCompanyCard,
  StyledImage,
  StyledListItem,
} from './styledComponents';

const UserCard = ({ data }) => {
  const hasUsers = data.length > 0;

  const UserCardComponent = (
    <StyledCompanyCard>
      {data.map(({ name, image, joinDate }, index) => (
        <div key={name}>
          <StyledListItem>
            <ImageContainer>
              <StyledImage alt="Profile Image" src={image} />
            </ImageContainer>
            <InfoContainer>
              <NameWrapper>{name}</NameWrapper>
              Member since {joinDate}
            </InfoContainer>
            <ButtonContainer>
              <PrimaryButton label="Edit" />
            </ButtonContainer>
          </StyledListItem>
          <Divider isLastItem={data.length === index + 1} />
        </div>
      ))}
    </StyledCompanyCard>
  );
  return (
    <ConditionalRender
      Component={UserCardComponent}
      FallbackComponent={<div>Hello</div>}
      shouldRender={hasUsers}
    />
  );
};

UserCard.propTypes = {
  data: T.array,
};

export default UserCard;
