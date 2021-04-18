import React, { useEffect } from 'react';
import T from 'prop-types';

import { ProgressBar } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import optionDictionary from './Options';
import {
  ButtonGroup,
  DescriptionWrapper,
  OptionWrapper,
  QuestionWrapper,
  RecruitingHeader,
  StyledButton,
  StyledFocusDiv,
  ViewContainer,
} from './styledComponents';

const BackIcon = iconDictionary('navigateBefore');
const NextIcon = iconDictionary('navigateNext');

const SurveyView = ({
  description,
  dispatchChangeInput,
  form,
  handleCancel,
  handleNav,
  handleSubmit,
  id,
  limit,
  options,
  optionType,
  path,
  placeholder,
  question,
  step,
  steps,
}) => {
  useEffect(() => {
    document.getElementById('surveyQuestion').focus();
  }, []);
  const shouldDisplayBack = step > 1;
  const shouldDisplayCancel = step === 1;
  const shouldDisplaySubmit = step === steps;
  const OptionToRender = optionDictionary[optionType];
  const optionProps = {
    dispatchChangeInput,
    form,
    id,
    limit,
    options,
    placeholder,
  };
  const checkInputDisabled = input => {
    let disabled = true;
    if (Array.isArray(form[input].value)) {
      disabled = !form[input].value.length;
    } else {
      disabled = form[input].value === '';
    }
    return disabled;
  };
  const handleKeypress = ({ key }) => {
    if (key === 'Enter' && !checkInputDisabled(id)) {
      if (shouldDisplaySubmit) handleSubmit();
      else handleNav(`${path}?question=${step + 1}`);
    }
  };
  return (
    <StyledFocusDiv
      id="surveyQuestion"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <RecruitingHeader>
        <ProgressBar step={step} steps={steps} />
      </RecruitingHeader>
      <ViewContainer>
        <div>
          <QuestionWrapper>{question}</QuestionWrapper>
          <DescriptionWrapper>{description}</DescriptionWrapper>
          <OptionWrapper>
            <OptionToRender {...optionProps} />
          </OptionWrapper>
        </div>
        <ButtonGroup
          shouldDisplayBack={shouldDisplayBack}
          shouldDisplayCancel={shouldDisplayCancel}
        >
          <StyledButton
            disableRipple
            onClick={handleCancel}
            shouldDisplayCancel={shouldDisplayCancel}
          >
            Cancel
          </StyledButton>
          <StyledButton
            disableRipple
            onClick={() => handleNav(`${path}?question=${step - 1}`)}
            shouldDisplayBack={shouldDisplayBack}
          >
            {BackIcon}
            Back
          </StyledButton>
          <StyledButton
            disabled={checkInputDisabled(id)}
            disableRipple
            onClick={() => handleNav(`${path}?question=${step + 1}`)}
            shouldDisplaySubmit={!shouldDisplaySubmit}
          >
            Continue
            {NextIcon}
          </StyledButton>
          <StyledButton
            disabled={
              !Object.keys(form).every(input => !checkInputDisabled(input))
            }
            disableRipple
            onClick={handleSubmit}
            shouldDisplaySubmit={shouldDisplaySubmit}
          >
            Submit
          </StyledButton>
        </ButtonGroup>
      </ViewContainer>
    </StyledFocusDiv>
  );
};

SurveyView.propTypes = {
  description: T.string,
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  handleCancel: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleSubmit: T.func.isRequired,
  id: T.string.isRequired,
  limit: T.number,
  options: T.array.isRequired,
  optionType: T.string.isRequired,
  path: T.string.isRequired,
  placeholder: T.string,
  question: T.string.isRequired,
  step: T.number.isRequired,
  steps: T.number.isRequired,
};

export default SurveyView;
