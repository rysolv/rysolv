import React, { useEffect } from 'react';
import T from 'prop-types';

import { ErrorSuccessBanner } from 'components/base_ui';
import Markdown from 'components/Markdown';

import {
  ButtonGroup,
  InputError,
  MarkdownHeader,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalSubheader,
  SecondaryButton,
  StyledPrimaryButton,
} from './styledComponents';

const ScheduleInterviewModal = ({
  dispatchChangeInput,
  dispatchClearAlerts,
  dispatchNotifyCandidate,
  dispatchResetFormState,
  form: { scheduleInterview },
  formErrors: { scheduleInterview: scheduleInterviewErrors },
  handleClose,
  messageAlerts: { error, success },
  tableData: { positionId, userId },
}) => {
  useEffect(() => () => dispatchClearAlerts('messageAlerts'), []);

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        dispatchClearAlerts('messageAlerts');
        dispatchResetFormState({ category: 'scheduleInterview' });
      }, 6000);
    }
  }, [error, success]);

  const handleCancel = () => {
    dispatchResetFormState({ category: 'scheduleInterview' });
    handleClose();
  };

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>Notify Candidate</ModalHeader>
        <ErrorSuccessBanner
          bottomMarginRequired="1rem"
          error={error}
          onClose={() => dispatchClearAlerts('messageAlerts')}
          success={success}
          topMarginRequired="1rem"
        />
        <ModalSubheader>
          The candidate will receive a message from you.
        </ModalSubheader>
        <div>
          <MarkdownHeader>Message</MarkdownHeader>
          <Markdown
            body={scheduleInterview.body}
            handleInput={value =>
              dispatchChangeInput({
                field: 'body',
                form: 'scheduleInterview',
                value,
              })
            }
          />
          <InputError>{scheduleInterviewErrors.body}</InputError>
        </div>
      </ModalContent>
      <ButtonGroup>
        <SecondaryButton disableRipple onClick={handleCancel}>
          Cancel
        </SecondaryButton>
        <StyledPrimaryButton
          disabled={!scheduleInterview.body}
          label="Send"
          onClick={() =>
            dispatchNotifyCandidate({
              body: scheduleInterview.body,
              candidateId: userId,
              positionId,
            })
          }
        />
      </ButtonGroup>
    </ModalContainer>
  );
};

ScheduleInterviewModal.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchNotifyCandidate: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleClose: T.func.isRequired,
  messageAlerts: T.object.isRequired,
  tableData: T.object.isRequired,
};

export default ScheduleInterviewModal;
