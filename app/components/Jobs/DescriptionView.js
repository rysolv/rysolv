import React, { useEffect } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import {
  ButtonWrapper,
  DescriptionContent,
  DescriptionTitle,
  JobsHeader,
  StyledFocusDiv,
  StyledGithubButton,
  StyledPrimaryButton,
  ViewContainer,
} from './styledComponents';

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
      <JobsHeader>Job Recruitment</JobsHeader>
      <ViewContainer>
        <div>
          <DescriptionTitle>
            Apply to join Rysolv&#39;s talent network
          </DescriptionTitle>
          <DescriptionContent>
            Rysolv has created a network of top talent in technology. Based on
            experience, we can provide matches with top companies.
          </DescriptionContent>
        </div>
        <ButtonWrapper>
          <ConditionalRender
            Component={
              <StyledPrimaryButton
                isSelected
                label="Start Questionnaire"
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
