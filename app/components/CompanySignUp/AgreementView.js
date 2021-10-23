import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  ButtonGroup,
  StyledButton,
  StyledFocusDiv,
  ViewContainer,
} from './styledComponents';

const BackIcon = iconDictionary('navigateBefore');
const NextIcon = iconDictionary('navigateNext');

const AgreementView = ({ handleNav, handleSubmit, path, step }) => {
  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <StyledFocusDiv
      id="surveyQuestion"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <ViewContainer>
        <div> Only pay if you make a hire. Satisfaction guaranteed.</div>
        <div>
          Unless otherwise agreed to in your subscription agreement, you agree
          that all Covered Offers accepted outside the subscription term will be
          invoiced a Success Fee equal to 15% of Candidate&#39;s first-year base
          salary, Contractors at $6,000 for the first 6 months, and $12,000 for
          12 months.{' '}
        </div>
        <div>
          By clicking Confirm you are agreeing to Hired&#39;s Terms of Service,
          Privacy Policy, and agree to reach out to candidates you see on Hired
          only through the Hired platform.{' '}
        </div>
        <div>
          *If a candidate is released within 90 days of making a hire, get
          credit towards another hire or equivalent Subscription product.{' '}
        </div>
        <ButtonGroup shouldDisplayBack>
          <StyledButton
            disableRipple
            onClick={() => handleNav(`${path}?question=${step - 1}`)}
            shouldDisplayBack
          >
            {BackIcon}
            Back
          </StyledButton>
          <StyledButton
            disableRipple
            onClick={handleSubmit}
            shouldDisplaySubmit
          >
            Confirm
            {NextIcon}
          </StyledButton>
        </ButtonGroup>
      </ViewContainer>
    </StyledFocusDiv>
  );
};

AgreementView.propTypes = {
  handleNav: T.func.isRequired,
  handleSubmit: T.func.isRequired,
  path: T.string.isRequired,
  step: T.number.isRequired,
};

export default AgreementView;
