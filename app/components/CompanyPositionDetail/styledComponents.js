import styled from 'styled-components';

import { blueColor } from 'defaultStyleHelper';

export const ContentLabel = styled.div`
  color: ${blueColor};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.9rem;
  margin-right: 1.6rem;
`;

export const ContentLabelWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const HorizontalDivider = styled.div`
  border-bottom-width: 0;
  border-color: #e1e2e3;
  border-style: dashed;
  border-top-width: 0.2rem;
  flex-grow: 1;
  margin: 0.4rem 0 1.6rem;
`;

export const PositionDetailContainer = styled.div`
  width: 100%;
`;

export const PositionDetailContent = styled.div`
  margin-top: ${({ $isFirst }) => ($isFirst ? '1.8rem' : '4.2rem')};

  @media (max-width: 769px) {
    margin-top: ${({ $isFirst }) => ($isFirst ? '1rem' : '3.4rem')};
  }
`;

export const PositionDetailHeader = styled.div`
  color: ${blueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  padding: 2rem 0;
`;
