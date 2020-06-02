import React from 'react';
import T from 'prop-types';

import { BaseTextInput, IconButton } from 'components/base_ui';
import { formatUrlLinks } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import { LinkIcon, OneLink, OneLinkWrapper, StyledA } from './styledComponents';

const CloseIcon = iconDictionary('close');
const DoneIcon = iconDictionary('done');
const EditIcon = iconDictionary('edit');
const PersonalIcon = iconDictionary('link');

export const PersonalEditComponent = ({
  handleClose,
  handleDone,
  setChangePersonal,
  setValue,
  value,
}) => (
  <OneLinkWrapper>
    <OneLink>
      <LinkIcon>{PersonalIcon}</LinkIcon>
      <BaseTextInput onChange={e => setValue(e.target.value)} value={value} />
    </OneLink>
    <div>
      <IconButton
        icon={CloseIcon}
        label="Close"
        onClick={() => handleClose({ changeInputState: setChangePersonal })}
      />
      <IconButton
        icon={DoneIcon}
        label="Save"
        onClick={() =>
          handleDone({
            changeInputState: setChangePersonal,
            field: 'personalLink',
          })
        }
      />
    </div>
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

PersonalEditComponent.propTypes = {
  handleClose: T.func,
  handleDone: T.func,
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
