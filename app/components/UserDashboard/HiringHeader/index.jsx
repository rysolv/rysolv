import React from 'react';
import T from 'prop-types';

import {
  HiringContainer,
  HiringHeader,
  HiringSubtitle,
  MessageContainer,
  MessageHeader,
  StyledPrimaryButton,
} from './styledComponents';

const UserDashboard = ({ messages }) => (
  <div>
    <HiringHeader>Hiring Center</HiringHeader>
    <HiringSubtitle>Showcase your skills, get hired</HiringSubtitle>
    <HiringContainer>
      <MessageContainer>
        <MessageHeader>{messages} Matches</MessageHeader>
        <StyledPrimaryButton label="View Messages" />
      </MessageContainer>
      <MessageContainer>
        <MessageHeader>My Application</MessageHeader>
        <StyledPrimaryButton label="Update Details" />
      </MessageContainer>
    </HiringContainer>
  </div>
);

UserDashboard.propTypes = {
  messages: T.number.isRequired,
};

export default UserDashboard;
