import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import {
  ButtonWrapper,
  DescriptionContent,
  DescriptionTitle,
  JobsHeader,
  StyledGithubButton,
  StyledPrimaryButton,
  ViewContainer,
} from './styledComponents';

const DescriptionView = ({ isGithubVerified, isSignedIn }) => (
  <Fragment>
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
              onClick={() => {}}
            />
          }
          FallbackComponent={<StyledGithubButton type="jobs" />}
          shouldRender={isSignedIn && isGithubVerified}
        />
      </ButtonWrapper>
    </ViewContainer>
  </Fragment>
);

DescriptionView.defaultProp = { isGithubVerified: false };

DescriptionView.propTypes = {
  isGithubVerified: T.bool,
  isSignedIn: T.bool.isRequired,
};

export default DescriptionView;
