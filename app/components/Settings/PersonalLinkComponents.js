import React from 'react';
import T from 'prop-types';

import { IconButton } from 'components/base_ui';
import { formatUrlLinks } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  IconButtonGroup,
  LinkIcon,
  OneLink,
  OneLinkWrapper,
  StyledA,
  StyledBaseTextInput,
} from './styledComponents';

const CloseIcon = iconDictionary('close');
const DoneIcon = iconDictionary('done');
const EditIcon = iconDictionary('edit');
const PersonalIcon = iconDictionary('link');

export const EmptyPersonalLinkComponent = ({
  handleEdit,
  isDisabled,
  setChangePersonal,
}) => (
  <OneLinkWrapper>
    <OneLink>
      <LinkIcon>{PersonalIcon}</LinkIcon>
      Add personal link
    </OneLink>
    <IconButton
      disabled={isDisabled}
      icon={EditIcon}
      label="Edit"
      onClick={() =>
        handleEdit({
          changeInputState: setChangePersonal,
        })
      }
    />
  </OneLinkWrapper>
);

export const PersonalEditComponent = ({
  handleClose,
  handleSubmitInputChange,
  handleValidateInput,
  personalLinkError,
  setChangePersonal,
  setValue,
  value,
}) => (
  <OneLinkWrapper>
    <OneLink>
      <LinkIcon>{PersonalIcon}</LinkIcon>
      <StyledBaseTextInput
        error={!!personalLinkError}
        helperText={personalLinkError}
        onBlur={() =>
          handleValidateInput({
            field: 'personalLink',
            values: { personalLink: value },
          })
        }
        onChange={e => setValue(e.target.value)}
        placeholder="https://www.example.com/"
        value={value}
      />
    </OneLink>
    <IconButtonGroup>
      <IconButton
        icon={CloseIcon}
        label="Close"
        onClick={() => handleClose({ changeInputState: setChangePersonal })}
      />
      <IconButton
        icon={DoneIcon}
        label="Save"
        onClick={() =>
          handleSubmitInputChange({
            changeInputState: setChangePersonal,
            field: 'personalLink',
          })
        }
      />
    </IconButtonGroup>
  </OneLinkWrapper>
);

export const PersonalLinkComponent = ({
  handleEdit,
  isDisabled,
  personalLink,
  setChangePersonal,
}) => (
  <OneLinkWrapper>
    <OneLink>
      <LinkIcon>{PersonalIcon}</LinkIcon>
      <StyledA href={personalLink} target="_blank">
        {formatUrlLinks({ personalLink })}
      </StyledA>
    </OneLink>
    <IconButton
      disabled={isDisabled}
      icon={EditIcon}
      label="Edit"
      onClick={() =>
        handleEdit({
          changeInputState: setChangePersonal,
          currentValue: personalLink,
        })
      }
    />
  </OneLinkWrapper>
);

EmptyPersonalLinkComponent.propTypes = {
  handleEdit: T.func,
  isDisabled: T.bool,
  setChangePersonal: T.func,
};

PersonalEditComponent.propTypes = {
  handleClose: T.func,
  handleSubmitInputChange: T.func,
  handleValidateInput: T.func.isRequired,
  personalLinkError: T.string.isRequired,
  setChangePersonal: T.func,
  setValue: T.func,
  value: T.oneOfType([T.array, T.number, T.string]),
};

PersonalLinkComponent.propTypes = {
  handleEdit: T.func,
  isDisabled: T.bool,
  personalLink: T.string,
  setChangePersonal: T.func,
};
