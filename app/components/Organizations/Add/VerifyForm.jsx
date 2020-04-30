/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';
import omit from 'lodash/omit';

import { organizationDataDictionary } from 'containers/Organizations/constants';

import {
  DataWrapper,
  KeyAndValueContainer,
  KeyGroupWrapper,
  KeyWrapper,
  ValueWrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyForm extends React.PureComponent {
  render() {
    const { data } = this.props;
    const tempData = omit(data, ['importUrl', 'totalFunded', 'verified']);
    return (
      <DataWrapper>
        <KeyGroupWrapper>
          {Object.keys(tempData).map((key, index) => (
            <KeyAndValueContainer key={`verify-key-${key}-${index}`}>
              <KeyWrapper>{organizationDataDictionary[key]}:</KeyWrapper>
              <ValueWrapper>{tempData[key].value}</ValueWrapper>
            </KeyAndValueContainer>
          ))}
        </KeyGroupWrapper>
      </DataWrapper>
    );
  }
}

VerifyForm.propTypes = { data: T.object };

export default VerifyForm;
