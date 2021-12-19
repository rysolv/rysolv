import React, { useEffect } from 'react';
import T from 'prop-types';

import { InputOption } from './Options';
import {
  ButtonWrapper,
  ModalContainer,
  OptionError,
  OptionLabel,
  OptionWrapper,
  StyledErrorSuccessBanner,
  StyledPrimaryAsyncButton,
  StyledPrimaryButton,
  StyledTitle,
} from './styledComponents';

const UpdateLinksModal = ({
  alerts: { error },
  dispatchChangeInput,
  dispatchClearAlerts,
  dispatchResetFormState,
  form,
  formErrors,
  handleClose,
  handleUpdateUser,
  handleValidateInput,
  user,
}) => {
  useEffect(
    () => () => {
      dispatchClearAlerts();
      dispatchResetFormState();
    },
    [],
  );

  const hasErrors = Object.keys(formErrors).some(input => !!formErrors[input]);
  const isComplete = Object.keys(form).some(input => !!form[input]);

  const label =
    user.githubLink || user.personalLink || user.stackoverflowLink
      ? 'Edit'
      : 'Add';

  return (
    <ModalContainer>
      <StyledTitle>{label} links</StyledTitle>
      <StyledErrorSuccessBanner error={error} onClose={dispatchClearAlerts} />
      <OptionWrapper>
        <OptionLabel>Github link</OptionLabel>
        <InputOption
          dispatchChangeInput={dispatchChangeInput}
          form={form}
          handleValidateInput={handleValidateInput}
          id="githubLink"
        />
        <OptionError>{formErrors.githubLink}</OptionError>
      </OptionWrapper>
      <OptionWrapper>
        <OptionLabel>Personal link</OptionLabel>
        <InputOption
          dispatchChangeInput={dispatchChangeInput}
          form={form}
          handleValidateInput={handleValidateInput}
          id="personalLink"
        />
        <OptionError>{formErrors.personalLink}</OptionError>
      </OptionWrapper>
      <OptionWrapper>
        <OptionLabel>Stackoverflow link</OptionLabel>
        <InputOption
          dispatchChangeInput={dispatchChangeInput}
          form={form}
          handleValidateInput={handleValidateInput}
          id="stackoverflowLink"
        />
        <OptionError>{formErrors.stackoverflowLink}</OptionError>
      </OptionWrapper>
      <ButtonWrapper>
        <StyledPrimaryButton label="Cancel" onClick={handleClose} />
        <StyledPrimaryAsyncButton
          disabled={hasErrors || !isComplete}
          label={label}
          onClick={handleUpdateUser}
        />
      </ButtonWrapper>
    </ModalContainer>
  );
};

UpdateLinksModal.propTypes = {
  alerts: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleClose: T.func.isRequired,
  handleUpdateUser: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  user: T.object.isRequired,
};

export default UpdateLinksModal;
