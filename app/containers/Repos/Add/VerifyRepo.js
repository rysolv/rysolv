import React, { useEffect } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { Card, PrimaryAsyncButton } from 'components/base_ui';
import VerifyForm from 'components/Repos/Add/VerifyForm';

import {
  clearForm,
  generateIdenticon,
  incrementStep,
  saveInfo,
} from '../actions';
import { makeSelectRepos, makeSelectReposRequestBody } from '../selectors';
import {
  BackLink,
  ButtonGroup,
  StyledFocusDiv,
  StyledH3,
} from './styledComponents';

const VerifyRepo = ({
  dispatchClearForm,
  dispatchIncrementStep,
  dispatchSaveInfo,
  handleGenerateIdenticon,
  importSuccess,
  repoData,
  repoData: { organizationLogo },
  requestBody,
}) => {
  useEffect(() => {
    if (!organizationLogo.value) handleGenerateIdenticon();
    document.getElementById('repoAdd').focus();
  }, []);

  const cancelImport = () => {
    dispatchClearForm();
    dispatchIncrementStep({ step: 1, view: 'addRepo' });
  };
  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      handleSaveInfo();
    }
  };
  const handleSaveInfo = () => {
    dispatchSaveInfo({ requestBody });
  };
  return (
    <StyledFocusDiv
      id="repoAdd"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      <StyledH3 isFirstHeader>Repo</StyledH3>
      <Card>
        <VerifyForm repoData={repoData} />
      </Card>
      <ButtonGroup>
        {importSuccess ? (
          <BackLink onClick={() => cancelImport()}>Cancel</BackLink>
        ) : (
          <BackLink
            onClick={() => dispatchIncrementStep({ step: 2, view: 'addRepo' })}
          >
            Edit Repo
          </BackLink>
        )}
        <PrimaryAsyncButton label="Submit" onClick={handleSaveInfo} />
      </ButtonGroup>
    </StyledFocusDiv>
  );
};

VerifyRepo.propTypes = {
  dispatchClearForm: T.func,
  dispatchIncrementStep: T.func,
  dispatchSaveInfo: T.func,
  handleGenerateIdenticon: T.func,
  importSuccess: T.bool,
  repoData: T.object,
  requestBody: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Repos
   */
  repoData: makeSelectRepos('repoData'),
  requestBody: makeSelectReposRequestBody(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Repos
     */
    dispatchClearForm: () => dispatch(clearForm()),
    dispatchIncrementStep: payload => dispatch(incrementStep(payload)),
    dispatchSaveInfo: payload => dispatch(saveInfo(payload)),
    handleGenerateIdenticon: () => dispatch(generateIdenticon()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyRepo);
