import React from 'react';
import T from 'prop-types';

import { interpolate } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import { notificationDictionary } from './constants';
import {
  NotificationContainer,
  NotificationDescription,
  NotificationTitle,
  StyledIconButton,
  StyledPrimaryButton,
} from './styledComponents';

const CloseIcon = iconDictionary('closeMenu');

const Notification = ({
  handleClick,
  matches,
  setIsNotificationOpen,
  type,
}) => {
  const { buttonLabel, description, title } = notificationDictionary[type];
  const companyString = matches === 1 ? 'company' : 'companies';

  return (
    <NotificationContainer>
      <StyledIconButton
        disableRipple
        onClick={() => setIsNotificationOpen(false)}
      >
        {CloseIcon}
      </StyledIconButton>
      <NotificationTitle>{title}</NotificationTitle>
      <NotificationDescription>
        {interpolate(description, { company: companyString, matches })}
      </NotificationDescription>
      <StyledPrimaryButton label={buttonLabel} onClick={handleClick} />
    </NotificationContainer>
  );
};

Notification.propTypes = {
  handleClick: T.func.isRequired,
  matches: T.number,
  setIsNotificationOpen: T.func.isRequired,
  type: T.string.isRequired,
};

export default Notification;
