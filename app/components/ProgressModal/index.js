import React from 'react';
import T from 'prop-types';

import { PrimaryButton } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  ButtonGroup,
  ContentWrapper,
  LogoWrapper,
  ModalBody,
  ModalTitle,
  ProgressContainer,
  StyledLink,
} from './styledComponents';

const siteLogo = iconDictionary('siteLogo');

const ProgressModal = ({ handleClose }) => (
  <ProgressContainer>
    <LogoWrapper>{siteLogo}</LogoWrapper>
    <ContentWrapper>
      <ModalTitle>Welcome to Rysolv Beta!</ModalTitle>
      <ModalBody>
        Help us build a better experience for developers like you. Try it out,
        tell us what you think, and come back often as we make improvements
        based on your feedback.
      </ModalBody>
      <ButtonGroup>
        <PrimaryButton label="Try it out" onClick={handleClose} />
        <StyledLink onClick={handleClose} to="/how-to">
          How it works
        </StyledLink>
      </ButtonGroup>
    </ContentWrapper>
  </ProgressContainer>
);

ProgressModal.propTypes = {
  handleClose: T.func.isRequired,
};

export default ProgressModal;
