import React from 'react';
import T from 'prop-types';

import { Checkbox } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  ButtonGroup,
  QuestionWrapper,
  StyledButton,
  StyledFocusDiv,
  ViewContainer,
} from './styledComponents';

const BackIcon = iconDictionary('navigateBefore');
const NextIcon = iconDictionary('navigateNext');

const AgreementView = ({
  dispatchChangeInput,
  dispatchSubmitContractAccepted,
  form,
  handleNav,
  path,
  step,
}) => {
  const { contractAccepted } = form;
  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      dispatchSubmitContractAccepted({ contractAccepted });
    }
  };
  return (
    <StyledFocusDiv
      id="surveyQuestion"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <ViewContainer>
        <QuestionWrapper>Only pay for placement</QuestionWrapper>
        <div>
          <Checkbox
            checked={contractAccepted}
            onChange={(e, value) =>
              dispatchChangeInput({ field: 'contractAccepted', value })
            }
          />
          Unless otherwise agreed to in your subscription agreement, you agree
          that all Covered Offers accepted outside the subscription term will be
          invoiced a Success Fee equal to 15% of Candidate&#39;s first-year base
          salary, Contractors at $6,000 for the first 6 months, and $12,000 for
          12 months.By clicking Confirm you are agreeing to Hired&#39;s Terms of
          Service, Privacy Policy, and agree to reach out to candidates you see
          on Hired only through the Hired platform.
        </div>
        <div>
          *If a candidate is released within 90 days of making a hire, get
          credit towards another hire or equivalent Subscription product.
        </div>
        <ButtonGroup>
          <StyledButton
            disableRipple
            onClick={() => handleNav(`${path}?question=${step - 1}`)}
            shouldDisplayBack
          >
            {BackIcon}
            Back
          </StyledButton>
          <StyledButton
            disabled={!contractAccepted}
            disableRipple
            onClick={() => dispatchSubmitContractAccepted({ contractAccepted })}
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
  dispatchChangeInput: T.func.isRequired,
  dispatchSubmitContractAccepted: T.func.isRequired,
  form: T.object.isRequired,
  handleNav: T.func.isRequired,
  path: T.string.isRequired,
  step: T.number.isRequired,
};

export default AgreementView;
