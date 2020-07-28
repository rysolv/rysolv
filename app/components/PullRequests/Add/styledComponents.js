import styled from 'styled-components';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Link } from 'react-router-dom';

import { PrimaryAsyncButton, SecondaryButton } from 'components/base_ui';
import {
  defaultFontSize,
  dividerBorder,
  hoverLinkColor,
  lightBlueColor,
  lightGreyColor,
  successGreen,
  textColor,
} from 'defaultStyleHelper';

export const ButtonGroup = styled.div`
  text-align: right;
`;

export const Checkbox = styled.div`
  svg {
    background: ${({ hasError }) => (hasError ? '#31b589' : '#c62838')};
    border-radius: 0.2rem;
    color: white;
    display: flex;
    font-size: ${defaultFontSize};
  }
`;

export const Divider = styled.div`
  border-top: ${dividerBorder};
  margin: 0.5rem auto;
  width: 100%;
`;

export const ImportFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ImportUrlLabel = styled.div`
  padding-right: 1rem;
  width: 12.5rem;
`;

export const ImportUrlWrapper = styled.div`
  color: #6a737d;
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  padding: 2rem;
`;

export const PullRequestContainer = styled.div`
  width: 90%;
`;

export const PullRequestInfo = styled.div`
  padding: 0 1rem;
`;

export const PullNumberWrapper = styled.span`
  color: ${lightGreyColor};
`;

export const StatusWrapper = styled.span`
  text-transform: capitalize;
`;

export const StyledFormHelperText = styled(FormHelperText)`
  font-size: 1.2rem;
`;

export const StyledHeader = styled.h1`
  color: ${({ isSuccess }) => (isSuccess ? successGreen : textColor)};
  font-size: 1.8rem;
  font-weight: 500;
  margin: 0;
  min-width: 40rem;
  padding: 1rem 0;
  text-align: left;
`;

export const StyledItem = styled.div`
  color: ${textColor};
  display: flex;
  font-size: 1.2rem;
  margin: 1rem 0;
`;

export const StyledLabel = styled.div`
  align-self: center;
  color: ${lightGreyColor};
  font-size: 1.2rem;
  font-weight: 400;
  min-width: 10rem;
`;

export const StyledLink = styled(Link)`
  color: ${hoverLinkColor};

  &:hover {
    color: ${hoverLinkColor};
    text-decoration: underline;
  }
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  margin-right: 0;
  width: 8.05rem;
`;

export const StyledSecondayButton = styled(SecondaryButton)`
  background-color: white;
  border: 0.1rem solid ${lightBlueColor};
  color: ${lightBlueColor};

  &:hover {
    background-color: white;
  }
`;

export const StyledSubHeader = styled.div`
  color: ${lightGreyColor};
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
`;

export const StyledSuccessContent = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  line-height: 1.5;
  padding: 0 1rem;
`;

export const StyledTextareaAutosize = styled(TextareaAutosize)`
  color: ${textColor};
  height: auto !important;
  width: 100%;
`;

export const TextareaWrapper = styled.div`
  width: 100%;
`;
