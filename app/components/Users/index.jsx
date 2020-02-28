import React from 'react';
import T from 'prop-types';
import {
  PrimaryButton,
  ConditionalRender,
  // ErrorSuccessBanner,
} from 'components/base_ui';
import {
  ButtonContainer,
  BannerWrapper,
  Divider,
  ImageContainer,
  InfoContainer,
  NameWrapper,
  StyledUserCard,
  StyledImage,
  StyledListItem,
} from './styledComponents';

const UserCard = ({
  // alerts: { error, success },
  // clearAlerts,
  data,
  // handleDelete,
  // handleNav,
}) => {
  const hasUsers = data.length > 0;

  const UserCardComponent = (
    <div>
      <BannerWrapper>
        {/* <ErrorSuccessBanner
        error={error}
        onClose={clearAlerts}
        success={success}
        /> */}
      </BannerWrapper>
      <StyledUserCard>
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
      </StyledUserCard>
    </div>
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
  // alerts: T.shape({
  //   error: T.oneOfType([T.bool, T.object]),
  //   success: T.oneOfType([T.bool, T.object]),
  // }),
  // clearAlerts: T.func,
  data: T.array,
  // handleDelete: T.func,
  // handleNav: T.func,
};

export default UserCard;
