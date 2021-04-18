import React from 'react';
import T from 'prop-types';

import {
  BaseFileInput,
  Coin,
  ConditionalRender,
  IconButton,
} from 'components/base_ui';
import { getBase64 } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  EmptyGithubLinkComponent,
  GithubEditComponent,
  GithubLinkComponent,
} from './GithubLinkComponents';
import {
  EmptyPersonalLinkComponent,
  PersonalEditComponent,
  PersonalLinkComponent,
} from './PersonalLinkComponents';
import {
  EmptyStackoverflowLinkComponent,
  StackoverflowEditComponent,
  StackoverflowLinkComponent,
} from './StackoverflowLinkComponents';
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
import { LinksWrapper } from '../styledComponents';

const CloseIcon = iconDictionary('close');
const DoneIcon = iconDictionary('done');

const ProfileComponent = ({
  activePullRequests,
  changeGithub,
  changePersonal,
  changePreferredLanguages,
  changeStackoverflow,
  changeUserImage,
  completedPullRequests,
  createdDate,
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
  preferredLanguages,
  profilePic,
  rejectedPullRequests,
  rep,
  setChangeGithub,
  setChangePersonal,
  setChangePreferredLanguages,
  setChangeStackoverflow,
  setChangeUserImage,
  setIsDisabled,
  setValue,
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
        <LinksWrapper>
          <ConditionalRender
            Component={
              <ConditionalRender
                Component={GithubLinkComponent}
                FallbackComponent={EmptyGithubLinkComponent}
                propsToPassDown={{
                  githubLink,
                  handleEdit,
                  isDisabled,
                  setChangeGithub,
                }}
                shouldRender={!!githubLink}
              />
            }
            FallbackComponent={
              <GithubEditComponent
                githubLinkError={githubLinkError}
                handleClose={handleClose}
                handleSubmitInputChange={handleSubmitInputChange}
                handleValidateInput={handleValidateInput}
                setChangeGithub={setChangeGithub}
                setValue={setValue}
                value={value}
              />
            }
            shouldRender={!changeGithub}
          />
          <ConditionalRender
            Component={
              <ConditionalRender
                Component={PersonalLinkComponent}
                FallbackComponent={EmptyPersonalLinkComponent}
                propsToPassDown={{
                  handleEdit,
                  isDisabled,
                  personalLink,
                  setChangePersonal,
                }}
                shouldRender={!!personalLink}
              />
            }
            FallbackComponent={
              <PersonalEditComponent
                handleClose={handleClose}
                handleSubmitInputChange={handleSubmitInputChange}
                handleValidateInput={handleValidateInput}
                personalLinkError={personalLinkError}
                setChangePersonal={setChangePersonal}
                setValue={setValue}
                value={value}
              />
            }
            shouldRender={!changePersonal}
          />
          <ConditionalRender
            Component={
              <ConditionalRender
                Component={StackoverflowLinkComponent}
                FallbackComponent={EmptyStackoverflowLinkComponent}
                propsToPassDown={{
                  stackoverflowLink,
                  handleEdit,
                  isDisabled,
                  setChangeStackoverflow,
                }}
                shouldRender={!!stackoverflowLink}
              />
            }
            FallbackComponent={
              <StackoverflowEditComponent
                handleClose={handleClose}
                handleSubmitInputChange={handleSubmitInputChange}
                handleValidateInput={handleValidateInput}
                setChangeStackoverflow={setChangeStackoverflow}
                setValue={setValue}
                stackoverflowLinkError={stackoverflowLinkError}
                value={value}
              />
            }
            shouldRender={!changeStackoverflow}
          />
        </LinksWrapper>
        <Rep>
          <Coin />
          &nbsp;<b> {rep}</b>&nbsp;credits
        </Rep>
        <UserMetricsView
          activePullRequests={activePullRequests}
          changePreferredLanguages={changePreferredLanguages}
          completedPullRequests={completedPullRequests}
          createdDate={createdDate}
          dollarsEarned={dollarsEarned}
          handleClose={handleClose}
          handleEdit={handleEdit}
          handleSubmitInputChange={handleSubmitInputChange}
          isDisabled={isDisabled}
          preferredLanguages={preferredLanguages}
          rejectedPullRequests={rejectedPullRequests}
          setChangePreferredLanguages={setChangePreferredLanguages}
          setValue={setValue}
          value={value}
        />
      </UserCardWrapper>
    </DetailViewContainer>
  );
};

ProfileComponent.propTypes = {
  activePullRequests: T.number.isRequired,
  changeGithub: T.bool.isRequired,
  changePersonal: T.bool.isRequired,
  changePreferredLanguages: T.bool.isRequired,
  changeStackoverflow: T.bool.isRequired,
  changeUserImage: T.bool.isRequired,
  completedPullRequests: T.number.isRequired,
  createdDate: T.string.isRequired,
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
  preferredLanguages: T.array.isRequired,
  profilePic: T.string.isRequired,
  rejectedPullRequests: T.number.isRequired,
  rep: T.number.isRequired,
  setChangeGithub: T.func.isRequired,
  setChangePersonal: T.func.isRequired,
  setChangePreferredLanguages: T.func.isRequired,
  setChangeStackoverflow: T.func.isRequired,
  setChangeUserImage: T.func.isRequired,
  setIsDisabled: T.func.isRequired,
  setValue: T.func.isRequired,
  stackoverflowLink: T.string,
  value: T.string.isRequired,
};

export default ProfileComponent;
