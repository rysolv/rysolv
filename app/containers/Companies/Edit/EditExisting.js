import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import React, { Fragment } from 'react';
import T from 'prop-types';
import { push } from 'connected-react-router';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';
import EditExistingForm from 'components/Companies/Edit/EditExistingForm';
import iconDictionary from 'utils/iconDictionary';

import { deleteCompany, incrementStep, inputChange } from '../actions';
import { makeSelectCompanies } from '../selectors';
import { ButtonGroup, StyledH3, StyledIconButton } from './styledComponents';

const DeleteIcon = iconDictionary('delete');

// eslint-disable-next-line react/prefer-stateless-function
export class EditExisting extends React.PureComponent {
  render() {
    const {
      companyInfo,
      handleDeleteCompany,
      handleIncrementStep,
      handleInputChange,
      handleNav,
    } = this.props;
    const { id } = companyInfo;
    const handleDelete = () => {
      handleDeleteCompany({ companyId: id.value });
      handleNav({ subroute: 'companies' });
    };
    return (
      <Fragment>
        <StyledH3>Edit Company Info</StyledH3>
        <StyledIconButton Icon={DeleteIcon} onClick={handleDelete} />
        <EditExistingForm
          companyInfo={companyInfo}
          handleInputChange={handleInputChange}
        />
        <ButtonGroup>
          <SecondaryButton
            label="Back"
            onClick={() => handleNav({ subroute: 'companies' })}
          />
          <PrimaryButton
            label="Next"
            onClick={() =>
              handleIncrementStep({ step: 2, view: 'editCompany' })
            }
          />
        </ButtonGroup>
      </Fragment>
    );
  }
}

EditExisting.propTypes = {
  companyInfo: T.object,
  handleDeleteCompany: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
  companyInfo: makeSelectCompanies('companyInfo'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Companies
     */
    handleDeleteCompany: payload => dispatch(deleteCompany(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
    /**
     * Reducer : Router
     */
    handleNav: ({ subroute }) => {
      dispatch(push(`/admin/${subroute}`));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditExisting);
