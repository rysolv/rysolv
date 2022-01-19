import React from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { ConditionalRender, LanguageWrapper } from 'components/base_ui';
import { formatUrlLinks } from 'utils/globalHelpers';
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
  LinkText,
  LinkWrapper,
  ProfilePicture,
  SkillsContainer,
  StyledIconButton,
  StyledPrimaryButton,
  UserDashboardSideNavContainer,
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
  const activeButtonPath = surveyComplete
    ? '/dashboard/update'
    : '/jobs/application';

  const handleChangeInput = val => {
    if (surveyComplete) {
      const newHiringStatus = val ? 'active' : 'inactive';
      dispatchSetHiringStatus({ hiringStatus: newHiringStatus });
    } else {
      handleNav('/jobs/application');
    }
  };

  const isActive = hiringStatus === 'active';

  const hasLinks = !!githubLink || !!personalLink || !!stackoverflowLink;
  const linksButtonLabel = hasLinks ? 'Edit links' : 'Add links';

  const skillsButtonLabel = skills.length ? 'Edit skills' : 'Add skills';
  const skillsLabel = 'Show your skills';

  return (
    <UserDashboardSideNavContainer>
      <ProfilePicture src={profilePic} />
      <div>
        <ActionWrapper>
          <ActiveWrapper>
            <ActiveLabelWrapper>
              <ActiveCircle $isActive={isActive}>&#9679;</ActiveCircle>
              <ActiveLabel>
                {isActive ? 'Actively looking' : 'Not actively looking'}
              </ActiveLabel>
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
                <LinkWrapper>
                  <StyledIconButton href={githubLink} target="_blank">
                    {GithubIcon}
                  </StyledIconButton>
                  <LinkText>{formatUrlLinks({ githubLink })}</LinkText>
                </LinkWrapper>
              }
              shouldRender={!!githubLink}
            />
            <ConditionalRender
              Component={
                <LinkWrapper>
                  <StyledIconButton href={personalLink} target="_blank">
                    {PersonalIcon}
                  </StyledIconButton>
                  <LinkText>{formatUrlLinks({ personalLink })}</LinkText>
                </LinkWrapper>
              }
              shouldRender={!!personalLink}
            />
            <ConditionalRender
              Component={
                <LinkWrapper>
                  <StyledIconButton href={stackoverflowLink} target="_blank">
                    {StackoverflowIcon}
                  </StyledIconButton>
                  <div>{formatUrlLinks({ stackoverflowLink })}</div>
                </LinkWrapper>
              }
              shouldRender={!!stackoverflowLink}
            />
          </IconButtonWrapper>
          <StyledPrimaryButton
            $customTopMargin={
              !!githubLink || !!personalLink || !!stackoverflowLink
                ? '2.4rem'
                : '3rem'
            }
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
            <div>
              {skills.map(({ skill }) => (
                <LanguageWrapper key={skill} language={skill} />
              ))}
            </div>
            <StyledPrimaryButton
              $customTopMargin={!isEmpty(skills) ? '2.5rem' : '3rem'}
              label={skillsButtonLabel}
              onClick={() => dispatchOpenModal({ modalState: 'updateSkills' })}
            />
          </SkillsContainer>
        </ActionWrapper>
      </div>
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
