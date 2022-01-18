import styled, { css } from 'styled-components';

import {
  blueColor,
  candidateGreyColor,
  lightBlueColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

const baseLabelStyle = css`
  color: ${blueColor};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.9rem;
  margin-right: 1.6rem;
`;

const baseTextStyle = css`
  color: ${textColor};
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.936rem;
`;

export const ContentContainer = styled.div`
  ${baseTextStyle};
  background: ${({ hasBackground }) =>
    hasBackground ? candidateGreyColor : whiteColor};
  border-radius: 0.7rem;
  padding: 0 2.4rem 1.6rem;
  transform: matrix(1, 0, 0, 1, 0, 0);
`;

export const ContentLabel = styled.div`
  ${baseLabelStyle};
`;

export const ContentLabelWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Description = styled.div`
  min-height: 4rem;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;

  * {
    color: ${textColor};
    font-family: inherit;
    max-width: 100%;
  }

  a {
    color: ${lightBlueColor};
  }
`;

export const HorizontalDivider = styled.div`
  border-bottom-width: 0;
  border-color: #e1e2e3;
  border-style: dashed;
  border-top-width: 0.2rem;
  flex-grow: 1;
  margin: 0.4rem 0 1.6rem;
`;

export const Label = styled.div`
  ${baseLabelStyle};
  margin-bottom: 0.4rem;
`;

export const LabelValueGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const LabelValueWrapper = styled.div`
  margin-right: 0.6rem;
  padding-top: 1.6rem;
  width: ${({ width }) => width || '32%'};

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const Logo = styled.img`
  border-radius: 50%;
  border: 0.2rem solid ${candidateGreyColor};
  height: 7.5rem;
  margin-right: 0.8rem;
  object-fit: cover;
  width: 7.5rem;
`;

export const NameWrapper = styled.div``;

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
  align-items: center;
  color: ${blueColor};
  display: flex;
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  padding: 2rem 0;
`;

export const Value = styled.div`
  margin-top: 0.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: ${({ allowWrap }) => (allowWrap ? 'normal' : 'nowrap')};

  a {
    color: ${lightBlueColor};
  }
`;
