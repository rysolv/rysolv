import React from 'react';
import T from 'prop-types';

import { IconButton, LanguageWrapper } from 'components/base_ui';
import LanguageAutocomplete from 'components/LanguageAutocomplete';
import iconDictionary from 'utils/iconDictionary';

import {
  IconButtonContainer,
  Language,
  LanguageListItem,
  StyledLanguageAutocomplete,
} from './styledComponents';

const CloseIcon = iconDictionary('close');
const DoneIcon = iconDictionary('done');
const EditIcon = iconDictionary('edit');

export const PreferredLanguagesEditComponent = ({
  handleClose,
  handleDone,
  preferredLanguages,
  setChangePreferredLanguages,
  setValue,
}) => (
  <LanguageListItem>
    <StyledLanguageAutocomplete>
      <LanguageAutocomplete
        onChange={(e, value) => setValue(value)}
        value={preferredLanguages}
      />
    </StyledLanguageAutocomplete>

    <div>
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
          handleDone({
            changeInputState: setChangePreferredLanguages,
            field: 'preferredLanguages',
          })
        }
      />
    </div>
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

PreferredLanguagesEditComponent.propTypes = {
  handleClose: T.func,
  handleDone: T.func,
  preferredLanguages: T.array,
  setChangePreferredLanguages: T.func,
  setValue: T.func,
};

PreferredLanguagesComponent.propTypes = {
  handleEdit: T.func,
  isDisabled: T.bool,
  preferredLanguages: T.array,
  setChangePreferredLanguages: T.func,
};
