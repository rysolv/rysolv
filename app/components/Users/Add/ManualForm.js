import React from 'react';
import T from 'prop-types';

import { MainTextInput } from 'components/base_ui';
import { userDataDictionary } from 'containers/Users/constants';

import { HorizontalWrapper, InputFormWrapper } from './styledComponents';

// eslint-disable-next-line arrow-body-style
const ManualForm = ({ data, handleInputChange }) => {
  // eslint-disable-next-line no-param-reassign
  const {
    email,
    firstName,
    githubLink,
    image,
    lastName,
    personalLink,
    preferredLanguages,
    stackoverflowLink,
    userName,
  } = data;
  return (
    <InputFormWrapper>
      <HorizontalWrapper>
        <MainTextInput
          error={!!firstName.error}
          helperText={firstName.error}
          label={userDataDictionary.firstName}
          onChange={e =>
            handleInputChange({
              field: 'firstName',
              form: 'data',
              value: e.target.value,
            })
          }
          value={firstName.value}
        />
        <MainTextInput
          error={!!lastName.error}
          helperText={lastName.error}
          label={userDataDictionary.lastName}
          onChange={e =>
            handleInputChange({
              field: 'lastName',
              form: 'data',
              value: e.target.value,
            })
          }
          value={lastName.value}
        />
      </HorizontalWrapper>
      <MainTextInput
        error={!!userName.error}
        helperText={userName.error}
        label={userDataDictionary.userName}
        onChange={e =>
          handleInputChange({
            field: 'userName',
            form: 'data',
            value: e.target.value,
          })
        }
        value={userName.value}
      />
      <MainTextInput
        error={!!image.error}
        helperText={image.error}
        label={userDataDictionary.image}
        onChange={e =>
          handleInputChange({
            field: 'image',
            form: 'data',
            value: e.target.value,
          })
        }
        value={image.value}
      />
      <MainTextInput
        error={!!preferredLanguages.error}
        helperText={preferredLanguages.error}
        label={userDataDictionary.preferredLanguages}
        onChange={e =>
          handleInputChange({
            field: 'preferredLanguages',
            form: 'data',
            value: e.target.value,
          })
        }
        value={preferredLanguages.value}
      />
      <HorizontalWrapper>
        <MainTextInput
          error={!!email.error}
          helperText={email.error}
          label={userDataDictionary.email}
          onChange={e =>
            handleInputChange({
              field: 'email',
              form: 'data',
              value: e.target.value,
            })
          }
          value={email.value}
        />
        <MainTextInput
          error={!!personalLink.error}
          helperText={personalLink.error}
          label={userDataDictionary.personalLink}
          onChange={e =>
            handleInputChange({
              field: 'personalLink',
              form: 'data',
              value: e.target.value,
            })
          }
          value={personalLink.value}
        />
      </HorizontalWrapper>
      <HorizontalWrapper>
        <MainTextInput
          error={!!githubLink.error}
          helperText={githubLink.error}
          label={userDataDictionary.githubLink}
          onChange={e =>
            handleInputChange({
              field: 'githubLink',
              form: 'data',
              value: e.target.value,
            })
          }
          value={githubLink.value}
        />
        <MainTextInput
          error={!!stackoverflowLink.error}
          helperText={stackoverflowLink.error}
          label={userDataDictionary.stackoverflowLink}
          onChange={e =>
            handleInputChange({
              field: 'stackoverflowLink',
              form: 'data',
              value: e.target.value,
            })
          }
          value={stackoverflowLink.value}
        />
      </HorizontalWrapper>
    </InputFormWrapper>
  );
};

ManualForm.propTypes = {
  data: T.object.isRequired,
  handleInputChange: T.func.isRequired,
};

export default ManualForm;
