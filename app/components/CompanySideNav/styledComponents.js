import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

import { IconButton as BaseIconButton } from 'components/base_ui';
import {
  blueColor,
  candidateGreyColor,
  lightBlueColor,
  whiteColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { tablet } = mediaQueriesByDevice;

export const ButtonTextWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: auto;
`;

export const CompanySideNavContainer = styled.div`
  min-width: 27.8rem;
  overflow-y: auto;

  @media (max-width: 769px) {
    height: auto;
  }
`;

export const CompanySideNavHeader = styled.div`
  color: ${blueColor};
  display: flex;
  font-size: 3.2rem;
  font-weight: 700;
  justify-content: space-between;
  line-height: 3.36rem;
  padding: 2rem 2rem 0 0;
`;

export const CreatePositionButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  color: ${lightBlueColor};
  display: flex;
  font-size: 1.6rem;
  margin: 1rem 2rem 2rem 0;
  padding: 0;

  &:hover {
    cursor: pointer;
  }

  svg {
    font-size: 2rem;
    margin-right: 0.8rem;
  }
`;

export const LocationText = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  padding-top: 0.5rem;
  text-transform: capitalize;
`;

export const PositionButton = styled.button`
  background-color: ${({ isSelected }) =>
    isSelected ? blueColor : whiteColor};
  border: none;
  color: ${({ isSelected }) => (isSelected ? whiteColor : blueColor)};
  display: flex;
  font-family: monospace;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.025rem;
  line-height: 1.936rem;
  padding: 2rem;
  text-align: left;
  width: 100%;

  &:hover {
    background-color: ${blueColor};
    color: ${whiteColor};
    cursor: pointer;
  }

  svg {
    font-size: 1.6rem;
    margin-right: 0.8rem;
  }

  ${tablet} {
    border-bottom-left-radius: ${({ isLast }) => (isLast ? '0.7rem' : '0')};
    border-bottom-right-radius: ${({ isLast }) => (isLast ? '0.7rem' : '0')};
  }
`;

export const PositionTitle = styled.span`
  text-transform: capitalize;
`;

export const StyledEditButton = styled(IconButton)`
  align-self: center;
  display: flex;
  margin-left: 1.6rem;
  padding: 0;

  &:hover {
    background: transparent;
  }

  svg {
    color: ${blueColor};
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledIconButton = styled(BaseIconButton)`
  &:hover {
    background: transparent;
  }

  svg {
    color: ${blueColor};
    height: 3.2rem;
    width: 3.2rem;
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

export const CompanyProfileContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  max-width: 28.1rem;
  place-items: center;
`;

export const NameWrapper = styled.div`
  color: ${blueColor};
  display: flex;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3.45rem;
`;
