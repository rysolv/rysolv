import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton } from 'components/base_ui';
import ManualForm from 'components/Repos/Add/ManualForm';

import {
  generateIdenticon,
  incrementStep,
  inputChange,
  updateIsManual,
} from '../actions';
import { makeSelectRepos, makeSelectReposDisabled } from '../selectors';
import {
  BackLink,
  ButtonGroup,
  StyledFocusDiv,
  StyledH3,
} from './styledComponents';

const ManualRepo = ({
  dispatchUpdateIsManual,
  handleGenerateIdenticon,
  handleIncrementStep,
  handleInputChange,
  isDisabled,
  repoData,
}) => {
  useEffect(() => {
    dispatchUpdateIsManual({ value: true });
    document.getElementById('repoManual').focus();
  }, []);

  const handleNextStep = () => {
    handleGenerateIdenticon();
    handleIncrementStep({ step: 3, view: 'addRepo' });
  };

  const handleKeypress = ({ key }) => {
    if (key === 'Enter' && isDisabled) handleNextStep();
  };

  return (
    <StyledFocusDiv
      id="repoManual"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <StyledH3>Add Repo</StyledH3>
      <ManualForm handleInputChange={handleInputChange} repoData={repoData} />
      <ButtonGroup>
        <BackLink
          onClick={() => handleIncrementStep({ step: 1, view: 'addRepo' })}
        >
          Back
        </BackLink>
        <PrimaryButton
          disabled={!isDisabled}
          label="Next"
          onClick={handleNextStep}
        />
      </ButtonGroup>
    </StyledFocusDiv>
  );
};

ManualRepo.propTypes = {
  dispatchUpdateIsManual: T.func,
  handleGenerateIdenticon: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  isDisabled: T.bool,
  repoData: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Repos
   */
  isDisabled: makeSelectReposDisabled(),
  repoData: makeSelectRepos('repoData'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Repos
     */
    dispatchUpdateIsManual: payload => dispatch(updateIsManual(payload)),
    handleGenerateIdenticon: () => dispatch(generateIdenticon()),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualRepo);
