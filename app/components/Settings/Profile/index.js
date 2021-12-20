import React from 'react';
import T from 'prop-types';

import { getBase64 } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  BaseFileInput,
  Coin,
  ConditionalRender,
  IconButton,
} from 'components/base_ui';
import UserLinksComponent from './UserLinksComponent';
import UserMetricsView from '../Metrics';

import {
  DetailViewContainer,
  EditUserImageWrapper,
  InputIconGroup,
  Name,
  Rep,
  UserCardWrapper,
  UserImage,
} from './styledComponents';

const CloseIcon = iconDictionary('close');
const DoneIcon = iconDictionary('done');

const ProfileComponent = ({
  activePullRequests,
  changeGithub,
  changePersonal,
  changeStackoverflow,
  changeUserImage,
  completedPullRequests,
  createdDate,
  dispatchOpenModal,
  displayBottom,
  dollarsEarned,
  firstName,
  githubLink,
  handleClose,
  handleEdit,
  handleSubmitInputChange,
  handleValidateInput,
  inputErrors,
  isDisabled,
  lastName,
  personalLink,
  profilePic,
  rejectedPullRequests,
  rep,
  setChangeGithub,
  setChangePersonal,
  setChangeStackoverflow,
  setChangeUserImage,
  setIsDisabled,
  setValue,
  skills,
  stackoverflowLink,
  value,
}) => {
  const {
    githubLink: githubLinkError,
    personalLink: personalLinkError,
    stackoverflowLink: stackoverflowLinkError,
  } = inputErrors;

  const handleUploadUserImage = async e => {
    const { files } = e.target;
    const formattedUserImage = await getBase64(files[0]);
    setIsDisabled(true);
    setChangeUserImage(true);
    setValue(formattedUserImage);
  };

  const profilePicToRender = !changeUserImage ? profilePic : value;

  return (
    <DetailViewContainer>
      <UserCardWrapper displayBottom={displayBottom}>
        <EditUserImageWrapper>
          <UserImage src={profilePicToRender} />
          <ConditionalRender
            Component={
              <BaseFileInput
                accept="image/png, image/jpeg"
                id="logoFileInput"
                onChange={handleUploadUserImage}
              />
            }
            FallbackComponent={
              <InputIconGroup>
                <IconButton
                  icon={CloseIcon}
                  label="Close"
                  onClick={() =>
                    handleClose({ changeInputState: setChangeUserImage })
                  }
                />
                <IconButton
                  icon={DoneIcon}
                  label="Save"
                  onClick={() =>
                    handleSubmitInputChange({
                      changeInputState: setChangeUserImage,
                      field: 'profilePic',
                    })
                  }
                />
              </InputIconGroup>
            }
            shouldRender={!changeUserImage}
          />
        </EditUserImageWrapper>
        <Name>
          {firstName} {lastName}
        </Name>

        <UserLinksComponent
          changeGithub={changeGithub}
          changePersonal={changePersonal}
          changeStackoverflow={changeStackoverflow}
          githubLink={githubLink}
          githubLinkError={githubLinkError}
          handleClose={handleClose}
          handleEdit={handleEdit}
          handleSubmitInputChange={handleSubmitInputChange}
          handleValidateInput={handleValidateInput}
          isDisabled={isDisabled}
          personalLink={personalLink}
          personalLinkError={personalLinkError}
          setChangeGithub={setChangeGithub}
          setChangePersonal={setChangePersonal}
          setChangeStackoverflow={setChangeStackoverflow}
          setValue={setValue}
          stackoverflowLink={stackoverflowLink}
          stackoverflowLinkError={stackoverflowLinkError}
          value={value}
        />

        <Rep>
          <Coin />
          &nbsp;<b> {rep}</b>&nbsp;credits
        </Rep>
        <UserMetricsView
          activePullRequests={activePullRequests}
          completedPullRequests={completedPullRequests}
          createdDate={createdDate}
          dispatchOpenModal={dispatchOpenModal}
          dollarsEarned={dollarsEarned}
          isDisabled={isDisabled}
          rejectedPullRequests={rejectedPullRequests}
          skills={skills}
        />
      </UserCardWrapper>
    </DetailViewContainer>
  );
};

ProfileComponent.propTypes = {
  activePullRequests: T.number.isRequired,
  changeGithub: T.bool.isRequired,
  changePersonal: T.bool.isRequired,
  changeStackoverflow: T.bool.isRequired,
  changeUserImage: T.bool.isRequired,
  completedPullRequests: T.number.isRequired,
  createdDate: T.string.isRequired,
  dispatchOpenModal: T.func.isRequired,
  displayBottom: T.bool.isRequired,
  dollarsEarned: T.number.isRequired,
  firstName: T.string.isRequired,
  githubLink: T.string,
  handleClose: T.func.isRequired,
  handleEdit: T.func.isRequired,
  handleSubmitInputChange: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  inputErrors: T.object.isRequired,
  isDisabled: T.bool.isRequired,
  lastName: T.string.isRequired,
  personalLink: T.string,
  profilePic: T.string.isRequired,
  rejectedPullRequests: T.number.isRequired,
  rep: T.number.isRequired,
  setChangeGithub: T.func.isRequired,
  setChangePersonal: T.func.isRequired,
  setChangeStackoverflow: T.func.isRequired,
  setChangeUserImage: T.func.isRequired,
  setIsDisabled: T.func.isRequired,
  setValue: T.func.isRequired,
  skills: T.array.isRequired,
  stackoverflowLink: T.string,
  value: T.oneOfType([T.array, T.string]).isRequired,
};

export default ProfileComponent;
