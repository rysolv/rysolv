/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { ProgressBar } from 'components/base_ui';
import { additionalInputDictionary } from 'containers/Jobs/constants';
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
  dispatchChangeSkillLevel,
  dispatchDeleteSkill,
  dispatchInputError,
  form,
  formErrors,
  handleCancel,
  handleNav,
  handleSubmit,
  handleUpdateFiles,
  id,
  limit,
  options,
  optionType,
  path,
  placeholder,
  question,
  questions,
  required,
  step,
  steps,
  tableData,
  type,
}) => {
  const [nextDisabled, setNextDisabled] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const checkInputDisabled = input => {
    let disabled = true;
    if (input === 'skills') {
      disabled = (
        isEmpty(form[input]) ||
          !form[input].every(
            ({ beginner, expert, intermediate }) =>
              beginner === true || expert === true || intermediate === true,
          )
      );
    } else if (input === 'desiredRole' || input === 'experience' || input === 'resume' || input === 'targetSalary' || input === 'type') {
      disabled = !form[input].length;
    } else if (input === 'preferredLocation') {
      disabled = isEmpty(form[input]);
    } else {
      disabled = form[input] === '';
    }
    return disabled;
  };

  useEffect(() => {
    const tempNextDisabled = required
      ? checkInputDisabled(id) || hasInputErrors
      : hasInputErrors;
    const tempSubmitDisabled = required
      ? !Object.keys(form).every(input => {
        if (input === 'skills') {
          return (
            !isEmpty(form[input]) &&
              form[input].every(
                ({ beginner, expert, intermediate }) =>
                  beginner === true || expert === true || intermediate === true,
              )
          );
        }
        return checkInputDisabled(input);
      }) || hasInputErrors
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

  const handleChangeInput = (value, inputField) => {
    dispatchChangeInput({
      field: inputField || id,
      value,
    });
  };

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
    input => formErrors[input] === '' || formErrors[input] === undefined,
  );

  const tableProps = { dispatchChangeSkillLevel, dispatchDeleteSkill };

  const OptionToRender = optionDictionary[optionType];
  const optionProps = {
    additionalInputProps: {
      value: form[additionalInputDictionary[id]],
      ...questions.find(
        ({ id: questionId }) => additionalInputDictionary[id] === questionId,
      ),
    },
    form,
    formErrors,
    handleChangeInput,
    handleUpdateFiles,
    handleValidateInput,
    id,
    limit,
    options,
    placeholder,
    tableData,
    tableProps,
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
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleCancel: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleSubmit: T.func.isRequired,
  handleUpdateFiles: T.func.isRequired,
  id: T.string.isRequired,
  limit: T.number,
  options: T.array.isRequired,
  optionType: T.string.isRequired,
  path: T.string.isRequired,
  placeholder: T.string,
  question: T.string.isRequired,
  questions: T.array.isRequired,
  required: T.bool.isRequired,
  step: T.number.isRequired,
  steps: T.number.isRequired,
  tableData: T.oneOfType([T.array, T.object, T.string]).isRequired,
  type: T.string,
};

export default SurveyView;
