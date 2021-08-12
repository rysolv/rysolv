import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import AsyncRender from 'components/AsyncRender';
import ImportForm from 'components/Issues/Add/ImportForm';
import { makeSelectAuth } from 'containers/Auth/selectors';
import { validateIssueUrl } from 'utils/validate';

import {
  clearAlerts,
  importIssue,
  incrementStep,
  inputChange,
  inputError,
  updateIsManual,
} from '../actions';
import {
  makeSelectIssueDetailError,
  makeSelectIssues,
  makeSelectIssuesLoading,
} from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class ImportIssue extends React.PureComponent {
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
      dispatchImportIssue,
      dispatchInputError,
      handleIncrementStep,
      handleInputChange,
      importError,
      importIssueLoading,
      issueData,
      userIssues,
      userIssuesLoading,
    } = this.props;
    const { isGithubVerified } = activeUser || {};

    const handleSubmit = () => {
      const { autoImportUrl, importUrl } = issueData;
      const url =
        autoImportUrl.value !== '' ? autoImportUrl.value : importUrl.value;
      const { error, message, validatedUrl } = validateIssueUrl(url);

      if (error) {
        dispatchInputError({ errors: { importUrl: message } });
      } else {
        dispatchImportIssue({ validatedUrl });
      }
    };

    return (
      <AsyncRender
        component={ImportForm}
        isRequiredData={false}
        loading={importIssueLoading}
        propsToPassDown={{
          handleIncrementStep,
          handleInputChange,
          handleSubmit,
          importError,
          importIssueLoading,
          isGithubVerified,
          issueData,
          userIssues,
          userIssuesLoading,
        }}
      />
    );
  }
}

ImportIssue.propTypes = {
  activeUser: T.object.isRequired,
  dispatchImportIssue: T.func,
  dispatchInputError: T.func,
  dispatchUpdateIsManual: T.func,
  handleClearAlerts: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  importError: T.object,
  importIssueLoading: T.bool,
  issueData: T.object,
  userIssues: T.array,
  userIssuesLoading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  /**
   * Reducer : Issues
   */
  importError: makeSelectIssueDetailError('importIssue'),
  importIssueLoading: makeSelectIssuesLoading('importIssue'),
  issueData: makeSelectIssues('issueData'),
  userIssues: makeSelectIssues('userIssues'),
  userIssuesLoading: makeSelectIssuesLoading('userIssues'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchImportIssue: payload => dispatch(importIssue(payload)),
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
)(ImportIssue);
