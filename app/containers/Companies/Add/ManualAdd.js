import React from 'react';
import T from 'prop-types';

import AddCompanyForm from 'components/Companies/AddCompanyView/AddCompanyForm';

// eslint-disable-next-line react/prefer-stateless-function
export class ManualAdd extends React.PureComponent {
  render() {
    const {
      data,
      handleIncrementStep,
      handleInputChange,
      isDisabled,
    } = this.props;
    return (
      <AddCompanyForm
        data={data}
        handleIncrementStep={handleIncrementStep}
        handleInputChange={handleInputChange}
        isDisabled={isDisabled}
      />
    );
  }
}

ManualAdd.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  isDisabled: T.bool,
  handleInputChange: T.func,
};

export default ManualAdd;
