import React, { useEffect } from 'react';
import T from 'prop-types';

import { ProgressBar } from 'components/base_ui';

import optionDictionary from './Options';
import {
  ButtonGroup,
  DescriptionWrapper,
  JobsContainer,
  JobsHeader,
  OptionWrapper,
  QuestionWrapper,
  StyledPrimaryAsyncButton,
  StyledSecondaryButton,
  SurveryContainer,
} from './styledComponents';

const Jobs = ({
  description,
  dispatchChangeInput,
  dispatchChangeStep,
  form,
  handleSubmit,
  id,
  label,
  options,
  optionType,
  question,
  step,
  steps,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Jobs';
  }, []);
  const shouldDisplayBack = step === 0;
  const shouldDisplaySubmit = step === steps - 1;
  const OptionToRender = optionDictionary[optionType];
  const optionProps = {
    dispatchChangeInput,
    form,
    id,
    options,
  };
  return (
    <JobsContainer>
      <JobsHeader>
        <ProgressBar label={label} step={step} steps={steps} />
      </JobsHeader>
      <SurveryContainer>
        <div>
          <QuestionWrapper>{question}</QuestionWrapper>
          <DescriptionWrapper description>{description}</DescriptionWrapper>
          <OptionWrapper>
            <OptionToRender {...optionProps} />
          </OptionWrapper>
        </div>
        <ButtonGroup>
          <StyledSecondaryButton
            label="Back"
            onClick={() => dispatchChangeStep({ step: step - 1 })}
            shouldDisplayBack={!shouldDisplayBack}
          />
          <StyledPrimaryAsyncButton
            label="Continue"
            onClick={() => dispatchChangeStep({ step: step + 1 })}
            shouldDisplaySubmit={!shouldDisplaySubmit}
          />
          <StyledPrimaryAsyncButton
            label="Submit"
            onClick={handleSubmit}
            shouldDisplaySubmit={shouldDisplaySubmit}
          />
        </ButtonGroup>
      </SurveryContainer>
    </JobsContainer>
  );
};

Jobs.propTypes = {
  description: T.string,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeStep: T.func.isRequired,
  form: T.object.isRequired,
  handleSubmit: T.func.isRequired,
  id: T.string.isRequired,
  label: T.string.isRequired,
  options: T.array.isRequired,
  optionType: T.string.isRequired,
  question: T.string.isRequired,
  step: T.number.isRequired,
  steps: T.number.isRequired,
};

export default Jobs;
