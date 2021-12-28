import React, { useEffect } from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { RadioGroupOption } from './Options';
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

const UpdateSkillsModal = ({
  alerts: { error },
  dispatchChangeInput,
  dispatchChangeSkillLevel,
  dispatchClearAlerts,
  dispatchDeleteSkill,
  dispatchFetchUserResponse,
  dispatchResetFormState,
  form,
  formErrors,
  handleClose,
  handleUpdateUserSkills,
  handleValidateInput,
  options,
  user,
}) => {
  useEffect(() => {
    dispatchFetchUserResponse();
    return () => {
      dispatchClearAlerts();
      dispatchResetFormState();
    };
  }, []);

  const hasErrors = !!formErrors.skills;
  const isComplete =
    !isEmpty(form.skills) &&
    form.skills.every(
      ({ beginner, expert, intermediate }) =>
        beginner === true || expert === true || intermediate === true,
    );

  const label = user.skills.length ? 'Edit' : 'Add';

  const tableProps = { dispatchChangeSkillLevel, dispatchDeleteSkill };

  return (
    <ModalContainer>
      <StyledTitle>{label} skills</StyledTitle>
      <StyledErrorSuccessBanner error={error} onClose={dispatchClearAlerts} />
      <OptionWrapper>
        <OptionLabel>List your most proficient skills.</OptionLabel>
        <RadioGroupOption
          dispatchChangeInput={dispatchChangeInput}
          form={form}
          handleValidateInput={handleValidateInput}
          options={options}
          tableProps={tableProps}
        />
        <OptionError>{formErrors.skills}</OptionError>
      </OptionWrapper>
      <ButtonWrapper>
        <StyledPrimaryButton label="Cancel" onClick={handleClose} />
        <StyledPrimaryAsyncButton
          disabled={hasErrors || !isComplete}
          label={label}
          onClick={handleUpdateUserSkills}
        />
      </ButtonWrapper>
    </ModalContainer>
  );
};

UpdateSkillsModal.propTypes = {
  alerts: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchFetchUserResponse: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleClose: T.func.isRequired,
  handleUpdateUserSkills: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  options: T.array.isRequired,
  user: T.object.isRequired,
};

export default UpdateSkillsModal;
