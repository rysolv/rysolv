import React from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import AsyncRender from 'components/AsyncRender';
import ImportForm from 'components/Organizations/Add/ImportForm';
import { makeSelectAuth } from 'containers/Auth/selectors';
import { validateOrganizationUrl } from 'utils/validate';

import {
  clearAlerts,
  importOrganization,
  incrementStep,
  inputChange,
  inputError,
  updateIsManual,
} from '../actions';
import {
  makeSelectOrganizations,
  makeSelectOrganizationsLoading,
  makeSelectOrganizationsError,
} from '../selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class ImportOrganization extends React.PureComponent {
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
      dispatchImportOrganization,
      dispatchInputError,
      handleIncrementStep,
      handleInputChange,
      importError,
      importOrganizationLoading,
      organizationData,
      userOrganizations,
      userOrganizationsLoading,
    } = this.props;
    const { isGithubVerified } = activeUser || {};

    const handleSubmit = () => {
      const { autoImportUrl, importUrl } = organizationData;
      const url =
        autoImportUrl.value !== '' ? autoImportUrl.value : importUrl.value;
      const { error, message, validatedUrl } = validateOrganizationUrl(url);

      if (error) {
        dispatchInputError({ errors: { importUrl: message } });
      } else {
        dispatchImportOrganization({ validatedUrl });
      }
    };

    return (
      <AsyncRender
        component={ImportForm}
        isRequiredData={false}
        loading={importOrganizationLoading}
        propsToPassDown={{
          handleIncrementStep,
          handleInputChange,
          handleSubmit,
          importError,
          importOrganizationLoading,
          isGithubVerified,
          organizationData,
          userOrganizations,
          userOrganizationsLoading,
        }}
      />
    );
  }
}

ImportOrganization.propTypes = {
  activeUser: T.object.isRequired,
  dispatchImportOrganization: T.func,
  dispatchInputError: T.func,
  dispatchUpdateIsManual: T.func,
  handleClearAlerts: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  importError: T.object,
  importOrganizationLoading: T.bool,
  organizationData: T.object,
  userOrganizations: T.array,
  userOrganizationsLoading: T.bool,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  /**
   * Reducer : Organizations
   */
  importError: makeSelectOrganizationsError('importOrganization'),
  importOrganizationLoading: makeSelectOrganizationsLoading(
    'importOrganization',
  ),
  organizationData: makeSelectOrganizations('organizationData'),
  userOrganizations: makeSelectOrganizations('userOrganizations'),
  userOrganizationsLoading: makeSelectOrganizationsLoading('userOrganizations'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    dispatchImportOrganization: payload =>
      dispatch(importOrganization(payload)),
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
)(ImportOrganization);
