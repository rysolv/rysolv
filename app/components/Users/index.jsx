/* eslint-disable camelcase */
import React from 'react';
import T from 'prop-types';
import {
  PrimaryButton,
  ConditionalRender,
  // ErrorSuccessBanner,
} from 'components/base_ui';
import {
  ButtonContainer,
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
  console.log('user data', data);
  const hasUsers = data.length > 0;

  const UserCardComponent = (
    <div>
      <StyledUserCard>
        {data.map(
          (
            { id, first_name, last_name, created_date, email, profile_pic },
            index,
          ) => (
            <div key={id}>
              <StyledListItem>
                <ImageContainer>
                  <StyledImage alt="Profile Image" src={profile_pic} />
                </ImageContainer>
                <InfoContainer>
                  <NameWrapper>
                    {first_name} {last_name}
                  </NameWrapper>
                  Member since {created_date}
                  <p>{email}</p>
                </InfoContainer>
                <ButtonContainer>
                  <PrimaryButton label="Edit" />
                </ButtonContainer>
              </StyledListItem>
              <Divider isLastItem={data.length === index + 1} />
            </div>
          ),
        )}
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
