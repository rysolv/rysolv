import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Coin } from 'components/base_ui';

import {
  cardHeaderFontSize,
  commentHeaderColor,
  defaultFontSize,
  fundingText,
  headerColor,
  headerFontSize,
  hoverLinkColor,
  subheaderFontSize,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const Amount = styled.h3`
  color: ${fundingText};
  font-size: ${cardHeaderFontSize};
  font-weight: 500;
  margin: 1rem 0;
  text-align: center;
`;

export const AmountSquare = styled.div`
  background-color: ${commentHeaderColor};
  border-radius: 0.3rem;
  padding: 1.6rem 2.4rem;
  text-align: left;
  width: 30%;

  ${mobile} {
    margin-bottom: 1rem;
    text-align: center;
    width: 100%;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const AmountTitle = styled.div`
  color: #586069;
  font-size: ${defaultFontSize};
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-transform: uppercase;
  word-wrap: break-word;
`;

export const AmountWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${mobile} {
    flex-direction: column;
  }
`;

export const ComponentContainer = styled.div`
  background: white;
  margin-left: 1rem;
  padding: 1rem 3rem 3rem;

  ${mobile} {
    margin: 2rem 0;
    padding: 2rem;
    width: 100%;
  }
`;

export const IconWrapper = styled.div`
  width: 3.6rem;

  svg {
    color: ${textColor};
    height: 3rem;
    width: 3rem;
  }
`;

export const ListContainer = styled.ul`
  align-items: center;
  background: white;
  border: 0.1rem solid #d5d5d5;
  display: table;
  margin: ${({ isOverview }) => (isOverview ? '1rem 0 0' : '0')};
  padding: 0;
  width: ${({ numberOfTables, shouldRenderOneTable }) =>
    numberOfTables > 1 && !shouldRenderOneTable
      ? `${100 / numberOfTables - 1}%`
      : '100%'};
`;

export const ListDetail = styled.div`
  align-items: center;
  color: ${hoverLinkColor};
  display: flex;
  flex: 100%;
`;

export const ListItemWrapper = styled.li`
  border-top: 0.1rem solid #d5d5d5;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  width: 100%;
`;

export const NumberWrapper = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-size: ${subheaderFontSize};
  font-weight: 700;
  padding: 1rem 2rem 1rem 0;
  white-space: nowrap;
`;

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${mobile} {
    margin: 0 1rem;
  }
`;

export const StatsHeader = styled.div`
  color: ${textColor};
  display: flex;
  font-size: ${headerFontSize};
  margin: 5rem 0 2rem 1rem;
  width: 100%;

  ${mobile} {
    margin: 2rem 0;
  }
`;

export const StyledCoin = styled(Coin)`
  align-items: center;

  svg {
    height: 1.2rem;
    margin: 0 0.3rem;
    width: 1.2rem;
  }
`;

export const StyledSubHeader = styled.h2`
  color: ${textColor};
  font-size: 1.8rem;
  font-weight: 300;
  margin-bottom: 4rem;
`;

export const StyledTitle = styled.h3`
  color: white;
  font-size: 1.8rem;
  font-weight: 500;
  margin: 0;
  padding: 1rem 0;
`;

export const StyledTitleLink = styled(Link)`
  color: white;
  font-size: 1.8rem;
  font-weight: 500;
  margin: 0;
  padding: 1rem 0;

  &:hover {
    color: white;
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const TableWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
`;

export const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
  background: ${headerColor};
  justify-content: space-between;
  width: 100%;

  svg {
    color: white;
  }
`;

export const Username = styled(Link)`
  font-size: ${defaultFontSize};
  font-weight: 500;
  padding-left: 1rem;

  &:hover {
    color: ${hoverLinkColor};
    text-decoration: underline;
  }
`;

export const ValueWrapper = styled.div`
  align-self: center;
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  font-weight: 500;
  padding-left: 1rem;
  white-space: nowrap;
`;
