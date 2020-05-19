import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import ImportForm from 'components/Issues/Add/ImportForm';

import { validateUrl } from 'utils/validate';
import {
  importIssue,
  incrementStep,
  inputChange,
  inputError,
} from '../actions';
import { makeSelectIssueDetailError, makeSelectIssues } from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class ImportIssue extends React.PureComponent {
  render() {
    const {
      data,
      dispatchImportIssue,
      dispatchInputError,
      handleIncrementStep,
      handleInputChange,
      importError,
    } = this.props;
    const handleSubmit = () => {
      const {
        importUrl: { value: url },
      } = data;
      const { error, validatedUrl, message } = validateUrl(url);

      if (error) {
        dispatchInputError({ errors: { importUrl: message } });
      } else {
        dispatchImportIssue({ validatedUrl });
      }
    };

    return (
      <Fragment>
        <ImportForm
          data={data}
          importError={importError}
          handleInputChange={handleInputChange}
          handleIncrementStep={handleIncrementStep}
          handleSubmit={handleSubmit}
        />
      </Fragment>
    );
  }
}

ImportIssue.propTypes = {
  data: T.object,
  dispatchImportIssue: T.func,
  dispatchInputError: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  importError: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  data: makeSelectIssues('data'),
  importError: makeSelectIssueDetailError('importIssue'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchImportIssue: payload => dispatch(importIssue(payload)),
    dispatchInputError: payload => dispatch(inputError(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImportIssue);
