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
const EditIcon = iconDictionary('edit');
const GithubIcon = iconDictionary('github');
const DoneIcon = iconDictionary('done');

export const EmptyGithubLinkComponent = ({
  handleEdit,
  isDisabled,
  setChangeGithub,
}) => (
  <OneLinkWrapper>
    <OneLink>
      <LinkIcon>{GithubIcon}</LinkIcon>
      Add Github link
    </OneLink>
    <IconButton
      disabled={isDisabled}
      icon={EditIcon}
      label="Edit"
      onClick={() =>
        handleEdit({
          changeInputState: setChangeGithub,
        })
      }
    />
  </OneLinkWrapper>
);

export const GithubEditComponent = ({
  githubLinkError,
  handleClose,
  handleSubmitInputChange,
  handleValidateInput,
  setChangeGithub,
  setValue,
  value,
}) => (
  <OneLinkWrapper>
    <OneLink>
      <LinkIcon>{GithubIcon}</LinkIcon>
      <StyledBaseTextInput
        error={!!githubLinkError}
        helperText={githubLinkError}
        onBlur={() =>
          handleValidateInput({
            field: 'githubLink',
            values: { githubLink: value },
          })
        }
        onChange={e => setValue(e.target.value)}
        placeholder="https://github.com/bob123"
        value={value}
      />
    </OneLink>
    <IconButtonGroup>
      <IconButton
        icon={CloseIcon}
        label="Close"
        onClick={() => handleClose({ changeInputState: setChangeGithub })}
      />
      <IconButton
        icon={DoneIcon}
        label="Save"
        onClick={() =>
          handleSubmitInputChange({
            changeInputState: setChangeGithub,
            field: 'githubLink',
          })
        }
      />
    </IconButtonGroup>
  </OneLinkWrapper>
);

export const GithubLinkComponent = ({
  githubLink,
  handleEdit,
  isDisabled,
  setChangeGithub,
}) => (
  <OneLinkWrapper>
    <OneLink>
      <LinkIcon>{GithubIcon}</LinkIcon>
      <StyledA href={githubLink} target="_blank">
        {formatUrlLinks({ githubLink })}
      </StyledA>
    </OneLink>
    <IconButton
      disabled={isDisabled}
      icon={EditIcon}
      label="Edit"
      onClick={() =>
        handleEdit({
          changeInputState: setChangeGithub,
          currentValue: githubLink,
        })
      }
    />
  </OneLinkWrapper>
);

EmptyGithubLinkComponent.propTypes = {
  handleEdit: T.func,
  isDisabled: T.bool,
  setChangeGithub: T.func,
};

GithubEditComponent.propTypes = {
  handleClose: T.func,
  githubLinkError: T.string.isRequired,
  handleSubmitInputChange: T.func,
  handleValidateInput: T.func.isRequired,
  setChangeGithub: T.func,
  setValue: T.func,
  value: T.oneOfType([T.array, T.number, T.string]),
};

GithubLinkComponent.propTypes = {
  githubLink: T.string,
  handleEdit: T.func,
  isDisabled: T.bool,
  setChangeGithub: T.func,
};
