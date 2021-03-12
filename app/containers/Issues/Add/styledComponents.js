import styled from 'styled-components';
import FormHelperText from '@material-ui/core/FormHelperText';

import { ErrorSuccessBanner, LanguageWrapper } from 'components/base_ui';
import { TagWrapper } from 'components/Issues/styledComponents';

import {
  borderColor,
  cardHeaderFontSize,
  defaultFontSize,
  headerColor,
  headerFontSize,
  hoverLinkColor,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { desktop, desktopL, laptop, mobile, tablet } = mediaQueriesByDevice;

export const AddWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 2.5%;
  width: 100%;
`;

export const AddForm = styled.div`
  background-color: ${({ isVerify }) => (isVerify ? 'transparent' : 'white')};
  border-radius: ${({ isVerify }) => (isVerify ? '0' : '0.5rem')};
  border: ${({ isVerify }) =>
    isVerify ? 'none' : `0.1rem solid ${borderColor}`};
  padding: 1rem;
  width: 80%;

  ${desktopL} {
    width: 70%;
  }
  ${desktop} {
    width: 70%;
  }
  ${laptop} {
    width: 90%;
  }
  ${tablet} {
    width: 90%;
  }
  ${mobile} {
    width: 100%;
  }

  .MuiFormControl-root {
    margin: 0 1rem;
    width: 100%;
  }
`;

export const BackLink = styled.div`
  color: ${textColor};
  display: inline-flex;
  font-size: ${defaultFontSize};
  margin: 0 3rem;
  vertical-align: middle;

  :hover {
    color: ${hoverLinkColor};
    cursor: pointer;
  }
`;

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const LanguageContainer = styled.div`
  display: flex;
  margin: 0.5rem 1rem;
`;

export const LogoWrapper = styled.img`
  display: inline-flex;
  height: 5rem;
  margin: 0 1rem 0 0;
  width: 5rem;
`;

export const RepoName = styled.div`
  color: ${textColor};
  font-size: ${cardHeaderFontSize};
  margin: 0.5rem 0;
`;

export const RepoNameWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

export const SelectedRepo = styled.div`
  font-size: ${headerFontSize};
  margin: 0.5rem 0;
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  margin-bottom: 1rem;
  width: 80%;

  ${desktopL} {
    width: 70%;
  }
  ${desktop} {
    width: 70%;
  }
  ${laptop} {
    width: 90%;
  }
  ${tablet} {
    width: 90%;
  }
  ${mobile} {
    width: 100%;
  }
`;

export const StyledFocusDiv = styled.div`
  &:focus {
    outline: none;
  }
`;

export const StyledFormHelperText = styled(FormHelperText)`
  font-size: 1.2rem;
`;

export const StyledH3 = styled.h3`
  color: ${headerColor};
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
  padding: ${({ isFirstHeader }) =>
    isFirstHeader ? '0 0 1rem' : '2rem 0 1rem'};
`;

export const StyledLanguageWrapper = styled(LanguageWrapper)`
  margin-bottom: 0;
  margin-right: 1rem;
`;

export const StyledLink = styled.a`
  color: ${hoverLinkColor};
  font-size: ${defaultFontSize};

  &:hover {
    color: ${hoverLinkColor};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const StyledTagWrapper = styled(TagWrapper)`
  margin-bottom: 0;
  margin-right: 1rem;
  opacity: ${({ isTagSelected }) => (isTagSelected ? '1' : '0.5')};

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const Tag = styled.div`
  display: flex;
`;

export const TagContainer = styled.div`
  margin: 0.5rem 1rem;
`;

export const VerifyWrapper = styled.div`
  padding: 0 2rem;
`;
