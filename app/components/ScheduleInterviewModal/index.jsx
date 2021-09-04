import React from 'react';
import T from 'prop-types';

import { PrimaryButton } from 'components/base_ui';

import { ScheduleInterviewContainer } from './styledComponents';

const ScheduleInterviewModal = ({ dispatchCloseModal }) => (
  <ScheduleInterviewContainer>
    <PrimaryButton label="Cancel" onClick={() => dispatchCloseModal()} />
  </ScheduleInterviewContainer>
);

ScheduleInterviewModal.propTypes = {
  dispatchCloseModal: T.func.isRequired,
};

export default ScheduleInterviewModal;
