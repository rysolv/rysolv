import styled from 'styled-components';

import { textColor, defaultFontFamily, whiteColor } from 'defaultStyleHelper';
import { PrimaryButton } from 'components/base_ui';

export const BannerSubtitle = styled.div`
  font-size: 1.6rem;
  margin-top: 1rem;
`;
export const BannerTitle = styled.div`
  font-size: 2.4rem;
`;
export const HiringBanner = styled.div`
  background-color: #2b2b2b;
  border-radius: 1rem;
  color: white;
  margin-top: 4rem;
  padding: 2rem 3rem;
  width: 100%;
`;

export const HiringHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 20rem;
  justify-content: space-evenly;
  width: 100%;
`;

export const MessageButton = styled.div`
  align-items: center;
  border-radius: 0.5rem;
  border: 2px solid ${textColor};
  display: flex;
  font-size: 2rem;
  height: 3rem;
  justify-content: center;
  padding: 1rem auto;
`;

export const MessageContainer = styled.div`
  color: ${textColor};
  font-style: ${defaultFontFamily};
  padding: 2rem;
  width: 33%;
`;
export const MessageHeader = styled.div`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  background: #2b2b2b;
  border: 0.2rem solid ${whiteColor};
  color: ${whiteColor};
  font-size: 1.6rem;
  margin: 0 0 0 2.4rem;
  text-transform: none;
  width: 14rem;
  padding: 0.5rem;

  &:hover {
    background: #2b2b2b;
  }

  @media (max-width: 992px) {
    font-size: 1.376rem;
  }

  @media (max-width: 460px) {
    margin: 2.4rem 0 0;
    width: 19.7rem;
  }
`;

export const HiringBannerButtons = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 2rem;
  align-items: center;
`;

export const StyledHiringLink = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: gray;

  :hover {
    cursor: pointer;
    color: #b7b5b5;
  }
`;
