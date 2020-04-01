import React from 'react';
import T from 'prop-types';
import omit from 'lodash/omit';

import { userDataDictionary } from 'containers/Users/constants';

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
    const { editInfo } = this.props;
    const tempEditInfo = omit(editInfo, ['id', 'createdDate']);
    return (
      <DataWrapper>
        <KeyGroupWrapper>
          {Object.keys(tempEditInfo).map(key => (
            <KeyAndValueContainer key={`container-${key}`}>
              <KeyWrapper>{userDataDictionary[key]}:</KeyWrapper>
              <ValueWrapper>
                {Array.isArray(tempEditInfo[key].value)
                  ? tempEditInfo[key].value.length
                  : tempEditInfo[key].value}
              </ValueWrapper>
            </KeyAndValueContainer>
          ))}
        </KeyGroupWrapper>
      </DataWrapper>
    );
  }
}

VerifyExistingForm.propTypes = { editInfo: T.object };

export default VerifyExistingForm;
