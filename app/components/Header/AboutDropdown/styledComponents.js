import styled from 'styled-components';

import { DownArrow } from 'components/base_ui';

export const AboutContainer = styled.div`
  position: relative;

  @media (max-width: 630px) {
    display: none;
  }
`;

export const StyledDownArrow = styled(DownArrow)`
  margin: -0.8rem;

  svg {
    height: 3rem;
    margin-left: 0.5rem;
    margin-right: -0.5rem;
    width: 3rem;
  }
`;
