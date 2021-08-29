/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop } = mediaQueriesByDevice;

export const CalendlyContainer = styled.div`
  height: 85rem;
  margin: ${({ isCompanyRecruitment }) => isCompanyRecruitment ? '5.6rem 0 0' : '5rem 0 0'};
  min-width: 32rem;
  text-align: center;

  iframe {
    background: white;
    border-radius: 0.8rem;
    border: 0.2rem solid white;
    height: 79.5rem;
    width: 64rem;
  }

  ${laptop} {
    margin: ${({ isCompanyRecruitment }) => isCompanyRecruitment ? '5.6rem 0 0' : '5rem 3rem 0'};
  }

  @media (max-width: 728px) {
    iframe {
      width: 100%;
    }
  }

  @media (max-width: 395px) {
    margin-left: ${({ isCompanyRecruitment }) => isCompanyRecruitment ? '-1rem' : '2rem'};
    margin-right: ${({ isCompanyRecruitment }) => isCompanyRecruitment ? '-1rem' : '2rem'};
  }

  @media (max-width: 370px) {
    margin: ${({ isCompanyRecruitment }) => isCompanyRecruitment ? '5.6rem -3rem 0' : '0'};

    iframe {
      border-radius: 0;
    }
  }
`;
