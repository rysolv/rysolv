import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import AsyncRender from 'components/AsyncRender';
import ImportForm from 'components/Organizations/Add/ImportForm';
import { makeSelectAuth } from 'containers/Auth/selectors';
import { validateRepoUrl } from 'utils/validate';

import {
  clearAlerts,
  importRepo,
  incrementStep,
  inputChange,
  inputError,
  updateIsManual,
} from '../actions';
import {
  makeSelectRepos,
  makeSelectReposError,
  makeSelectReposLoading,
} from '../selectors';

export class ImportRepo extends React.PureComponent {
  componentDidMount() {
    const { dispatchUpdateIsManual } = this.props;
    dispatchUpdateIsManual({ value: false });
  }

  componentWillUnmount() {
    const { handleClearAlerts } = this.props;
    handleClearAlerts();
  }

  render() {
    const {
      activeUser,
      dispatchImportRepo,
      dispatchInputError,
      handleIncrementStep,
      handleInputChange,
      importError,
      importRepoLoading,
      repoData,
      userRepos,
      userReposLoading,
    } = this.props;
    const { isGithubVerified } = activeUser || {};

    const handleSubmit = () => {
      const { autoImportUrl, importUrl } = repoData;
      const url =
        autoImportUrl.value !== '' ? autoImportUrl.value : importUrl.value;
      const { error, message, validatedUrl } = validateRepoUrl(url);

      if (error) {
        dispatchInputError({ errors: { importUrl: message } });
      } else {
        dispatchImportRepo({ validatedUrl });
      }
    };

    return (
      <AsyncRender
        component={ImportForm}
        isRequiredData={false}
        loading={importRepoLoading}
        propsToPassDown={{
          handleIncrementStep,
          handleInputChange,
          handleSubmit,
          importError,
          importRepoLoading,
          isGithubVerified,
          repoData,
          userRepos,
          userReposLoading,
        }}
      />
    );
  }
}

ImportRepo.propTypes = {
  activeUser: T.object.isRequired,
  dispatchImportRepo: T.func,
  dispatchInputError: T.func,
  dispatchUpdateIsManual: T.func,
  handleClearAlerts: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  importError: T.object,
  importRepoLoading: T.bool,
  repoData: T.object,
  userRepos: T.array,
  userReposLoading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  /**
   * Reducer : Repos
   */
  importError: makeSelectReposError('importRepo'),
  importRepoLoading: makeSelectReposLoading('importRepo'),
  repoData: makeSelectRepos('repoData'),
  userRepos: makeSelectRepos('userRepos'),
  userReposLoading: makeSelectReposLoading('userRepos'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Repos
     */
    dispatchImportRepo: payload => dispatch(importRepo(payload)),
    dispatchInputError: payload => dispatch(inputError(payload)),
    dispatchUpdateIsManual: payload => dispatch(updateIsManual(payload)),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImportRepo);
