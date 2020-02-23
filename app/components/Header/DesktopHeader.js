import React from 'react';
import T from 'prop-types';

const DesktopHeader = () => {

  return (
    <HeaderWrap>
      <ContainerMinimizer>
        <ButtonsWrapper>
          <Settings
            Icon={ProfileIcon}
            label="Settings & Notifications"
            path="/settings"
          />
          <Logout
            disableFocusRipple
            disableRipple
            Icon={LogoutIcon}
            label="Logout"
            onClick={handleLogout}
        />
        </ButtonsWrapper>
      </ContainerMinimizer>
    </HeaderWrap>
  );
};

DesktopHeader.propTypes = {
  askMia: T.shape({
    isMiaAvailable: T.bool.isRequired,
    miaClickHandler: T.func.isRequired,
  }).isRequired,
  chatBeacon: T.shape({
    cbClickHandler: T.func.isRequired,
    shouldRenderChat: T.bool.isRequired,
  }).isRequired,
  handleLogout: T.func.isRequired,
  hasUnreadMessages: T.bool.isRequired,
  isMobile: T.bool.isRequired,
  mortgageLogo: T.shape({
    image: T.string,
    type: T.string,
  }),
};

export default DesktopHeader;
