import styled from 'styled-components';

import { blueColor, blueGrayColor, whiteColor } from 'defaultStyleHelper';

import { mediaQueriesByDevice } from 'utils/breakpoints';

const { laptop } = mediaQueriesByDevice;

export const CompanyRecruitmentContainer = styled.div`
  color: ${blueColor};
  height: 100%;
  background-color: ${whiteColor};
  padding: 5rem 5rem 0;
  position: relative;
  z-index: 1;

  ${laptop} {
    padding: 5rem 0 0;
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
