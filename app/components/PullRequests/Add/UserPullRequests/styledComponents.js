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

export const AddContainer = styled.div`
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

export const IconContainer = styled.div`
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

export const PullNumberWrapper = styled.span`
  color: ${lightGreyColor};
`;

export const StyledLinkContainer = styled.div`
  display: inline;
  text-align: left;
  vertical-align: middle;
`;

export const StyledRepoBody = styled.div`
  width: 100%;
`;

export const StyledRepoHeader = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${detailFontSize};
  height: 2rem;
  padding: 0 1rem;
`;

export const StyledRepoTitle = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  padding: 0 1rem;
  width: 100%;

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }
`;

export const TextWrapper = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  margin: 2rem 0;
`;

export const UserPullRequestsContainer = styled.div`
  ${styledScrollbar}
  max-height: 22rem;
  overflow-y: auto;
  padding: 0 0 2rem 2rem;
`;
