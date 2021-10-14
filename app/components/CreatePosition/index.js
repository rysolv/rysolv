import React from 'react';
import T from 'prop-types';

import {
  ButtonWrapper,
  CreatePositionContainer,
  CreatePositionHeader,
  StyledPrimaryAsyncButton,
  StyledPrimaryButton,
} from './styledComponents';
import optionDictionary from './Options';

const CreatePosition = ({
  dispatchChangeInput,
  dispatchDeleteSkill,
  form: { createPositionForm },
  formErrors: { createPosition: createPositionFormErrors },
  handleCreatePosition,
  handleNav,
  handleValidateInput,
  loading,
  questions,
}) => (
  <CreatePositionContainer>
    <CreatePositionHeader>Create a new position</CreatePositionHeader>
    {questions.map(({ optionType, type, ...restProps }) => {
      const OptionToRender = optionDictionary[optionType];

      return (
        <OptionToRender
          dispatchDeleteSkill={dispatchDeleteSkill}
          error={createPositionFormErrors[type]}
          onBlur={() =>
            handleValidateInput({
              field: type,
              values: createPositionForm,
            })
          }
          onChange={e =>
            dispatchChangeInput({
              field: type,
              form: 'createPosition',
              value: e.target.value,
            })
          }
          value={createPositionForm[type]}
          {...restProps}
        />
      );
    })}
    <ButtonWrapper>
      <StyledPrimaryButton
        label="Cancel"
        onClick={() => handleNav('/dashboard')}
      />
      <StyledPrimaryAsyncButton
        label="Create"
        loading={loading}
        onClick={handleCreatePosition}
      />
    </ButtonWrapper>
  </CreatePositionContainer>
);

CreatePosition.propTypes = {
  dispatchChangeInput: T.func.isRequired,
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
