import React from 'react';
import T from 'prop-types';

import { ErrorSuccessBanner } from 'components/base_ui';
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
  alerts: { error, success },
  dispatchChangeInput,
  dispatchClearAlerts,
  dispatchNotifyCandidate,
  dispatchResetModalState,
  form,
  formErrors: { body: bodyError },
  tableData: { positionId, userId },
}) => (
  <ScheduleInterviewContainer>
    <ModalContent>
      <ModalHeader>Notify Candidate</ModalHeader>
      <ErrorSuccessBanner
        bottomMarginRequired="1rem"
        error={error}
        onClose={dispatchClearAlerts}
        success={success}
        topMarginRequired="1rem"
      />
      <ModalSubheader>
        The candidate will receive a message from you.
      </ModalSubheader>
      <div>
        <MarkdownHeader>Message</MarkdownHeader>
        <Markdown
          body={form.body}
          handleInput={value => dispatchChangeInput({ field: 'body', value })}
        />
        <InputError>{bodyError}</InputError>
      </div>
    </ModalContent>
    <ButtonGroup>
      <SecondaryButton disableRipple onClick={dispatchResetModalState}>
        Cancel
      </SecondaryButton>
      <StyledPrimaryButton
        disabled={!form.body}
        label="Send"
        onClick={() => dispatchNotifyCandidate({ ...form, positionId, userId })}
      />
    </ButtonGroup>
  </ScheduleInterviewContainer>
);

ScheduleInterviewModal.propTypes = {
  alerts: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchNotifyCandidate: T.func.isRequired,
  dispatchResetModalState: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  tableData: T.object.isRequired,
};

export default ScheduleInterviewModal;
