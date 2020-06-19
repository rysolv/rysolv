import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import { StyledVerified } from './styledComponents';

const defaultVerified = iconDictionary('verified');

class Verified extends React.PureComponent {
  render() {
    const { ...restProps } = this.props;
    return <StyledVerified {...restProps}>{defaultVerified}</StyledVerified>;
  }
}

export default Verified;
