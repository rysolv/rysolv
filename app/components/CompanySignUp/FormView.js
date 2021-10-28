import React, { useEffect } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import optionDictionary from './Options';
import {
  ButtonGroup,
  FormViewHeader,
  OptionDescription,
  OptionError,
  OptionLabel,
  OptionWrapper,
  StyledButton,
  StyledErrorSuccessBanner,
  StyledFocusDiv,
  ViewContainer,
} from './styledComponents';

const NextIcon = iconDictionary('navigateNext');

const FormView = ({
  alerts: { error },
  dispatchChangeInput,
  dispatchClearAlerts,
  form,
  formErrors,
  handleCancel,
  handleSubmit,
  handleValidateInput,
  questions,
}) => {
  useEffect(() => dispatchClearAlerts, []);

  const hasErrors = Object.keys(formErrors).some(input => !!formErrors[input]);
  const isComplete = Object.keys(form).every(input => !!form[input]);
  const shouldSubmit = !hasErrors && isComplete;

  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      if (shouldSubmit) handleSubmit();
    }
  };

  return (
    <StyledFocusDiv
      id="surveyQuestion"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <ViewContainer>
        <FormViewHeader>Tell us a bit about your company.</FormViewHeader>
        <StyledErrorSuccessBanner error={error} onClose={dispatchClearAlerts} />
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

            return (
              <OptionWrapper key={`option-${id}`}>
                <OptionLabel>{question}</OptionLabel>
                <OptionDescription>{description}</OptionDescription>
                <OptionToRender
                  dispatchChangeInput={dispatchChangeInput}
                  id={id}
                  onBlur={() =>
                    handleValidateInput({
                      field: id,
                      values: form,
                    })
                  }
                  options={options}
                  value={form[id]}
                  {...restProps}
                />
                <OptionError>{formErrors[id]}</OptionError>
              </OptionWrapper>
            );
          },
        )}
        <ButtonGroup>
          <StyledButton disableRipple onClick={handleCancel}>
            Cancel
          </StyledButton>
          <StyledButton
            disabled={!shouldSubmit}
            disableRipple
            onClick={handleSubmit}
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
  dispatchClearAlerts: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleCancel: T.func.isRequired,
  handleSubmit: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  questions: T.array.isRequired,
};

export default FormView;
