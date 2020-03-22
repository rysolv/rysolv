import React from 'react';
import T from 'prop-types';

import { companyDataDictionary } from '../../../containers/Companies/constants';
import {
  DataWrapper,
  KeyAndValueContainer,
  KeyGroupWrapper,
  KeyWrapper,
  ValueWrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyExistingForm extends React.PureComponent {
  render() {
    const { companyInfo } = this.props;
    const tempCompanyInfo = { ...companyInfo };
    delete tempCompanyInfo.id;
    return (
      <DataWrapper>
        <KeyGroupWrapper>
          {Object.keys(tempCompanyInfo).map(key => (
            <KeyAndValueContainer>
              <KeyWrapper>{companyDataDictionary[key]}:</KeyWrapper>
              <ValueWrapper>{tempCompanyInfo[key].value}</ValueWrapper>
            </KeyAndValueContainer>
          ))}
        </KeyGroupWrapper>
      </DataWrapper>
    );
  }
}

VerifyExistingForm.propTypes = { companyInfo: T.object };

export default VerifyExistingForm;
