/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { userDataDictionary } from 'containers/Users/constants';

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
    return (
      <DataWrapper>
        <KeyGroupWrapper>
          {Object.keys(data).map((key, index) => (
            <KeyAndValueContainer key={`verify-key-${key}-${index}`}>
              <KeyWrapper>{userDataDictionary[key]}:</KeyWrapper>
              <ValueWrapper>{data[key].value}</ValueWrapper>
            </KeyAndValueContainer>
          ))}
        </KeyGroupWrapper>
      </DataWrapper>
    );
  }
}

VerifyForm.propTypes = { data: T.object };

export default VerifyForm;
