import React from 'react';
import styled from 'styled-components';

export const StyledCompanyCard = styled.div`
  border-radius: 0 0.5rem 0.5rem;
  border: 0.1rem solid grey;
  color: rgba(0, 0, 0, 0.7);
  width: 100%;
`;

export const StyledListItem = styled.li`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  justify-content: space-between;
  padding: 2rem 0;
`;

export const StyledImage = styled.img`
  height: 5rem;
  width: 5rem;
`;

export const ImageContainer = styled.div`
  align-self: center;
  text-align: center;
  width: 20%;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-grow: 8;
  flex-direction: column;
`;

export const NameWrapper = styled.div`
  font-size: 1.2rem;
`;

export const DescriptionWrapper = styled.div`
  padding: 1rem 0;
  font-size: 1rem;
`;

export const ButtonContainer = styled.div`
  align-self: right;
  /* display: flex; */
  /* flex: end; */
  padding: 1rem;
`;

export const Divider = styled(({ isLastItem, ...restProps }) => (
  <div {...restProps} />
))`
  border-bottom: ${({ isLastItem }) =>
    isLastItem ? 'none' : '0.1rem solid grey'};
  display: flex;
  margin: auto;
  width: 90%;
`;
