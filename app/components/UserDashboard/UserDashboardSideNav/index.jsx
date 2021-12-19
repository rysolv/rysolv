import React from 'react';
import T from 'prop-types';

import { ConditionalRender, LanguageWrapper } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import { ToggleOption } from '../Options';
import {
  ActionWrapper,
  ActiveCircle,
  ActiveLabel,
  ActiveLabelWrapper,
  ActiveText,
  ActiveWrapper,
  IconButtonWrapper,
  ProfilePicture,
  SkillsContainer,
  SkillsWrapper,
  StyledIconButton,
  StyledPrimaryButton,
  UserDashboardSideNavContainer,
  UserProfileWrapper,
} from './styledComponents';

const GithubIcon = iconDictionary('github');
const PersonalIcon = iconDictionary('link');
const StackoverflowIcon = iconDictionary('stackoverflow');

const UserDashboardSideNav = ({
  dispatchOpenModal,
  dispatchSetHiringStatus,
  handleNav,
  user,
}) => {
  const {
    githubLink,
    hiringStatus,
    personalLink,
    profilePic,
    skills,
    stackoverflowLink,
    surveyComplete,
  } = user;
  const activeButtonLabel = surveyComplete
    ? 'Edit application'
    : 'Start application';
  const activeButtonPath = surveyComplete ? '/dashboard/update' : '/jobs';

  const handleChangeInput = val => {
    const newHiringStatus = val ? 'active' : 'inactive';
    dispatchSetHiringStatus({ hiringStatus: newHiringStatus });
  };

  const isActive = hiringStatus === 'active';

  const hasLinks = !!githubLink || !!personalLink || !!stackoverflowLink;
  const linksButtonLabel = hasLinks ? 'Edit links' : 'Add links';

  const skillsButtonLabel = skills.length ? 'Edit skills' : 'Add skills';
  const skillsLabel = 'Show your skills';

  return (
    <UserDashboardSideNavContainer>
      <ProfilePicture src={profilePic} />
      <UserProfileWrapper>
        <ActionWrapper>
          <ActiveWrapper>
            <ActiveLabelWrapper>
              <ActiveCircle $isActive={isActive}>&#9679;</ActiveCircle>
              <ActiveLabel>I&#39;m actively looking</ActiveLabel>
            </ActiveLabelWrapper>
            <ToggleOption
              handleChangeInput={handleChangeInput}
              value={hiringStatus}
            />
          </ActiveWrapper>
          <ActiveText>
            Let companies on the Rysolv platform know that you’re actively
            looking for a job right now.
          </ActiveText>
          <StyledPrimaryButton
            label={activeButtonLabel}
            onClick={() => handleNav(activeButtonPath)}
          />
        </ActionWrapper>
        <ActionWrapper>
          <ActiveLabelWrapper>
            <ActiveLabel>Stay connected</ActiveLabel>
          </ActiveLabelWrapper>
          <IconButtonWrapper $hasLinks={hasLinks}>
            <ConditionalRender
              Component={
                <StyledIconButton href={githubLink} target="_blank">
                  {GithubIcon}
                </StyledIconButton>
              }
              shouldRender={!!githubLink}
            />
            <ConditionalRender
              Component={
                <StyledIconButton href={personalLink} target="_blank">
                  {PersonalIcon}
                </StyledIconButton>
              }
              shouldRender={!!personalLink}
            />
            <ConditionalRender
              Component={
                <StyledIconButton href={stackoverflowLink} target="_blank">
                  {StackoverflowIcon}
                </StyledIconButton>
              }
              shouldRender={!!stackoverflowLink}
            />
          </IconButtonWrapper>
          <StyledPrimaryButton
            label={linksButtonLabel}
            onClick={() => dispatchOpenModal({ modalState: 'updateLinks' })}
          />
        </ActionWrapper>
        <ActionWrapper>
          <ActiveLabelWrapper>
            <ActiveLabel>{skillsLabel}</ActiveLabel>
          </ActiveLabelWrapper>
          <SkillsContainer>
            <ActiveText>
              Our algorithm helps companies match with candidates who have
              profiles that indicate they meet their tech requirements.
            </ActiveText>
            <SkillsWrapper>
              {skills.map(({ skill }) => (
                <LanguageWrapper key={skill} language={skill} />
              ))}
            </SkillsWrapper>
            <StyledPrimaryButton
              label={skillsButtonLabel}
              onClick={() => dispatchOpenModal({ modalState: 'updateSkills' })}
            />
          </SkillsContainer>
        </ActionWrapper>
      </UserProfileWrapper>
    </UserDashboardSideNavContainer>
  );
};

UserDashboardSideNav.propTypes = {
  dispatchOpenModal: T.func.isRequired,
  dispatchSetHiringStatus: T.func.isRequired,
  handleNav: T.func.isRequired,
  user: T.object.isRequired,
};

export default UserDashboardSideNav;
