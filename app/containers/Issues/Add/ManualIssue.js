import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';
import ManualForm from 'components/Issues/Add/ManualForm';

import { incrementStep, inputChange } from '../actions';
import { makeSelectIssues, makeSelectIssuesDisabled } from '../selectors';
import { ButtonGroup, StyledH3 } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class ManualIssue extends React.PureComponent {
  render() {
    const {
      data,
      handleIncrementStep,
      handleInputChange,
      isDisabled,
    } = this.props;
    return (
      <Fragment>
        <StyledH3>Add Issue</StyledH3>
        <ManualForm data={data} handleInputChange={handleInputChange} />
        <ButtonGroup>
          <SecondaryButton
            label="Back"
            onClick={() => handleIncrementStep({ step: 1, view: 'addIssue' })}
          />
          <PrimaryButton
            disabled={!isDisabled}
            label="Preview"
            onClick={() => handleIncrementStep({ step: 3, view: 'addIssue' })}
          />
        </ButtonGroup>
      </Fragment>
    );
  }
}

ManualIssue.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  isDisabled: T.bool,
  handleInputChange: T.func,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  data: makeSelectIssues('data'),
  isDisabled: makeSelectIssuesDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualIssue);
