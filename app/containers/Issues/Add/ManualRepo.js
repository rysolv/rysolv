import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton } from 'components/base_ui';
import RepoForm from 'components/Issues/Add/RepoForm';
import ExistingRepos from 'components/Issues/Add/ExistingRepos';

import {
  clearRepo,
  incrementStep,
  inputChange,
  updateIsManual,
  updateRepo,
} from '../actions';
import { makeSelectIssues, makeSelectReposDisabled } from '../selectors';
import {
  BackLink,
  ButtonGroup,
  StyledFocusDiv,
  StyledH3,
} from './styledComponents';

const ManualRepo = ({
  activeUser,
  dispatchUpdateIsManual,
  handleClearRepo,
  handleIncrementStep,
  handleInputChange,
  handleUpdateRepo,
  isDisabled,
  repoData,
}) => {
  useEffect(() => {
    dispatchUpdateIsManual({ value: true });
    document.getElementById('issueRepoManual').focus();
  }, []);

  const idSelected = repoData.repoId.value !== '';

  const handleKeypress = ({ key }) => {
    if (key === 'Enter' && idSelected) {
      handleIncrementStep({ step: 3, view: 'addIssue' });
    }
  };
  return (
    <StyledFocusDiv
      id="issueRepoManual"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <StyledH3>Select a Repo</StyledH3>
      <ExistingRepos
        activeUser={activeUser}
        handleClearRepo={handleClearRepo}
        handleInputChange={handleInputChange}
        handleUpdateRepo={handleUpdateRepo}
        repoData={repoData}
      />
      <StyledH3>Or create a new Repo</StyledH3>

      <RepoForm handleInputChange={handleInputChange} repoData={repoData} />
      <ButtonGroup>
        <BackLink
          onClick={() => handleIncrementStep({ step: 1, view: 'addIssue' })}
        >
          Back
        </BackLink>
        <PrimaryButton
          disabled={!isDisabled && !idSelected}
          label="Next"
          onClick={() => handleIncrementStep({ step: 3, view: 'addIssue' })}
        />
      </ButtonGroup>
    </StyledFocusDiv>
  );
};

ManualRepo.propTypes = {
  activeUser: T.object,
  dispatchUpdateIsManual: T.func,
  handleClearRepo: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  handleUpdateRepo: T.func,
  isDisabled: T.bool,
  repoData: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  isDisabled: makeSelectReposDisabled(),
  repoData: makeSelectIssues('repoData'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchUpdateIsManual: payload => dispatch(updateIsManual(payload)),
    handleClearRepo: payload => dispatch(clearRepo(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
    handleUpdateRepo: payload => dispatch(updateRepo(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualRepo);
