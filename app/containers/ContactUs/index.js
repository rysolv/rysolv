import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import ContactUsView from 'components/ContactUs';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { changeInput, inputError, resetForm, sendForm } from './actions';
import { validateFields, validateOneField } from './helpers';
import reducer from './reducer';
import saga from './saga';
import { makeSelectContactUs } from './selectors';
import { ViewContainer } from './styledComponents';

const ContactUs = ({
  dispatchChangeInput,
  dispatchInputError,
  dispatchResetForm,
  dispatchSendForm,
  error,
  form,
  formErrors,
  loading,
  success,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact Us';
  }, []);

  const handleSendContact = () => {
    const { isValidated, validationErrors } = validateFields({ values: form });
    if (isValidated) {
      dispatchSendForm(form);
    } else {
      dispatchInputError({ errors: validationErrors, form });
    }
  };

  const handleValidateInput = ({ field, values }) => {
    const validationError = validateOneField({ field, values }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
    });
  };

  return (
    <ViewContainer>
      <ContactUsView
        dispatchChangeInput={dispatchChangeInput}
        dispatchResetForm={dispatchResetForm}
        error={error}
        form={form}
        formErrors={formErrors}
        handleSendContact={handleSendContact}
        handleValidateInput={handleValidateInput}
        loading={loading}
        success={success}
      />
    </ViewContainer>
  );
};

ContactUs.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchResetForm: T.func.isRequired,
  dispatchSendForm: T.func.isRequired,
  error: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  loading: T.bool.isRequired,
  success: T.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : ContactUs
   */
  error: makeSelectContactUs('error'),
  form: makeSelectContactUs('form'),
  formErrors: makeSelectContactUs('formErrors'),
  loading: makeSelectContactUs('loading'),
  success: makeSelectContactUs('success'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : ContactUs
   */
  dispatchChangeInput: payload => dispatch(changeInput(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchResetForm: () => dispatch(resetForm()),
  dispatchSendForm: payload => dispatch(sendForm(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'contactUs', reducer });
const withSaga = injectSaga({ key: 'contactUs', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(ContactUs),
);
