import React from 'react';
import T from 'prop-types';

import {
  ButtonContainer,
  HiringContainer,
  HiringHeader,
  HiringSubtitle,
  MessageContainer,
  MessageHeader,
  StyledPrimaryButton,
} from './styledComponents';

const UserDashboard = ({ handleNav, matches }) => (
  <HiringContainer>
    <HiringHeader>Hiring Center</HiringHeader>
    <HiringSubtitle>Showcase your skills, get hired</HiringSubtitle>
    <ButtonContainer>
      <MessageContainer>
        <MessageHeader>{matches} Matches</MessageHeader>
        <StyledPrimaryButton
          label="View Messages"
          onClick={() => handleNav('/messages')}
        />
      </MessageContainer>
      <MessageContainer>
        <MessageHeader>My Application</MessageHeader>
        <StyledPrimaryButton
          label="Update Details"
          onClick={() => handleNav('/dashboard/update')}
        />
      </MessageContainer>
    </ButtonContainer>
  </HiringContainer>
);

UserDashboard.propTypes = {
  handleNav: T.func.isRequired,
  matches: T.number.isRequired,
};

export default UserDashboard;
