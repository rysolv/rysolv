import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton } from 'components/base_ui';
import ManualForm from 'components/Issues/Add/ManualForm';

import { incrementStep, inputChange, updateIsManual } from '../actions';
import { makeSelectIssues, makeSelectIssuesDisabled } from '../selectors';
import {
  BackLink,
  ButtonGroup,
  SelectedRepo,
  StyledFocusDiv,
  StyledH3,
  StyledLink,
  VerifyWrapper,
} from './styledComponents';

const ManualIssue = ({
  dispatchUpdateIsManual,
  handleIncrementStep,
  handleInputChange,
  isDisabled,
  issueData,
  repoData,
}) => {
  useEffect(() => {
    dispatchUpdateIsManual({ value: true });
    document.getElementById('issueManual').focus();
  }, []);

  const handleKeypress = ({ key }) => {
    if (key === 'Enter' && isDisabled) {
      handleIncrementStep({ step: 4, view: 'addIssue' });
    }
  };
  return (
    <StyledFocusDiv
      id="issueManual"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <StyledH3>Repo</StyledH3>
      <VerifyWrapper>
        <SelectedRepo>{repoData.repoName.value}</SelectedRepo>
        <StyledLink href={`//${repoData.repoUrl.value}`} target="_blank">
          {repoData.repoUrl.value}
        </StyledLink>
      </VerifyWrapper>
      <StyledH3>Add Issue</StyledH3>
      <ManualForm handleInputChange={handleInputChange} issueData={issueData} />
      <ButtonGroup>
        <BackLink
          onClick={() => handleIncrementStep({ step: 2, view: 'addIssue' })}
        >
          Edit Repo
        </BackLink>
        <PrimaryButton
          disabled={!isDisabled}
          label="Preview Issue"
          onClick={() => handleIncrementStep({ step: 4, view: 'addIssue' })}
        />
      </ButtonGroup>
    </StyledFocusDiv>
  );
};

ManualIssue.propTypes = {
  dispatchUpdateIsManual: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  isDisabled: T.bool,
  issueData: T.object,
  repoData: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  isDisabled: makeSelectIssuesDisabled(),
  issueData: makeSelectIssues('issueData'),
  repoData: makeSelectIssues('repoData'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchUpdateIsManual: payload => dispatch(updateIsManual(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualIssue);
