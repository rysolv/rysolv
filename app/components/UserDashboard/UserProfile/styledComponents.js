import styled from 'styled-components';
import { PrimaryButton } from 'components/base_ui';
import { blueColor, successGreen } from 'defaultStyleHelper';

import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, tablet } = mediaQueriesByDevice;

export const AddSkillButton = styled(PrimaryButton)`
  background: transparent;
  border: 0.2rem solid ${blueColor};
  color: ${blueColor};
  font-size: 1.4rem;
  text-transform: uppercase;

  &:hover {
    background: transparent;
  }
`;

export const ProfileDetailContainer = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ProfileDetailItem = styled.div`
  font-size: 2rem;
  margin: 2rem 0 1rem;
  padding: 0.5rem;
  width: 100%;
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 25rem;
  margin-bottom: 3rem;
  width: 25rem;

  ${tablet} {
    margin: 3rem 0;
  }

  ${mobile} {
    height: 15rem;
    margin: 3rem 0;
    width: 15rem;
  }
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  width: 100%;
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 0.2rem solid ${successGreen};
  color: ${successGreen};
  font-size: 1.4rem;
  margin: 0;
  text-transform: uppercase;
  width: 100%;

  &:hover {
    background: transparent;
  }
`;
