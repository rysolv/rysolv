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
  handleUpdateUserLinks,
  handleValidateInput,
  updateLinksLoading,
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

  const hasLinks =
    user.githubLink || user.personalLink || user.stackoverflowLink;

  return (
    <ModalContainer>
      <StyledTitle>{hasLinks ? 'Edit' : 'Add'} links</StyledTitle>
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
          disabled={hasErrors}
          label={hasLinks ? 'Save' : 'Add'}
          loading={updateLinksLoading}
          onClick={handleUpdateUserLinks}
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
  handleUpdateUserLinks: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  updateLinksLoading: T.bool.isRequired,
  user: T.object.isRequired,
};

export default UpdateLinksModal;
