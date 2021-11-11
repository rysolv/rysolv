import React, { Fragment } from 'react';
import T from 'prop-types';
import { DropDownButton, LanguageWrapper } from 'components/base_ui';
import UserLinksComponent from 'components/Settings/Profile/UserLinksComponent';

import {
  AddSkillButton,
  ProfileDetailContainer,
  ProfileDetailItem,
  ProfilePicture,
  SkillsContainer,
  StyledPrimaryButton,
} from './styledComponents';

const UserProfile = ({ data, dispatchSetHiringStatus, handleNav }) => {
  const {
    firstName,
    hiringStatus,
    lastName,
    preferredLanguages,
    profilePic,
    surveyComplete,
    username,
  } = data;
  const hiringOptions = [
    {
      label: 'not looking for work',
      onClick: () => dispatchSetHiringStatus({ hiringStatus: 'inactive' }),
    },
    {
      label: 'looking for work',
      onClick: () => {
        if (surveyComplete) {
          dispatchSetHiringStatus({ hiringStatus: 'active' });
        } else {
          handleNav('/jobs');
        }
      },
    },
  ];

  const hiringBool = hiringStatus === 'active';

  return (
    <Fragment>
      <ProfilePicture src={profilePic} />
      <ProfileDetailContainer>
        <DropDownButton
          label={hiringBool ? hiringOptions[1].label : hiringOptions[0].label}
          options={hiringOptions}
          greyscale={!hiringBool}
        />
        <StyledPrimaryButton
          label="my profile"
          onClick={() => handleNav(`/profile/${username}`)}
        />
        <ProfileDetailItem>
          {firstName} {lastName}
        </ProfileDetailItem>
        <UserLinksComponent
        // changeGithub={changeGithub}
        // changePersonal={changePersonal}
        // changeStackoverflow={changeStackoverflow}
        // githubLink={githubLink}
        // githubLinkError={githubLinkError}
        // handleClose={handleClose}
        // handleEdit={handleEdit}
        // handleSubmitInputChange={handleSubmitInputChange}
        // handleValidateInput={handleValidateInput}
        // isDisabled={isDisabled}
        // personalLink={personalLink}
        // personalLinkError={personalLinkError}
        // setChangeGithub={setChangeGithub}
        // setChangePersonal={setChangePersonal}
        // setChangeStackoverflow={setChangeStackoverflow}
        // setValue={setValue}
        // stackoverflowLink={stackoverflowLink}
        // stackoverflowLinkError={stackoverflowLinkError}
        // value={value}
        />
      </ProfileDetailContainer>

      <ProfileDetailItem>My Skills</ProfileDetailItem>
      <SkillsContainer>
        {preferredLanguages.map(el => (
          <LanguageWrapper key={el} language={el} />
        ))}

        <AddSkillButton
          label={preferredLanguages.length ? 'Edit Skills' : 'Add Skills'}
        />
      </SkillsContainer>
    </Fragment>
  );
};

UserProfile.propTypes = {
  data: T.object.isRequired,
  dispatchSetHiringStatus: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default UserProfile;
