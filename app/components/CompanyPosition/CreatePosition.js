import React from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import optionDictionary from './Options';
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

const CreatePosition = ({
  alerts: { error },
  companyPositionQuestions,
  createPositionLoading,
  dispatchChangeInput,
  dispatchChangeSkillLevel,
  dispatchClearAlerts,
  isPaidSubscription,
  dispatchDeleteSkill,
  dispatchSelectPosition,
  form: { companyPosition: companyPositionForm },
  formErrors: { companyPosition: companyPositionFormErrors },
  handleCreatePosition,
  handleNav,
  handleValidateInput,
  positions,
}) => {
  const hasErrors = Object.keys(companyPositionFormErrors).some(
    input => !!companyPositionFormErrors[input],
  );
  const isComplete = Object.keys(companyPositionForm).every(input => {
    if (input === 'location') {
      return !isEmpty(companyPositionForm[input]);
    }
    if (input === 'skills') {
      return (
        !isEmpty(companyPositionForm[input]) &&
        companyPositionForm[input].every(
          ({ beginner, expert, intermediate }) =>
            beginner === true || expert === true || intermediate === true,
        )
      );
    }
    return !!companyPositionForm[input];
  });

  const handleCancel = () => {
    if (positions.length) dispatchSelectPosition({ id: positions[0].id });
    handleNav('/company/dashboard');
  };

  const tableProps = { dispatchChangeSkillLevel, dispatchDeleteSkill };

  return (
    <CreatePositionContainer>
      <CreatePositionHeader>Create a new position</CreatePositionHeader>
      <StyledErrorSuccessBanner error={error} onClose={dispatchClearAlerts} />
      {companyPositionQuestions.map(
        ({ description, id, options, optionType, question, ...restProps }) => {
          if (
            id !== 'isActive' &&
            !(id === 'postToJobBoard' && !isPaidSubscription)
          ) {
            const OptionToRender = optionDictionary[optionType];

            const handleChangeInput = (value, inputField) => {
              dispatchChangeInput({
                field: inputField || id,
                form: 'companyPosition',
                value,
              });
            };

            const multiple = id === 'role';

            return (
              <OptionWrapper
                $isFlex={id === 'postToJobBoard'}
                key={`option-${id}`}
              >
                <OptionLabel>{question}</OptionLabel>
                <OptionDescription>{description}</OptionDescription>
                <OptionToRender
                  dispatchChangeInput={dispatchChangeInput}
                  dispatchDeleteSkill={dispatchDeleteSkill}
                  handleChangeInput={handleChangeInput}
                  id={id}
                  multiple={multiple}
                  onBlur={() =>
                    handleValidateInput({
                      field: id,
                      values: companyPositionForm,
                    })
                  }
                  options={options}
                  tableProps={tableProps}
                  value={companyPositionForm[id]}
                  {...restProps}
                />
                <OptionError>{companyPositionFormErrors[id]}</OptionError>
              </OptionWrapper>
            );
          }
          return null;
        },
      )}
      <ButtonWrapper>
        <StyledPrimaryButton label="Cancel" onClick={handleCancel} />
        <StyledPrimaryAsyncButton
          disabled={hasErrors || !isComplete}
          label="Create"
          loading={createPositionLoading}
          onClick={handleCreatePosition}
        />
      </ButtonWrapper>
    </CreatePositionContainer>
  );
};

CreatePosition.propTypes = {
  alerts: T.object.isRequired,
  companyPositionQuestions: T.array.isRequired,
  createPositionLoading: T.bool.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchSelectPosition: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleCreatePosition: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  isPaidSubscription: T.bool.isRequired,
  positions: T.array.isRequired,
};

export default CreatePosition;
