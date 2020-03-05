import React from 'react';
import T from 'prop-types';

import { PrimaryButton, PrimaryAsyncButton } from 'components/base_ui';

import { companyDataDictionary } from '../../../containers/Companies/constants';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyAdd extends React.PureComponent {
  render() {
    const { data, handleNav, handleIncrementStep } = this.props;
    return (
      <div>
        {Object.keys(data).map(item => (
          <div key={`verify-${item}`}>
            {companyDataDictionary[item]}:<div>{data[item].value}</div>
          </div>
        ))}
        <PrimaryButton
          label="Back"
          onClick={() => handleIncrementStep({ step: 2 })}
        />
        <PrimaryAsyncButton
          label="Save"
          onClick={() => handleNav({ subroute: 'companies', view: 'overview' })}
        />
      </div>
    );
  }
}

VerifyAdd.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  handleNav: T.func,
};

export default VerifyAdd;
