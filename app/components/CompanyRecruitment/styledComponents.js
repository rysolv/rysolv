import styled, { css } from 'styled-components';

import {
  blueGrayColor,
  defaultFontSize,
  errorRed,
  whiteColor,
} from 'defaultStyleHelper';

const baseInputStyle = css`
  background: ${whiteColor};
  border-radius: 0.7rem;
  border: none;
  font-size: 1.6rem;
  font-weight: 400;
  height: ${({ height }) => height};
  line-height: 1.936rem;
  margin-top: 0.8rem;
  outline: none;
  overflow: hidden;
  padding: 1.6rem 2.4rem;
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 100%;
`;

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

export const ButtonWrapper = styled.div`
  margin-top: 4.8rem;
  text-align: center;
  width: 100%;
`;

export const CompanyRecruitmentContainer = styled.div`
  color: ${whiteColor};
  height: 100%;
  padding: 5rem 12rem 0;
  position: relative;
  z-index: 1;

  @media (max-width: 700px) {
    padding: 5rem 3rem 0;
  }

  @media (max-width: 370px) {
    padding: 0 3rem;
  }
`;

export const CompanyRecruitmentHeader = styled.div`
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 3.873rem;

  @media (max-width: 500px) {
    font-size: 2.8rem;
    line-height: 2.931rem;
  }

  @media (max-width: 370px) {
    font-size: 2.4rem;
    line-height: 2.431rem;
  }
`;

export const CompanyRecruitmentSubheader = styled.div`
  font-size: 2.4rem;
  font-weight: 400;
  line-height: 2.905rem;
  margin-top: 2rem;

  @media (max-width: 500px) {
    display: ${({ removeOnMobile }) => (removeOnMobile ? 'none' : 'block')};
    font-size: 2rem;
    line-height: 2.848rem;
  }

  @media (max-width: 370px) {
    font-size: 1.6rem;
    line-height: 2.348rem;
  }
`;

export const FormWrapper = styled.div`
  background: ${blueGrayColor};
  border-radius: 0.7rem;
  color: ${whiteColor};
  display: flex;
  height: auto;
  justify-content: center;
  margin: 5.6rem auto;
  max-width: 65rem;
  padding: 6.4rem;
  width: 60%;

  @media (max-width: 1242px) {
    width: 70%;
  }

  @media (max-width: 1192px) {
    width: 75%;
  }

  @media (max-width: 1092px) {
    width: 80%;
  }

  @media (max-width: 800px) {
    width: 100%;
  }

  @media (max-width: 500px) {
    padding: 2.6rem 2.8rem 5.052rem;
  }
`;

export const HeaderGroup = styled.div`
  margin-bottom: 3rem;
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

export const HeaderWrapper = styled.div`
  margin: auto;
  max-width: 85rem;
  width: 60%;

  @media (max-width: 1242px) {
    width: 70%;
  }

  @media (max-width: 1192px) {
    width: 75%;
  }

  @media (max-width: 1092px) {
    width: 80%;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const Input = styled.input`
  ${baseInputStyle};
`;

export const InputError = styled.div`
  color: ${errorRed};
  font-size: ${defaultFontSize};
  height: 2.4rem;
  padding: 0.5rem 0;
`;

export const InputLabel = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.936rem;
`;

export const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const RecruitmentFormContainer = styled.div`
  max-width: 58rem;
  width: 100%;
`;
