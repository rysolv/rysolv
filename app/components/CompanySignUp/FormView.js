import React, { useEffect } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import iconDictionary from 'utils/iconDictionary';

import optionDictionary from './Options';
import {
  ButtonGroup,
  DescriptionWrapper,
  OptionDescription,
  OptionError,
  OptionLabel,
  OptionWrapper,
  QuestionWrapper,
  StyledButton,
  StyledErrorSuccessBanner,
  StyledFocusDiv,
  ViewContainer,
  ContentGroup,
} from './styledComponents';

const NextIcon = iconDictionary('navigateNext');

const FormView = ({
  alerts: { error },
  dispatchChangeInput,
  dispatchChangeView,
  dispatchClearAlerts,
  formErrors: { company: companyFormErrors },
  forms: { company: companyForm },
  handleCancel,
  handleValidateInput,
  questions,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    return dispatchClearAlerts;
  }, []);

  const hasErrors = Object.keys(companyFormErrors).some(
    input => !!companyFormErrors[input],
  );
  const isComplete = Object.keys(companyForm).every(input => {
    if (input === 'location') {
      return !isEmpty(companyForm[input]);
    }
    return !!companyForm[input];
  });
  const shouldSubmit = !hasErrors && isComplete;

  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      if (shouldSubmit) dispatchChangeView({ view: 1 });
    }
  };

  return (
    <StyledFocusDiv
      id="surveyQuestion"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <ViewContainer>
        <StyledErrorSuccessBanner error={error} onClose={dispatchClearAlerts} />
        <QuestionWrapper>Tell us a bit about your company.</QuestionWrapper>
        <ContentGroup>
          <DescriptionWrapper>
            Complete the form to get access to qualified candidates waiting for
            you.
          </DescriptionWrapper>
          {questions.map(
            ({
              description,
              id,
              options,
              optionType,
              question,
              ...restProps
            }) => {
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
        </ContentGroup>
        <ButtonGroup>
          <StyledButton disableRipple onClick={handleCancel}>
            Cancel
          </StyledButton>
          <StyledButton
            disabled={!shouldSubmit}
            disableRipple
            onClick={() => dispatchChangeView({ view: 1 })}
          >
            Continue
            {NextIcon}
          </StyledButton>
        </ButtonGroup>
      </ViewContainer>
    </StyledFocusDiv>
  );
};

FormView.propTypes = {
  alerts: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeView: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  formErrors: T.object.isRequired,
  forms: T.object.isRequired,
  handleCancel: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  questions: T.array.isRequired,
};

export default FormView;
