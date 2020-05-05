import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';
import ManualForm from 'components/Organizations/Add/ManualForm';

import { incrementStep, inputChange } from '../actions';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsDisabled,
} from '../selectors';
import { ButtonGroup, StyledH3 } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class ManualOrganization extends React.PureComponent {
  render() {
    const {
      data,
      handleIncrementStep,
      handleInputChange,
      isDisabled,
    } = this.props;
    return (
      <Fragment>
        <StyledH3>Add Organization</StyledH3>
        <ManualForm data={data} handleInputChange={handleInputChange} />
        <ButtonGroup>
          <SecondaryButton
            label="Back"
            onClick={() =>
              handleIncrementStep({ step: 1, view: 'addOrganization' })
            }
          />
          <PrimaryButton
            disabled={!isDisabled}
            label="Next"
            onClick={() =>
              handleIncrementStep({ step: 3, view: 'addOrganization' })
            }
          />
        </ButtonGroup>
      </Fragment>
    );
  }
}

ManualOrganization.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  isDisabled: T.bool,
  handleInputChange: T.func,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  data: makeSelectOrganizations('data'),
  isDisabled: makeSelectOrganizationsDisabled(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualOrganization);
