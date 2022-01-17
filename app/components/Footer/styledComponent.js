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

export const ComponentContainer = styled.div`
  background: ${navyBlueColor};
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

  @media (max-width: 888px) {
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 3.935rem;
  }

  @media (max-width: 445px) {
    flex-direction: column;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 140rem;
  min-height: 20rem;
  padding: 4.8rem 12rem;

  @media (max-width: 888px) {
    flex-direction: column-reverse;
  }

  @media (max-width: 595px) {
    padding: 3.335rem 5.1rem 4.8rem;
  }
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

  @media (max-width: 888px) {
    justify-content: space-between;
  }

  @media (max-width: 595px) {
    flex-direction: column;
  }
`;

export const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 9.8rem;

  @media (max-width: 888px) {
    padding-right: 0;
  }
`;

export const LinkRow = styled.div`
  padding-top: 2.8rem;
  text-align: right;

  @media (max-width: 888px) {
    padding-top: 0;
  }

  @media (max-width: 445px) {
    padding-top: 2.8rem;
  }
`;
