import React from 'react';
import T from 'prop-types';

import CompanySettingsInput from './CompanySettingsInput';
import {
  CompanySettingsContainer,
  CompanySettingsHeader,
  // CompanySettingsSubText,
  // Divider,
  // StyledDeleteButton,
} from './styledComponents';

const CompanySettings = ({
  dispatchChangeInput,
  // dispatchOpenModal,
  form,
  formErrors,
  handleEditUser,
  handleValidateInput,
}) => (
  <CompanySettingsContainer>
    <CompanySettingsHeader>Update account profile</CompanySettingsHeader>
    {Object.keys(form).map(field => {
      const handleChangeInput = value => {
        dispatchChangeInput({
          field,
          value,
        });
      };

      return (
        <CompanySettingsInput
          error={formErrors[field]}
          field={field}
          handleChangeInput={handleChangeInput}
          handleEditUser={handleEditUser}
          key={`input-${field}`}
          onBlur={() =>
            handleValidateInput({
              field,
              values: form,
            })
          }
          value={form[field]}
        />
      );
    })}
    {/* <Divider />
    <CompanySettingsHeader>Delete my account</CompanySettingsHeader>
    <CompanySettingsSubText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </CompanySettingsSubText>
    <StyledDeleteButton
      label="Delete my account"
      onClick={() => dispatchOpenModal({ modalState: 'deleteUser' })}
    /> */}
  </CompanySettingsContainer>
);

CompanySettings.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  // dispatchOpenModal: T.func.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleEditUser: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
};

export default CompanySettings;
