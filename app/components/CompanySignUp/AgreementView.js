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
  contract,
  dispatchChangeInput,
  dispatchChangeView,
  dispatchClearAlerts,
  forms: { contract: contractForm },
  handleSubmit,
}) => {
  const { contractAccepted } = contractForm;
  const { title, body, subtitle } = contract;
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
        <QuestionWrapper>{title}</QuestionWrapper>
        <ContentGroup>
          <DescriptionWrapper>{subtitle}</DescriptionWrapper>
          <LegalTextWrapper isFirst>{body}</LegalTextWrapper>
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
  contract: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeView: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  forms: T.object.isRequired,
  handleSubmit: T.func.isRequired,
};

export default AgreementView;
