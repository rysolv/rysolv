import React, { useEffect } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import {
  ButtonWrapper,
  CreatePositionContainer,
  CreatePositionHeader,
  OptionDescription,
  OptionError,
  OptionLabel,
  OptionWrapper,
  StyledErrorSuccessBanner,
  StyledPrimaryAsyncButton,
  StyledPrimaryButton,
} from './styledComponents';
import optionDictionary from './Options';

const CreatePosition = ({
  alerts: { error },
  dispatchChangeInput,
  dispatchChangeRemoteStatus,
  dispatchChangeSkillLevel,
  dispatchClearAlerts,
  dispatchDeleteSkill,
  dispatchResetFormState,
  form: { createPosition: createPositionForm },
  formErrors: { createPosition: createPositionFormErrors },
  handleCreatePosition,
  handleNav,
  handleValidateInput,
  loading,
  questions,
}) => {
  useEffect(
    () => () => {
      dispatchClearAlerts();
      dispatchResetFormState();
    },
    [],
  );

  const hasErrors = Object.keys(createPositionFormErrors).some(
    input => !!createPositionFormErrors[input],
  );
  const isComplete = Object.keys(createPositionForm).every(input => {
    if (input === 'skills') {
      return (
        !isEmpty(createPositionForm[input]) &&
        createPositionForm[input].every(
          ({ beginner, expert, intermediate }) =>
            beginner === true || expert === true || intermediate === true,
        )
      );
    }
    return !!createPositionForm[input];
  });

  const tableProps = { dispatchChangeSkillLevel, dispatchDeleteSkill };

  return (
    <CreatePositionContainer>
      <CreatePositionHeader>Create a new position</CreatePositionHeader>
      <StyledErrorSuccessBanner error={error} onClose={dispatchClearAlerts} />
      {questions.map(
        ({ description, id, options, optionType, question, ...restProps }) => {
          const OptionToRender = optionDictionary[optionType];

          const handleChangeInput = value => {
            dispatchChangeInput({
              field: id,
              form: 'createPosition',
              value,
            });
          };

          return (
            <OptionWrapper key={`option-${id}`}>
              <OptionLabel>{question}</OptionLabel>
              <OptionDescription>{description}</OptionDescription>
              <OptionToRender
                dispatchChangeInput={dispatchChangeInput}
                dispatchChangeRemoteStatus={dispatchChangeRemoteStatus}
                dispatchDeleteSkill={dispatchDeleteSkill}
                handleChangeInput={handleChangeInput}
                id={id}
                onBlur={() =>
                  handleValidateInput({
                    field: id,
                    values: createPositionForm,
                  })
                }
                options={options}
                tableProps={tableProps}
                value={createPositionForm[id]}
                {...restProps}
              />
              <OptionError>{createPositionFormErrors[id]}</OptionError>
            </OptionWrapper>
          );
        },
      )}
      <ButtonWrapper>
        <StyledPrimaryButton
          label="Cancel"
          onClick={() => handleNav('/dashboard')}
        />
        <StyledPrimaryAsyncButton
          disabled={hasErrors || !isComplete}
          label="Create"
          loading={loading}
          onClick={handleCreatePosition}
        />
      </ButtonWrapper>
    </CreatePositionContainer>
  );
};

CreatePosition.propTypes = {
  alerts: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeRemoteStatus: T.func.isRequired,
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleCreatePosition: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  loading: T.bool.isRequired,
  questions: T.array.isRequired,
};

export default CreatePosition;
