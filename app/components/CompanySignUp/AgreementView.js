import React, { useEffect } from 'react';
import T from 'prop-types';

import { Checkbox } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  ButtonGroup,
  CheckboxWrapper,
  ContentGroup,
  DescriptionWrapper,
  LegalTextWrapper,
  QuestionWrapper,
  StyledButton,
  StyledErrorSuccessBanner,
  StyledFocusDiv,
  ViewContainer,
} from './styledComponents';

const BackIcon = iconDictionary('navigateBefore');
const NextIcon = iconDictionary('navigateNext');

const AgreementView = ({
  alerts: { error },
  dispatchChangeInput,
  dispatchChangeView,
  dispatchClearAlerts,
  forms: { contract: contractForm },
  handleSubmit,
}) => {
  const { contractAccepted } = contractForm;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <StyledErrorSuccessBanner error={error} onClose={dispatchClearAlerts} />
        <QuestionWrapper>Only pay for placement.</QuestionWrapper>
        <ContentGroup>
          <DescriptionWrapper>
            Create positions and match with candidates for free.
            <br />
            You&#39;ll only pay after a successful hire.
          </DescriptionWrapper>
          <LegalTextWrapper isFirst>
            Unless otherwise agreed to in your subscription agreement, you agree
            that all Covered Offers accepted outside the subscription term will
            be invoiced a Success Fee equal to 15% of Candidate&#39;s first-year
            base salary, Contractors at $6,000 for the first 6 months, and
            $12,000 for 12 months.By clicking Confirm you are agreeing to
            Hired&#39;s Terms of Service, Privacy Policy, and agree to reach out
            to candidates you see on Hired only through the Hired platform.
          </LegalTextWrapper>
          <LegalTextWrapper>
            If a candidate is released within 90 days of making a hire, get
            credit towards another hire or equivalent Subscription product.
          </LegalTextWrapper>
          <CheckboxWrapper>
            <Checkbox
              checked={contractAccepted}
              onChange={(e, value) =>
                dispatchChangeInput({
                  field: 'contractAccepted',
                  form: 'contract',
                  value,
                })
              }
            />
            <span>I agree to the above Terms and Conditions.</span>
          </CheckboxWrapper>
        </ContentGroup>
        <ButtonGroup>
          <StyledButton
            disableRipple
            onClick={() => dispatchChangeView({ view: 0 })}
          >
            {BackIcon}
            Back
          </StyledButton>
          <StyledButton
            disabled={!contractAccepted}
            disableRipple
            onClick={handleSubmit}
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
  alerts: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeView: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  forms: T.object.isRequired,
  handleSubmit: T.func.isRequired,
};

export default AgreementView;
