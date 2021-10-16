import React from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import {
  ButtonWrapper,
  CreatePositionContainer,
  CreatePositionHeader,
  OptionError,
  OptionLabel,
  OptionWrapper,
  StyledPrimaryAsyncButton,
  StyledPrimaryButton,
} from './styledComponents';
import optionDictionary from './Options';

const CreatePosition = ({
  dispatchChangeInput,
  dispatchChangeSkillLevel,
  dispatchDeleteSkill,
  form: { createPosition: createPositionForm },
  formErrors: { createPosition: createPositionFormErrors },
  handleCreatePosition,
  handleNav,
  handleValidateInput,
  loading,
  questions,
}) => {
  const hasErrors = Object.keys(createPositionFormErrors).some(
    input => !!createPositionFormErrors[input],
  );
  const isComplete = Object.keys(createPositionForm).every(input => {
    if (input === 'skills') return !isEmpty(createPositionForm[input]);
    return !!createPositionForm[input];
  });

  const tableProps = { dispatchChangeSkillLevel, dispatchDeleteSkill };

  return (
    <CreatePositionContainer>
      <CreatePositionHeader>Create a new position</CreatePositionHeader>
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
            <OptionWrapper>
              <OptionLabel>{question}</OptionLabel>
              <OptionLabel>{description}</OptionLabel>
              <OptionToRender
                dispatchChangeInput={dispatchChangeInput}
                dispatchDeleteSkill={dispatchDeleteSkill}
                handleChangeInput={handleChangeInput}
                id={id}
                key={`option-${id}`}
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
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleCreatePosition: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  loading: T.bool.isRequired,
  questions: T.array.isRequired,
};

export default CreatePosition;
