import styled from 'styled-components';

import { BaseTextInput } from 'components/base_ui';
import { lightBlueColor, textColor } from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile, laptop } = mediaQueriesByDevice;

export const DetailViewContainer = styled.div`
  color: ${textColor};
  display: flex;

  ${mobile} {
    flex-direction: column;
  }
`;

export const EditUserImageWrapper = styled.div`
  align-self: center;
  position: relative;
`;

export const IconButtonGroup = styled.div`
  display: flex;
`;

export const InputIconGroup = styled.label`
  align-items: center;
  background-color: white;
  border-radius: 2rem;
  border: 0.2rem solid ${lightBlueColor};
  bottom: -1rem;
  color: ${lightBlueColor};
  display: flex;
  height: 4rem;
  justify-content: center;
  padding: 1rem 0;
  position: absolute;
  right: -1rem;
  width: auto;

  &:hover {
    background-color: white;
    cursor: pointer;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const LinkIcon = styled.div`
  padding-right: 0.5rem;

  svg {
    height: 1.8rem;
    width: 1.8rem;
  }
`;

export const Name = styled.div`
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
`;

export const OneLink = styled.div`
  align-items: center;
  display: flex;
`;

export const OneLinkWrapper = styled.div`
  align-items: center;
  display: flex;
  padding: 0.5rem 0;
  justify-content: space-between;
`;

export const Rep = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  margin: 0.5rem 0 0.5rem 0.5rem;
`;

export const StyledA = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledBaseTextInput = styled(BaseTextInput)`
  margin: 0;
`;

export const UserCardWrapper = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding-right: 5rem;
  width: fit-content;

  ${laptop} {
    display: ${({ displayBottom }) => (displayBottom ? 'none' : 'flex')};
    padding-right: 0;
    width: 100%;
  }
`;

export const UserImage = styled.img`
  height: 25rem;
  margin-bottom: 0.5rem;
  object-fit: cover;
  width: 25rem;

  ${mobile} {
    align-self: center;
  }
`;
