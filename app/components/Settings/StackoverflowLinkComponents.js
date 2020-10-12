import React from 'react';
import T from 'prop-types';

import { BaseTextInput, IconButton } from 'components/base_ui';
import { formatUrlLinks } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  IconButtonGroup,
  LinkIcon,
  OneLink,
  OneLinkWrapper,
  StyledA,
} from './styledComponents';

const CloseIcon = iconDictionary('close');
const DoneIcon = iconDictionary('done');
const EditIcon = iconDictionary('edit');
const StackoverflowIcon = iconDictionary('stackoverflow');

export const EmptyStackoverflowLinkComponent = ({
  handleEdit,
  isDisabled,
  setChangeStackoverflow,
}) => (
  <OneLinkWrapper>
    <OneLink>
      <LinkIcon>{StackoverflowIcon}</LinkIcon>
      Add Stackoverflow link
    </OneLink>
    <IconButton
      disabled={isDisabled}
      icon={EditIcon}
      label="Edit"
      onClick={() =>
        handleEdit({
          changeInputState: setChangeStackoverflow,
        })
      }
    />
  </OneLinkWrapper>
);

export const StackoverflowEditComponent = ({
  handleClose,
  handleSubmitInputChange,
  setChangeStackoverflow,
  setValue,
  value,
}) => (
  <OneLinkWrapper>
    <OneLink>
      <LinkIcon>{StackoverflowIcon}</LinkIcon>
      <BaseTextInput onChange={e => setValue(e.target.value)} value={value} />
    </OneLink>
    <IconButtonGroup>
      <IconButton
        icon={CloseIcon}
        label="Close"
        onClick={() =>
          handleClose({ changeInputState: setChangeStackoverflow })
        }
      />
      <IconButton
        icon={DoneIcon}
        label="Save"
        onClick={() =>
          handleSubmitInputChange({
            changeInputState: setChangeStackoverflow,
            field: 'stackoverflowLink',
          })
        }
      />
    </IconButtonGroup>
  </OneLinkWrapper>
);

export const StackoverflowLinkComponent = ({
  handleEdit,
  isDisabled,
  setChangeStackoverflow,
  stackoverflowLink,
}) => (
  <OneLinkWrapper>
    <OneLink>
      <LinkIcon>{StackoverflowIcon}</LinkIcon>
      <StyledA href={stackoverflowLink} target="_blank">
        {formatUrlLinks({ stackoverflowLink })}
      </StyledA>
    </OneLink>
    <IconButton
      disabled={isDisabled}
      icon={EditIcon}
      label="Edit"
      onClick={() =>
        handleEdit({
          changeInputState: setChangeStackoverflow,
          currentValue: stackoverflowLink,
        })
      }
    />
  </OneLinkWrapper>
);

EmptyStackoverflowLinkComponent.propTypes = {
  handleEdit: T.func,
  isDisabled: T.bool,
  setChangeStackoverflow: T.func,
};

StackoverflowEditComponent.propTypes = {
  handleClose: T.func,
  handleSubmitInputChange: T.func,
  setChangeStackoverflow: T.func,
  setValue: T.func,
  value: T.oneOfType([T.array, T.number, T.string]),
};

StackoverflowLinkComponent.propTypes = {
  handleEdit: T.func,
  isDisabled: T.bool,
  setChangeStackoverflow: T.func,
  stackoverflowLink: T.string,
};
