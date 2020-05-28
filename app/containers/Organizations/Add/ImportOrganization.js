import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import AsyncRender from 'components/AsyncRender';
import ImportForm from 'components/Organizations/Add/ImportForm';

import { validateOrganizationUrl } from 'utils/validate';
import {
  importOrganization,
  incrementStep,
  inputChange,
  inputError,
} from '../actions';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsLoading,
  makeSelectOrganizationsError,
} from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class ImportOrganization extends React.PureComponent {
  render() {
    const {
      dispatchImportOrganization,
      dispatchInputError,
      handleIncrementStep,
      handleInputChange,
      importError,
      importOrganizationLoading,
      organizationData,
    } = this.props;
    const handleSubmit = () => {
      const {
        importUrl: { value: url },
      } = organizationData;
      const { error, validatedUrl, message } = validateOrganizationUrl(url);

      if (error) {
        dispatchInputError({ errors: { importUrl: message } });
      } else {
        dispatchImportOrganization({ validatedUrl });
      }
    };
    return (
      <Fragment>
        <AsyncRender
          isRequiredData={false}
          component={ImportForm}
          loading={importOrganizationLoading}
          propsToPassDown={{
            handleIncrementStep,
            handleInputChange,
            handleSubmit,
            importError,
            importOrganizationLoading,
            organizationData,
          }}
        />
      </Fragment>
    );
  }
}

ImportOrganization.propTypes = {
  dispatchImportOrganization: T.func,
  dispatchInputError: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  importError: T.object,
  importOrganizationLoading: T.bool,
  organizationData: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  importError: makeSelectOrganizationsError('importOrganization'),
  importOrganizationLoading: makeSelectOrganizationsLoading(
    'importOrganization',
  ),
  organizationData: makeSelectOrganizations('organizationData'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    dispatchImportOrganization: payload =>
      dispatch(importOrganization(payload)),
    dispatchInputError: payload => dispatch(inputError(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImportOrganization);
