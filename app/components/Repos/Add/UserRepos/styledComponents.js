import styled from 'styled-components';

import {
  borderColor,
  defaultFontSize,
  detailFontSize,
  hoverGreen,
  hoverLinkColor,
  lightGreyColor,
  styledScrollbar,
  successGreen,
  textColor,
} from 'defaultStyleHelper';

export const AddIconWrapper = styled.div`
  place-self: center;

  svg {
    color: ${({ disabled }) => (disabled ? lightGreyColor : successGreen)};
    font-size: 3rem;

    &:hover {
      color: ${({ disabled }) => (disabled ? lightGreyColor : hoverGreen)};
      cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
    }
  }
`;

export const IconWrapper = styled.div`
  display: inline;
  margin: 0 0.5rem 0 0;
`;

export const ImportCardWrapper = styled.li`
  border-radius: 0.5rem;
  border: 0.1rem solid ${borderColor};
  display: flex;
  list-style-type: none;
  margin: 0.5rem;
  padding: 0.25rem 0;
`;

export const StyledBody = styled.div`
  width: 100%;
`;

export const StyledHeader = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${detailFontSize};
  height: 2rem;
  padding: 0 1rem;
  width: 100%;
`;

export const StyledLink = styled.div`
  display: inline;
  text-align: left;
  vertical-align: middle;
`;

export const StyledTitle = styled.div`
  align-self: flex-start;
  display: flex;
  font-size: ${defaultFontSize};
  line-height: normal;
  padding-left: 1rem;
  width: 100%;

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }
`;

export const TextWrapper = styled.div`
  font-size: 1.6rem;
  margin-top: 2rem;
`;

export const UserReposContainer = styled.div`
  ${styledScrollbar}
  max-height: 75rem;
  overflow-y: auto;
  text-align: center;
`;
