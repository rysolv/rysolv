import styled from 'styled-components';

import { BaseLink, PrimaryButton, SecondaryButton } from 'components/base_ui';
import { blueColor, darkBlueColor, whiteColor } from 'defaultStyleHelper';

export const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const DesktopHeaderContainer = styled.div`
  background: ${blueColor};
  display: flex;
  justify-content: space-between;
  padding: 4rem 12rem;
`;

export const InternalLink = styled(BaseLink)`
  color: ${whiteColor};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.9rem;
  padding-right: 2.2rem;

  &:hover {
    color: ${whiteColor};
  }
`;

export const Logo = styled.div`
  background: white;
  border-radius: 50%;
  height: 4rem;
  margin-right: 1rem;
  text-align: center;
  width: 4rem;

  svg {
    height: 100%;
    width: 3rem;
  }
`;

export const LogoWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  background: ${darkBlueColor};
  border: 0.2rem solid ${whiteColor};
  color: ${whiteColor};
  font-size: 1.6rem;
  font-weight: 700;
  height: 4rem;
  text-transform: none;
  width: 10.7rem;

  &:hover {
    background: ${darkBlueColor};
  }
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  background: ${whiteColor};
  color: ${darkBlueColor};
  font-size: 1.6rem;
  font-weight: 700;
  height: 4rem;
  text-transform: none;
  width: 10.7rem;

  &:hover {
    background: ${whiteColor};
  }
`;

export const VerticalDivider = styled.div`
  background: ${whiteColor};
  border: 0.2rem solid ${whiteColor};
  height: 0rem;
  transform: rotate(90deg);
  width: 2.1rem;
`;

export const Wordmark = styled.div`
  svg {
    height: 3rem;
    width: auto;
  }
`;
