import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { ProgressBar } from 'components/base_ui';
import { validateOneField } from 'containers/Jobs/helpers';
import iconDictionary from 'utils/iconDictionary';

import optionDictionary from './Options';
import {
  ButtonGroup,
  DescriptionWrapper,
  JobsHeader,
  OptionWrapper,
  QuestionWrapper,
  StyledButton,
  StyledFocusDiv,
  ViewContainer,
} from './styledComponents';

const BackIcon = iconDictionary('navigateBefore');
const NextIcon = iconDictionary('navigateNext');

const SurveyView = ({
  description,
  dispatchChangeInput,
  dispatchInputError,
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
  required,
  step,
  steps,
  type,
}) => {
  const [nextDisabled, setNextDisabled] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const checkInputDisabled = input => {
    let disabled = true;
    if (Array.isArray(form[input].value)) {
      disabled = !form[input].value.length;
    } else {
      disabled = form[input].value === '';
    }
    return disabled;
  };

  useEffect(() => {
    const tempNextDisabled = required
      ? checkInputDisabled(id) || hasInputErrors
      : hasInputErrors;
    const tempSubmitDisabled = required
      ? !Object.keys(form).every(input => checkInputDisabled(input)) ||
        hasInputErrors
      : hasInputErrors;

    setNextDisabled(tempNextDisabled);
    setSubmitDisabled(tempSubmitDisabled);
  }, [checkInputDisabled, form, hasInputErrors]);

  useEffect(() => {
    document.getElementById('surveyQuestion').focus();
  }, []);

  const shouldDisplayBack = step > 1;
  const shouldDisplayCancel = step === 1;
  const shouldDisplaySubmit = step === steps;

  const handleKeypress = ({ key }) => {
    if (key === 'Enter' && !checkInputDisabled(id)) {
      if (shouldDisplaySubmit) handleSubmit();
      else handleNav(`${path}?question=${step + 1}`);
    }
  };
  const handleValidateInput = ({ field, values }) => {
    const validationError = validateOneField({ field, required, values }) || '';
    dispatchInputError({
      errors: {
        [id]: validationError,
      },
    });
  };
  const hasInputErrors = !Object.keys(form).every(
    input => form[input].error === '' || form[input].error === undefined,
  );

  const OptionToRender = optionDictionary[optionType];
  const optionProps = {
    dispatchChangeInput,
    form,
    handleValidateInput,
    id,
    limit,
    options,
    placeholder,
    type,
  };
  return (
    <StyledFocusDiv
      id="surveyQuestion"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <ViewContainer>
        <JobsHeader>
          <ProgressBar step={step} steps={steps} />
        </JobsHeader>
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
            disabled={nextDisabled}
            disableRipple
            onClick={() => handleNav(`${path}?question=${step + 1}`)}
            shouldDisplaySubmit={!shouldDisplaySubmit}
          >
            Continue
            {NextIcon}
          </StyledButton>
          <StyledButton
            disabled={submitDisabled}
            disableRipple
            onClick={handleSubmit}
            shouldDisplaySubmit={shouldDisplaySubmit}
          >
            Continue
            {NextIcon}
          </StyledButton>
        </ButtonGroup>
      </ViewContainer>
    </StyledFocusDiv>
  );
};

SurveyView.propTypes = {
  description: T.string,
  dispatchChangeInput: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
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
  required: T.bool.isRequired,
  step: T.number.isRequired,
  steps: T.number.isRequired,
  type: T.string,
};

export default SurveyView;
