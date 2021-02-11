import React from 'react';
import styled from 'styled-components';

import { PrimaryAsyncButton, SecondaryButton } from 'components/base_ui';
import { defaultFontSize, lightBlueColor, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

export const JobsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;

  ${mobile} {
    margin: 0 1rem;
  }
`;

export const JobsHeader = styled.div`
  margin: 5rem 0 2rem 0;
  width: 100%;

  ${mobile} {
    margin: 2rem 0;
  }
`;

export const SurveryContainer = styled.div`
  background: white;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  justify-content: space-between;
  min-height: 50rem;
  padding: 3.8rem 2.6rem;
  text-align: center;
  width: 100%;
`;

export const QuestionWrapper = styled.div`
  color: ${textColor};
  font-size: 2.6rem;
  font-weight: 500;
`;

export const DescriptionWrapper = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem;
`;

export const ButtonGroup = styled.div`
  align-self: center;
  display: flex;
`;

export const StyledPrimaryAsyncButton = styled(
  ({ shouldDisplaySubmit, ...restProps }) => (
    <PrimaryAsyncButton {...restProps} />
  ),
)`
  align-self: center;
  display: ${({ shouldDisplaySubmit }) =>
    shouldDisplaySubmit ? 'inherit' : 'none'};
`;

export const StyledSecondaryButton = styled(
  ({ shouldDisplayBack, ...restProps }) => <SecondaryButton {...restProps} />,
)`
  background-color: white;
  border: 0.1rem solid ${lightBlueColor};
  color: ${lightBlueColor};
  display: ${({ shouldDisplayBack }) =>
    shouldDisplayBack ? 'inherit' : 'none'};

  &:hover {
    background-color: white;
  }
`;

export const OptionWrapper = styled.div`
  margin: 5rem auto;
`;
