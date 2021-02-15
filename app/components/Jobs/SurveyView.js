import React, { Fragment } from 'react';
import T from 'prop-types';

import { ProgressBar } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import optionDictionary from './Options';
import {
  ButtonGroup,
  DescriptionWrapper,
  JobsHeader,
  OptionWrapper,
  QuestionWrapper,
  StyledButton,
  ViewContainer,
} from './styledComponents';

const BackIcon = iconDictionary('navigateBefore');
const NextIcon = iconDictionary('navigateNext');

const SurveyView = ({
  description,
  dispatchChangeInput,
  form,
  handleNav,
  handleSubmit,
  id,
  label,
  options,
  optionType,
  path,
  question,
  step,
  steps,
}) => {
  const shouldDisplayBack = step === 1;
  const shouldDisplaySubmit = step === steps - 1;
  const OptionToRender = optionDictionary[optionType];
  const optionProps = {
    dispatchChangeInput,
    form,
    id,
    options,
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
  return (
    <Fragment>
      <JobsHeader>
        <ProgressBar label={label} step={step} steps={steps} />
      </JobsHeader>
      <ViewContainer>
        <div>
          <QuestionWrapper>{question}</QuestionWrapper>
          <DescriptionWrapper description>{description}</DescriptionWrapper>
          <OptionWrapper>
            <OptionToRender {...optionProps} />
          </OptionWrapper>
        </div>
        <ButtonGroup shouldDisplayBack={shouldDisplayBack}>
          <StyledButton
            disableRipple
            onClick={() => handleNav(`${path}?question=${step - 1}`)}
            shouldDisplayBack={!shouldDisplayBack}
          >
            {BackIcon}
            Back
          </StyledButton>
          <StyledButton
            disableRipple
            disabled={checkInputDisabled(id)}
            onClick={() => handleNav(`${path}?question=${step + 1}`)}
            shouldDisplaySubmit={!shouldDisplaySubmit}
          >
            Continue
            {NextIcon}
          </StyledButton>
          <StyledButton
            disableRipple
            disabled={
              !Object.keys(form).every(input => !checkInputDisabled(input))
            }
            onClick={handleSubmit}
            shouldDisplaySubmit={shouldDisplaySubmit}
          >
            Submit
          </StyledButton>
        </ButtonGroup>
      </ViewContainer>
    </Fragment>
  );
};

SurveyView.propTypes = {
  description: T.string,
  dispatchChangeInput: T.func.isRequired,
  form: T.object.isRequired,
  handleNav: T.func.isRequired,
  handleSubmit: T.func.isRequired,
  id: T.string.isRequired,
  label: T.string.isRequired,
  options: T.array.isRequired,
  optionType: T.string.isRequired,
  path: T.string.isRequired,
  question: T.string.isRequired,
  step: T.number.isRequired,
  steps: T.number.isRequired,
};

export default SurveyView;
