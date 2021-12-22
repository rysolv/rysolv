import styled from 'styled-components';

import { BaseLink } from 'components/base_ui';
import { blueColor } from 'defaultStyleHelper';

export const InternalLink = styled(BaseLink)`
  color: ${blueColor};
  font-size: 1.6rem;
  font-weight: ${({ selected }) => (selected ? '700' : '500')};
  line-height: 1.9rem;
  padding-bottom: 2.2rem;

  &:hover {
    color: ${blueColor};
  }
`;

export const SideNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 28rem;
  padding: 2rem 0 1rem;
`;
