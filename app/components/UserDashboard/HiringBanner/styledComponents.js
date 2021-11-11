import styled from 'styled-components';

import { navyBlueColor, whiteColor } from 'defaultStyleHelper';
import { PrimaryButton } from 'components/base_ui';

export const BannerSubtitle = styled.div`
  font-size: 1.6rem;
  margin-top: 1rem;
`;

export const BannerTitle = styled.div`
  font-size: 2.4rem;
`;

export const HiringBannerButtons = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 2rem;
  align-items: center;
`;

export const StyledHiringBanner = styled.div`
  background-color: ${navyBlueColor};
  border-radius: 1rem;
  color: white;
  padding: 2rem 3rem;
  width: 100%;
`;

export const StyledHiringLink = styled.div`
  color: gray;
  font-size: 1.6rem;
  font-weight: 600;

  :hover {
    cursor: pointer;
    color: #b7b5b5;
  }
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  background: ${navyBlueColor};
  border: 0.2rem solid ${whiteColor};
  color: ${whiteColor};
  font-size: 1.6rem;
  margin: 0 0 0 2.4rem;
  text-transform: none;
  width: 14rem;
  padding: 0.5rem;

  &:hover {
    background: ${navyBlueColor};
  }
`;
