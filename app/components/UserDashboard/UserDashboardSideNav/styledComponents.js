import styled, { css } from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

import { PrimaryButton } from 'components/base_ui';
import {
  candidateGreyColor,
  darkBlueColor,
  errorRed,
  lightBlueColor,
  successGreen,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { tablet } = mediaQueriesByDevice;

const baseButtonStyle = css`
  align-items: center;
  border-radius: 0.8rem;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  margin: auto;
  text-transform: initial;
`;

const baseInputStyle = css`
  background: ${candidateGreyColor};
  border-radius: 0.7rem;
  border: none;
  color: ${textColor};
  font-size: 1.6rem;
  font-weight: 400;
  height: ${({ height, multiple }) => (multiple ? 'auto' : height)};
  line-height: 1.936rem;
  margin-top: 3.2rem;
  min-height: ${({ height, multiple }) => (multiple ? height : 'auto')};
  outline: none;
  overflow: hidden;
  padding: 1.6rem 2.4rem;
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 100%;
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
  border: 0.2rem solid ${candidateGreyColor};
  height: 25rem;
  width: 25rem;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  width: 100%;
`;

export const ActionWrapper = styled.div`
  ${baseInputStyle};
  max-width: 40rem;
`;

export const ActiveCircle = styled.div`
  color: ${({ $isActive }) => ($isActive ? successGreen : errorRed)};
  display: flex;
  font-size: 1.6rem;
  margin-right: 0.6rem;
`;

export const ActiveLabel = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  justify-content: space-between;
  line-height: 2.208rem;
  width: auto;
  color: #163486;
`;

export const ActiveText = styled.div`
  font-weight: 400;
  line-height: 1.936rem;
  color: #a9acae;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

export const ActiveLabelWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ActiveWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const IconButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: ${({ $hasLinks }) => ($hasLinks ? '1rem 0' : '0')};
`;

export const StyledIconButton = styled(IconButton)`
  background: #ecf3fc;
  border-radius: 50%;
  height: 3.4rem;
  padding: 0;
  width: 3.4rem;

  &:hover {
    background: transparent;
  }

  svg {
    color: ${lightBlueColor};
    height: 2.4rem;
    width: 2.4rem;
  }
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  ${baseButtonStyle};
  background-color: ${darkBlueColor};
  color: ${whiteColor};
  margin-top: 3rem;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;

export const SkillsWrapper = styled.div``;

export const UserDashboardSideNavContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: 4rem;

  ${tablet} {
    margin-bottom: 3rem;
    margin-left: 0;
  }
`;

export const UserProfileWrapper = styled.div``;
