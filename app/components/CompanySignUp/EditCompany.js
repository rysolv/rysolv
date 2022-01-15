import React, { useEffect } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';

import optionDictionary from './Options';
import {
  ButtonWrapper,
  EditCompanyContainer,
  EditCompanyHeader,
  OptionDescription,
  OptionError,
  OptionLabel,
  OptionWrapper,
  StyledErrorSuccessBanner,
  StyledPrimaryAsyncButton,
  StyledPrimaryButton,
} from './styledComponents';

const EditCompany = ({
  alerts: { error },
  companyQuestions,
  dispatchChangeInput,
  dispatchClearAlerts,
  dispatchResetFormState,
  form: { company: companyForm },
  formErrors: { company: companyFormErrors },
  handleEditCompany,
  handleNav,
  handleValidateInput,
  loading,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatchClearAlerts();
      dispatchResetFormState({ category: 'company' });
    };
  }, []);

  const hasErrors = Object.keys(companyFormErrors).some(
    input => !!companyFormErrors[input],
  );
  const formattedCompanyForm = omit(companyForm, ['logo']);
  const isComplete = Object.keys(formattedCompanyForm).every(input => {
    if (input === 'location') {
      return !isEmpty(formattedCompanyForm[input]);
    }
    return !!companyForm[input];
  });

  return (
    <EditCompanyContainer>
      <EditCompanyHeader>Edit company</EditCompanyHeader>
      <StyledErrorSuccessBanner error={error} onClose={dispatchClearAlerts} />
      {companyQuestions.map(
        ({ description, id, options, optionType, question, ...restProps }) => {
          const OptionToRender = optionDictionary[optionType];

          const handleChangeInput = (value, inputField) => {
            dispatchChangeInput({
              field: inputField || id,
              form: 'company',
              value,
            });
          };

          return (
            <OptionWrapper key={`option-${id}`}>
              <OptionLabel>{question}</OptionLabel>
              <OptionDescription>{description}</OptionDescription>
              <OptionToRender
                handleChangeInput={handleChangeInput}
                id={id}
                onBlur={() =>
                  handleValidateInput({
                    field: id,
                    values: companyForm,
                  })
                }
                options={options}
                value={companyForm[id]}
                {...restProps}
              />
              <OptionError>{companyFormErrors[id]}</OptionError>
            </OptionWrapper>
          );
        },
      )}
      <ButtonWrapper>
        <StyledPrimaryButton
          label="Cancel"
          onClick={() => handleNav('/company/dashboard')}
        />
        <StyledPrimaryAsyncButton
          disabled={hasErrors || !isComplete}
          label="Save"
          loading={loading}
          onClick={handleEditCompany}
        />
      </ButtonWrapper>
    </EditCompanyContainer>
  );
};

EditCompany.propTypes = {
  alerts: T.object.isRequired,
  companyQuestions: T.array.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleEditCompany: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  loading: T.bool.isRequired,
};

export default EditCompany;
