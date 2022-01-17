import React, { useEffect } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import ExampleContributions from './ExampleContributions';
import ExampleProfile from './ExampleProfile';

import {
  BottomFade,
  ButtonWrapper,
  DescriptionBullets,
  DescriptionContent,
  DescriptionSubTitle,
  DescriptionTitle,
  SampleWrapper,
  StyledFocusDiv,
  StyledGithubButton,
  StyledPrimaryButton,
  ViewContainer,
} from './styledComponents';

const Dollar = iconDictionary('dollarSquare');
const Edit = iconDictionary('edit');
const Github = iconDictionary('github');
const Star = iconDictionary('star');

const DescriptionView = ({
  handleStart,
  isCompany,
  isGithubVerified,
  isSignedIn,
}) => {
  useEffect(() => {
    document.getElementById('surveyDescription').focus();
  }, []);
  const handleKeypress = ({ key }) => {
    if (key === 'Enter' && isGithubVerified && isSignedIn) {
      handleStart();
    }
  };

  const UserButtonComponent = (
    <ConditionalRender
      Component={
        <StyledPrimaryButton
          isSelected
          label="Get started"
          onClick={handleStart}
        />
      }
      FallbackComponent={<StyledGithubButton type="jobs" />}
      shouldRender={isSignedIn && isGithubVerified}
    />
  );

  return (
    <StyledFocusDiv
      id="surveyDescription"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <ViewContainer>
        <DescriptionTitle>Let your code speak</DescriptionTitle>
        <DescriptionContent>
          <DescriptionSubTitle>
            Introducing a new hiring platform for developers.
          </DescriptionSubTitle>
          No more take home assignments or algorithm tests! Rysolv lets you fast
          track your way through the hiring process. We analyze your coding
          history, conduct an interview to gauge your interests, and match you
          with companies looking for your skills.
          <DescriptionBullets>
            <div>
              <span>{Github}Generate insights on your git history</span>
              <span>{Star}Showcase your contributions</span>
            </div>
            <div>
              <span>{Edit}Get personalized feedback on your portfolio</span>
              <span>{Dollar}Find employers looking for your exact skills</span>
            </div>
          </DescriptionBullets>
        </DescriptionContent>
        <SampleWrapper>
          <ExampleProfile />
          <ExampleContributions />
          <BottomFade />
        </SampleWrapper>
        <ButtonWrapper>
          <ConditionalRender
            Component={UserButtonComponent}
            FallbackComponent={
              <StyledPrimaryButton
                disabled
                label="Unavailable on company accounts"
              />
            }
            shouldRender={!isCompany}
          />
        </ButtonWrapper>
      </ViewContainer>
    </StyledFocusDiv>
  );
};

DescriptionView.defaultProp = { isGithubVerified: false };

DescriptionView.propTypes = {
  handleStart: T.func.isRequired,
  isCompany: T.bool.isRequired,
  isGithubVerified: T.bool,
  isSignedIn: T.bool.isRequired,
};

export default DescriptionView;
