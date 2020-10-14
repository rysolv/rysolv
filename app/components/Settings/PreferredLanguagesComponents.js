import React from 'react';
import T from 'prop-types';

import { IconButton, LanguageWrapper } from 'components/base_ui';
import LanguageAutocomplete from 'components/LanguageAutocomplete';
import iconDictionary from 'utils/iconDictionary';

import {
  IconButtonContainer,
  IconButtonGroup,
  Language,
  LanguageListItem,
  LinksWrapper,
  StyledLanguageAutocomplete,
} from './styledComponents';

const CloseIcon = iconDictionary('close');
const DoneIcon = iconDictionary('done');
const EditIcon = iconDictionary('edit');

export const EmptyPreferredLanguagesComponent = ({
  handleEdit,
  isDisabled,
  setChangePreferredLanguages,
}) => (
  <LanguageListItem>
    <LinksWrapper>Add languages</LinksWrapper>
    <IconButtonContainer>
      <IconButton
        disabled={isDisabled}
        icon={EditIcon}
        label="Edit"
        onClick={() =>
          handleEdit({
            changeInputState: setChangePreferredLanguages,
            currentValue: [],
          })
        }
      />
    </IconButtonContainer>
  </LanguageListItem>
);

export const PreferredLanguagesEditComponent = ({
  handleClose,
  handleSubmitInputChange,
  preferredLanguages,
  setChangePreferredLanguages,
  setValue,
}) => (
  <LanguageListItem>
    <StyledLanguageAutocomplete>
      <LanguageAutocomplete
        onChange={(e, value) => setValue(() => value.map(el => el.value))}
        value={preferredLanguages.map(el => ({
          value: el,
        }))}
      />
    </StyledLanguageAutocomplete>

    <IconButtonGroup>
      <IconButton
        icon={CloseIcon}
        label="Close"
        onClick={() =>
          handleClose({ changeInputState: setChangePreferredLanguages })
        }
      />
      <IconButton
        icon={DoneIcon}
        label="Save"
        onClick={() =>
          handleSubmitInputChange({
            changeInputState: setChangePreferredLanguages,
            field: 'preferredLanguages',
          })
        }
      />
    </IconButtonGroup>
  </LanguageListItem>
);

export const PreferredLanguagesComponent = ({
  handleEdit,
  isDisabled,
  preferredLanguages,
  setChangePreferredLanguages,
}) => (
  <LanguageListItem>
    <Language>
      {preferredLanguages.map(language => (
        <LanguageWrapper key={`list-item-${language}`} language={language} />
      ))}
    </Language>
    <IconButtonContainer>
      <IconButton
        disabled={isDisabled}
        icon={EditIcon}
        label="Edit"
        onClick={() =>
          handleEdit({
            changeInputState: setChangePreferredLanguages,
            currentValue: preferredLanguages,
          })
        }
      />
    </IconButtonContainer>
  </LanguageListItem>
);

EmptyPreferredLanguagesComponent.propTypes = {
  handleEdit: T.func,
  isDisabled: T.bool,
  setChangePreferredLanguages: T.func,
};

PreferredLanguagesEditComponent.propTypes = {
  handleClose: T.func,
  handleSubmitInputChange: T.func,
  preferredLanguages: T.oneOfType([T.array, T.number, T.string]),
  setChangePreferredLanguages: T.func,
  setValue: T.func,
};

PreferredLanguagesComponent.propTypes = {
  handleEdit: T.func,
  isDisabled: T.bool,
  preferredLanguages: T.array,
  setChangePreferredLanguages: T.func,
};
