import React from 'react';
import T from 'prop-types';

import { PrimaryButton } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  ContentWrapper,
  LogoWrapper,
  ModalBody,
  ModalTitle,
  ProgressContainer,
} from './styledComponents';

const siteLogo = iconDictionary('siteLogo');

const ProgressModal = ({ handleClose }) => (
  <ProgressContainer>
    <LogoWrapper>{siteLogo}</LogoWrapper>
    <ContentWrapper>
      <ModalTitle>Welcome to Rysolv Beta!</ModalTitle>
      <ModalBody>
        Help us build a better experience for millions of developers like you.
        Try it out, tell us what you think, and come back often as we make
        improvements based on your feedback.
      </ModalBody>
      <PrimaryButton label="Try it out" onClick={handleClose} />
    </ContentWrapper>
  </ProgressContainer>
);

ProgressModal.propTypes = {
  handleClose: T.func.isRequired,
};

export default ProgressModal;
