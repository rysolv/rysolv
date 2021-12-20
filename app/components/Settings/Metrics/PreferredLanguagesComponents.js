import React from 'react';
import T from 'prop-types';

import { IconButton, LanguageWrapper } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import { Language, LanguageListItem } from './styledComponents';
import { IconButtonContainer, LinksWrapper } from '../styledComponents';

const EditIcon = iconDictionary('edit');

export const EmptyPreferredLanguagesComponent = ({
  dispatchOpenModal,
  isDisabled,
}) => (
  <LanguageListItem>
    <LinksWrapper>Add languages</LinksWrapper>
    <IconButtonContainer>
      <IconButton
        disabled={isDisabled}
        icon={EditIcon}
        label="Edit"
        onClick={() => dispatchOpenModal({ modalState: 'updateSkills' })}
      />
    </IconButtonContainer>
  </LanguageListItem>
);

export const PreferredLanguagesComponent = ({
  dispatchOpenModal,
  isDisabled,
  skills,
}) => (
  <LanguageListItem>
    <Language>
      {skills.map(({ skill }) => (
        <LanguageWrapper key={`list-item-${skill}`} language={skill} />
      ))}
    </Language>
    <IconButtonContainer>
      <IconButton
        disabled={isDisabled}
        icon={EditIcon}
        label="Edit"
        onClick={() => dispatchOpenModal({ modalState: 'updateSkills' })}
      />
    </IconButtonContainer>
  </LanguageListItem>
);

EmptyPreferredLanguagesComponent.propTypes = {
  dispatchOpenModal: T.func.isRequired,
  isDisabled: T.bool,
};

PreferredLanguagesComponent.propTypes = {
  dispatchOpenModal: T.func.isRequired,
  isDisabled: T.bool,
  skills: T.array,
};
