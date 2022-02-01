import React, { useEffect } from 'react';
import T from 'prop-types';

import { ErrorSuccessBanner } from 'components/base_ui';

import {
  ButtonGroup,
  MarkdownHeader,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalSubheader,
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
  handleClose,
  messageAlerts: { error, success },
  notifyCompanyLoading,
  positionId,
}) => {
  useEffect(() => dispatchResetFormState, []);

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>Notify company</ModalHeader>
        <ErrorSuccessBanner
          bottomMarginRequired="1rem"
          error={error}
          onClose={dispatchClearAlerts}
          success={success}
          topMarginRequired="1rem"
        />
        <ModalSubheader>
          The company will receive your application and message from you.
        </ModalSubheader>
        <div>
          <MarkdownHeader>Message</MarkdownHeader>
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
          disabled={!form.body}
          label="Send"
          loading={notifyCompanyLoading}
          onClick={() => dispatchNotifyCompany({ body: form.body, positionId })}
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
  handleClose: T.func.isRequired,
  messageAlerts: T.object.isRequired,
  notifyCompanyLoading: T.bool.isRequired,
  positionId: T.string.isRequired,
};

export default ApplyJobModal;
