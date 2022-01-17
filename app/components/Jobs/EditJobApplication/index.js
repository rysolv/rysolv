import React from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { ConditionalRender } from 'components/base_ui';

import optionDictionary from '../Options';
import {
  ButtonWrapper,
  CreateJobApplicationContainer,
  CreateJobApplicationHeader,
  OptionDescription,
  OptionError,
  OptionLabel,
  OptionWrapper,
  StyledErrorSuccessBanner,
  StyledPrimaryAsyncButton,
  StyledPrimaryButton,
} from './styledComponents';

const EditJobApplication = ({
  alerts: { error },
  dispatchChangeInput,
  dispatchClearAlerts,
  editUserResponseLoading,
  form,
  formErrors,
  handleEditUserResponse,
  handleNav,
  handleUpdateFiles,
  handleValidateInput,
  questions,
}) => {
  const hasErrors = Object.keys(formErrors).some(input => !!formErrors[input]);
  const isComplete = Object.keys(form).every(input => {
    if (input === 'preferredLocation') {
      return !isEmpty(form[input]);
    }
    if (input !== 'resume') {
      return !!form[input];
    }
    return true;
  });

  return (
    <CreateJobApplicationContainer>
      <CreateJobApplicationHeader>Edit application</CreateJobApplicationHeader>
      <StyledErrorSuccessBanner error={error} onClose={dispatchClearAlerts} />
      {questions.map(
        ({
          description,
          id,
          options,
          optionType,
          question,
          ...restProps
          // eslint-disable-next-line array-callback-return, consistent-return
        }) => {
          if (id !== 'skills') {
            const OptionToRender = optionDictionary[optionType];

            const handleChangeInput = (value, inputField) => {
              dispatchChangeInput({
                field: inputField || id,
                form: 'application',
                value,
              });
            };

            const multiple = id === 'desiredRole' || id === 'type';

            return (
              <OptionWrapper key={`option-${id}`}>
                <OptionLabel>{question}</OptionLabel>
                <OptionDescription>{description}</OptionDescription>
                <OptionToRender
                  dispatchChangeInput={dispatchChangeInput}
                  form={form}
                  formErrors={formErrors}
                  handleChangeInput={handleChangeInput}
                  handleUpdateFiles={handleUpdateFiles}
                  handleValidateInput={handleValidateInput}
                  id={id}
                  multiple={multiple}
                  options={options}
                  value={form[id]}
                  {...restProps}
                />
                <ConditionalRender
                  Component={<OptionError>{formErrors[id]}</OptionError>}
                  shouldRender={id !== 'preferredLocation'}
                />
              </OptionWrapper>
            );
          }
        },
      )}
      <ButtonWrapper>
        <StyledPrimaryButton
          label="Cancel"
          onClick={() => handleNav('/dashboard')}
        />
        <StyledPrimaryAsyncButton
          disabled={hasErrors || !isComplete}
          label="Save"
          loading={editUserResponseLoading}
          onClick={handleEditUserResponse}
        />
      </ButtonWrapper>
    </CreateJobApplicationContainer>
  );
};

EditJobApplication.propTypes = {
  alerts: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  editUserResponseLoading: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleEditUserResponse: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleUpdateFiles: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  questions: T.array.isRequired,
};

export default EditJobApplication;
