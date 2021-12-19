import React, { useEffect } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { additionalInputDictionary } from 'containers/CompanyDashboard/constants';
import { getParameterByName } from 'utils/globalHelpers';

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

const EditPosition = ({
  alerts: { error },
  companyPositionQuestions,
  dispatchChangeInput,
  dispatchChangeSkillLevel,
  dispatchClearAlerts,
  dispatchDeleteSkill,
  dispatchFetchPosition,
  dispatchResetFormState,
  form: { companyPosition: companyPositionForm },
  formErrors: { companyPosition: companyPositionFormErrors },
  handleEditPosition,
  handleNav,
  handleValidateInput,
  loading,
}) => {
  useEffect(() => {
    const positionId = getParameterByName('id');
    dispatchFetchPosition({ positionId });
    return () => {
      dispatchClearAlerts();
      dispatchResetFormState({ category: 'companyPosition' });
    };
  }, []);

  const hasErrors = Object.keys(companyPositionFormErrors).some(
    input => !!companyPositionFormErrors[input],
  );
  const isComplete = Object.keys(companyPositionForm).every(input => {
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

  const tableProps = { dispatchChangeSkillLevel, dispatchDeleteSkill };

  return (
    <CreatePositionContainer>
      <CreatePositionHeader>Edit position</CreatePositionHeader>
      <StyledErrorSuccessBanner error={error} onClose={dispatchClearAlerts} />
      {companyPositionQuestions.map(
        ({
          description,
          id,
          options,
          optionType,
          question,
          ...restProps
          // eslint-disable-next-line array-callback-return, consistent-return
        }) => {
          if (id !== 'isRemote') {
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
                $isAbsolute={id === 'isActive'}
                key={`option-${id}`}
              >
                <OptionLabel>{question}</OptionLabel>
                <OptionDescription>{description}</OptionDescription>
                <OptionToRender
                  additionalInputProps={{
                    value: companyPositionForm[additionalInputDictionary[id]],
                    ...companyPositionQuestions.find(
                      ({ id: questionId }) =>
                        additionalInputDictionary[id] === questionId,
                    ),
                  }}
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
        },
      )}
      <ButtonWrapper>
        <StyledPrimaryButton
          label="Cancel"
          onClick={() => handleNav('/company/dashboard')}
        />
        <StyledPrimaryAsyncButton
          disabled={hasErrors || !isComplete}
          label="Edit"
          loading={loading}
          onClick={handleEditPosition}
        />
      </ButtonWrapper>
    </CreatePositionContainer>
  );
};

EditPosition.propTypes = {
  alerts: T.object.isRequired,
  companyPositionQuestions: T.array.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchFetchPosition: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleEditPosition: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  loading: T.bool.isRequired,
};

export default EditPosition;
