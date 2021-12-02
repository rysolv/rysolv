import styled from 'styled-components';

import { BaseLink } from 'components/base_ui';
import { blueColor } from 'defaultStyleHelper';

export const InternalLink = styled(BaseLink)`
  color: ${blueColor};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.9rem;
  padding-bottom: 2.2rem;

  &:hover {
    color: ${blueColor};
  }
`;

export const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 27.8rem;
  padding: 2rem 0 1rem;
`;
