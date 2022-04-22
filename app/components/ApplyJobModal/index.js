import React, { useEffect } from 'react';
import T from 'prop-types';

import { ConditionalRender, ErrorSuccessBanner } from 'components/base_ui';

import Input from './Input';
import {
  AdditionalInfoWrapper,
  ButtonGroup,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalSubheader,
  OptionError,
  OptionLabel,
  OptionWrapper,
  SecondaryButton,
  StyledMarkdown,
  StyledPrimaryAsyncButton,
} from './styledComponents';

const ApplyJobModal = ({
  dispatchChangeInput,
  dispatchClearAlerts,
  dispatchNotifyCompany,
  dispatchResetFormState,
  form,
  formErrors,
  handleClose,
  handleValidateInput,
  hasFirstName,
  hasLastName,
  messageAlerts: { error, success },
  notifyCompanyLoading,
  positionId,
}) => {
  useEffect(() => dispatchResetFormState, []);

  const isFirstNameComplete =
    (!hasFirstName && !!form.firstName) || (hasFirstName && !form.firstName);
  const isLastNameComplete =
    (!hasLastName && form.lastName) || (hasLastName && !form.lastName);

  const FirstNameInputComponent = (
    <OptionWrapper shouldDecreaseWidth={!hasLastName}>
      <OptionLabel>First name</OptionLabel>
      <Input
        onBlur={() =>
          handleValidateInput({
            field: 'firstName',
            values: form,
          })
        }
        onChange={e =>
          dispatchChangeInput({
            field: 'firstName',
            value: e.target.value,
          })
        }
        value={form.firstName}
      />
      <OptionError>{formErrors.firstName}</OptionError>
    </OptionWrapper>
  );

  const LastNameInputComponent = (
    <OptionWrapper shouldDecreaseWidth={!hasFirstName}>
      <OptionLabel>Last name</OptionLabel>
      <Input
        onBlur={() =>
          handleValidateInput({
            field: 'lastName',
            values: form,
          })
        }
        onChange={e =>
          dispatchChangeInput({
            field: 'lastName',
            value: e.target.value,
          })
        }
        value={form.lastName}
      />
      <OptionError>{formErrors.lastName}</OptionError>
    </OptionWrapper>
  );

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>Tell us about yourself</ModalHeader>
        <ErrorSuccessBanner
          bottomMarginRequired="1rem"
          error={error}
          onClose={dispatchClearAlerts}
          success={success}
          topMarginRequired="1rem"
        />
        <ModalSubheader>
          We need some additional information. Give a brief overview of your
          qualifications, and why the position interests you.
        </ModalSubheader>
        <AdditionalInfoWrapper>
          <ConditionalRender
            Component={FirstNameInputComponent}
            shouldRender={!hasFirstName}
          />
          <ConditionalRender
            Component={LastNameInputComponent}
            shouldRender={!hasLastName}
          />
        </AdditionalInfoWrapper>
        <div>
          <OptionLabel>Message</OptionLabel>
          <StyledMarkdown
            body={form.body}
            handleInput={value =>
              dispatchChangeInput({
                field: 'body',
                value,
              })
            }
          />
        </div>
      </ModalContent>
      <ButtonGroup>
        <SecondaryButton disableRipple onClick={handleClose}>
          Cancel
        </SecondaryButton>
        <StyledPrimaryAsyncButton
          disabled={!(!!form.body && isFirstNameComplete && isLastNameComplete)}
          label="Send"
          loading={notifyCompanyLoading}
          onClick={() =>
            dispatchNotifyCompany({
              body: form.body,
              form,
              positionId,
            })
          }
        />
      </ButtonGroup>
    </ModalContainer>
  );
};

ApplyJobModal.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchNotifyCompany: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleClose: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  hasFirstName: T.bool.isRequired,
  hasLastName: T.bool.isRequired,
  messageAlerts: T.object.isRequired,
  notifyCompanyLoading: T.bool.isRequired,
  positionId: T.string.isRequired,
};

export default ApplyJobModal;
