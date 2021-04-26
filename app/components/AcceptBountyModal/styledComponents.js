import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { SecondaryButton } from 'components/base_ui';
import {
  buttonGrey,
  defaultFontSize,
  hoverLinkColor,
  textColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobileXS } = mediaQueriesByDevice;

export const AcceptBountyContainer = styled.div`
  padding: 2rem;
`;

export const AcceptButton = styled(SecondaryButton)``;

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const StyledBodyMessage = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  padding: 1rem 2rem 2rem;
  text-align: justify;
`;

export const StyledLink = styled(Link)`
  color: ${hoverLinkColor};

  &:hover {
    color: ${hoverLinkColor};
    text-decoration: underline;
  }
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  background-color: ${buttonGrey};

  &:hover {
    background-color: ${buttonGrey};
  }

  ${mobileXS} {
    min-width: 13.8rem;
  }
`;

export const StyledTitle = styled.h3`
  color: ${textColor};
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0;
  text-align: center;
`;
