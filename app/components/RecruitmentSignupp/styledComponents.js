import styled from 'styled-components';

export const BackgroundHollowCircleBottomIcon = styled.div`
  svg {
    left: -6.4rem;
    position: absolute;
    top: 382.4rem;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const BackgroundHollowCircleTopIcon = styled.div`
  svg {
    left: 92rem;
    position: absolute;
    top: 249.9rem;
  }
`;

export const BackgroundSolidCircleIcon = styled.div`
  svg {
    left: 50%;
    position: absolute;
    top: 95.7rem;
    transform: translateX(-50%);
  }

  @media (max-width: 1200px) {
    svg {
      top: 208.9rem;
    }
  }

  @media (max-width: 1030px) {
    svg {
      top: 220.9rem;
    }
  }

  @media (max-width: 860px) {
    svg {
      display: none;
    }
  }
`;

export const HeaderImageLeftIcon = styled.div`
  svg {
    left: -0.21rem;
    position: absolute;
    top: 66.1rem;
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

export const LandingContainer = styled.div`
  height: 100%;
  padding: 18.4rem 12rem 0;
  position: relative;
  z-index: 1;

  @media (max-width: 700px) {
    padding: 18.4rem 3rem 0;
  }
`;
