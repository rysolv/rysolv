import React, { useEffect } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import ExampleContributions from './ExampleContributions';
import ExampleProfile from './ExampleProfile';

import {
  ButtonWrapper,
  DescriptionBullets,
  DescriptionContent,
  DescriptionTitle,
  JobsHeader,
  StyledFocusDiv,
  StyledGithubButton,
  StyledPrimaryButton,
  ViewContainer,
} from './styledComponents';

const Dollar = iconDictionary('dollarSquare');
const Edit = iconDictionary('edit');
const Github = iconDictionary('github');
const Star = iconDictionary('star');

const DescriptionView = ({ handleStart, isGithubVerified, isSignedIn }) => {
  useEffect(() => {
    document.getElementById('surveyDescription').focus();
  }, []);
  const handleKeypress = ({ key }) => {
    if (key === 'Enter' && isGithubVerified && isSignedIn) {
      handleStart();
    }
  };
  return (
    <StyledFocusDiv
      id="surveyDescription"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <JobsHeader />
      <ViewContainer>
        <div>
          <DescriptionTitle>Let your code speak</DescriptionTitle>
          <DescriptionContent>
            <b>Introducing a new hiring platform for developers.</b>
            <br />
            No more take home assignments or algorithm tests! Rysolv lets you
            fast track your way through the hiring process. We analyze your
            coding history, conduct an interview to gauge your interests, and
            match you with companies looking for your skills.
            <DescriptionBullets>
              <ul>
                <li>{Github}Generate insights on your git history</li>
                <li>{Star}Showcase your contributions</li>
              </ul>
              <ul>
                <li>{Edit}Get personalized feedback on your portfolio</li>
                <li>{Dollar}Find employers looking for your exact skills</li>
              </ul>
            </DescriptionBullets>
          </DescriptionContent>
          <ExampleProfile />
          <br />
          <ExampleContributions />
        </div>
        <ButtonWrapper>
          <ConditionalRender
            Component={
              <StyledPrimaryButton
                isSelected
                label="Get Started!"
                onClick={handleStart}
              />
            }
            FallbackComponent={<StyledGithubButton type="jobs" />}
            shouldRender={isSignedIn && isGithubVerified}
          />
        </ButtonWrapper>
      </ViewContainer>
    </StyledFocusDiv>
  );
};

DescriptionView.defaultProp = { isGithubVerified: false };

DescriptionView.propTypes = {
  handleStart: T.func.isRequired,
  isGithubVerified: T.bool,
  isSignedIn: T.bool.isRequired,
};

export default DescriptionView;
