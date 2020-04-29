import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import React, { Fragment } from 'react';
import T from 'prop-types';
import { push } from 'connected-react-router';

import { PrimaryButton, SecondaryButton } from 'components/base_ui';
import EditExistingForm from 'components/Organizations/Edit/EditExistingForm';
import iconDictionary from 'utils/iconDictionary';

import { deleteCompany, incrementStep, inputChange } from '../actions';
import { makeSelectCompanies } from '../selectors';
import { ButtonGroup, StyledH3, StyledIconButton } from './styledComponents';

const DeleteIcon = iconDictionary('delete');

// eslint-disable-next-line react/prefer-stateless-function
export class EditExisting extends React.PureComponent {
  render() {
    const {
      editInfo,
      handleDeleteCompany,
      handleIncrementStep,
      handleInputChange,
      handleNav,
    } = this.props;
    const { id } = editInfo;
    const handleDelete = () => {
      handleDeleteCompany({ itemId: id.value });
      handleNav('/admin/organizations');
    };
    return (
      <Fragment>
        <StyledH3>Edit Organization Info</StyledH3>
        <StyledIconButton Icon={DeleteIcon} onClick={handleDelete} />
        <EditExistingForm
          editInfo={editInfo}
          handleInputChange={handleInputChange}
        />
        <ButtonGroup>
          <SecondaryButton
            label="Back"
            onClick={() => handleNav('/admin/organizations')}
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
  editInfo: T.object,
  handleDeleteCompany: T.func,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Organizations
   */
  editInfo: makeSelectCompanies('editInfo'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Organizations
     */
    handleDeleteCompany: payload => dispatch(deleteCompany(payload)),
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditExisting);
