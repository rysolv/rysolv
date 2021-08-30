/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const CalendlyContainer = styled.div`
  height: ${({ isCompanyRecruitment }) => isCompanyRecruitment ? '110.1rem' : '104.5rem'};
  margin: ${({ isCompanyRecruitment }) => isCompanyRecruitment ? '5.6rem 0 0' : '0'};
  min-width: 32rem;
  text-align: center;

  iframe {
    background: white;
    border-radius: 0.8rem;
    border: 0.2rem solid white;
    height: 104.5rem;
    width: 64rem;
  }

  @media (max-width: 888px) {
    iframe {
      width: ${({ isCompanyRecruitment }) => isCompanyRecruitment ? '100%' : '64rem'};
    }
  }

  @media (max-width: 728px) {
    iframe {
      width: 100%;
    }
  }

  @media (max-width: 395px) {
    margin: ${({ isCompanyRecruitment }) => isCompanyRecruitment ? '5.6rem -1rem 0' : '0'};
  }

  @media (max-width: 370px) {
    margin: ${({ isCompanyRecruitment }) => isCompanyRecruitment ? '5.6rem -3rem 0' : '0'};
  }
`;
