import styled from 'styled-components';

import { whiteColor } from 'defaultStyleHelper';

export const CompanyDashboardContainer = styled.div`
  background: ${whiteColor};
`;

export const HeaderImageLeftIcon = styled.div`
  svg {
    bottom: 20rem;
    left: -0.21rem;
    position: absolute;
  }

  @media (max-width: 1290px) {
    display: none;
  }
`;

export const HeaderImageRightIcon = styled.div`
  svg {
    position: absolute;
    right: 0;
    top: 21.9rem;
  }

  @media (max-width: 1200px) {
    svg {
      height: 50.3rem;
      width: auto;
    }
  }

  @media (max-width: 1100px) {
    svg {
      height: 45.3rem;
    }
  }

  @media (max-width: 1030px) {
    svg {
      top: 31.9rem;
    }
  }

  @media (max-width: 525px) {
    svg {
      height: 39.3rem;
    }
  }

  @media (max-width: 460px) {
    svg {
      height: 36.3rem;
    }
  }

  @media (max-width: 430px) {
    svg {
      height: 33.3rem;
    }
  }

  @media (max-width: 395px) {
    svg {
      height: 33.3rem;
      left: 1rem;
    }
  }

  @media (max-width: 345px) {
    svg {
      top: 33.9rem;
    }
  }
`;
