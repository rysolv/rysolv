import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { PrimaryButton } from 'components/base_ui';
import ManualForm from 'components/Organizations/Add/ManualForm';

import { incrementStep, inputChange, updateIsManual } from '../actions';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsDisabled,
} from '../selectors';
import { BackLink, ButtonGroup, StyledH3 } from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class ManualOrganization extends React.PureComponent {
  componentDidMount() {
    const { dispatchUpdateIsManual } = this.props;
    dispatchUpdateIsManual({ value: true });
  }

  render() {
    const {
      organizationData,
      handleIncrementStep,
      handleInputChange,
      isDisabled,
    } = this.props;
    return (
      <Fragment>
        <StyledH3>Add Organization</StyledH3>
        <ManualForm
          organizationData={organizationData}
          handleInputChange={handleInputChange}
        />
        <ButtonGroup>
          <BackLink
            onClick={() =>
              handleIncrementStep({ step: 1, view: 'addOrganization' })
            }
          >
            Back
          </BackLink>
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
  dispatchUpdateIsManual: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  isDisabled: T.bool,
  organizationData: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  isDisabled: makeSelectOrganizationsDisabled(),
  organizationData: makeSelectOrganizations('organizationData'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    dispatchUpdateIsManual: payload => dispatch(updateIsManual(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualOrganization);
