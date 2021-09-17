import React from 'react';
import T from 'prop-types';

import Markdown from 'components/Markdown';

import {
  ButtonGroup,
  InputError,
  ScheduleInterviewContainer,
  SecondaryButton,
  StyledPrimaryButton,
  ModalContent,
  ModalHeader,
  ModalSubheader,
  MarkdownHeader,
} from './styledComponents';

const ScheduleInterviewModal = ({
  dispatchChangeInput,
  dispatchNotifyCandidate,
  dispatchResetModalState,
  form,
  formErrors: { emailError },
}) => (
  <ScheduleInterviewContainer>
    <ModalContent>
      <ModalHeader>Notify Candidate</ModalHeader>
      <ModalSubheader>
        The candidate will receive an email from you.
      </ModalSubheader>
      <div>
        <MarkdownHeader>Message</MarkdownHeader>
        <Markdown
          body={form.email}
          handleInput={value => dispatchChangeInput({ field: 'email', value })}
        />
        <InputError>{emailError}</InputError>
      </div>
    </ModalContent>
    <ButtonGroup>
      <SecondaryButton disableRipple onClick={dispatchResetModalState}>
        Cancel
      </SecondaryButton>
      <StyledPrimaryButton
        label="Send"
        onClick={() => dispatchNotifyCandidate(form)}
      />
    </ButtonGroup>
  </ScheduleInterviewContainer>
);

ScheduleInterviewModal.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  dispatchNotifyCandidate: T.func.isRequired,
  dispatchResetModalState: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
};

export default ScheduleInterviewModal;
