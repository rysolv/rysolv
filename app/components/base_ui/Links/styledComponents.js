import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { hoverLinkColor } from 'defaultStyleHelper';

const StyledLink = styled(Link)`
  color: ${hoverLinkColor};
`;

export default StyledLink;
