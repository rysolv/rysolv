import styled from 'styled-components';

import { BaseLink } from 'components/base_ui';
import { navyBlueColor, whiteColor } from 'defaultStyleHelper';

export const ButtonLink = styled.a`
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.4rem;
  box-shadow: 0rem 0.4rem 0.4rem rgba(0, 0, 0, 0.2);
  color: ${whiteColor};
  display: flex;
  font-size: 1.6rem;
  height: 4rem;
  justify-content: center;
  width: 18.4rem;

  svg {
    color: ${whiteColor};
    height: 2.4rem;
    margin-right: 0.8rem;
    width: 2.4rem;
  }

  &:hover {
    color: ${whiteColor};
  }
`;

export const ExternalLink = styled.a`
  margin-left: 2.4rem;

  svg {
    color: ${whiteColor};
    height: 2.4rem;
    width: 2.4rem;
  }
`;

export const ExternalLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FooterContainer = styled.div`
  background: ${navyBlueColor};
  display: flex;
  height: 20rem;
  justify-content: space-between;
  padding: 4.8rem 12rem;
`;

export const InternalLink = styled(BaseLink)`
  color: ${whiteColor};
  font-size: 1.6rem;
  padding-bottom: 1.6rem;

  &:hover {
    color: ${whiteColor};
  }
`;

export const InternalLinkWrapper = styled.div`
  display: flex;
`;

export const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 9.8rem;
`;

export const LinkRow = styled.div`
  padding-top: 2.8rem;
  text-align: right;
`;
