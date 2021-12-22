import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import {
  darkBlueColor,
  defaultFontFamily,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobileS } = mediaQueriesByDevice;

export const ContentGroup = styled.div`
  align-self: center;
  padding: 4rem 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const QuestionWrapper = styled.div`
  color: ${darkBlueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  margin-bottom: 0.8rem;
`;

export const StyledButton = styled(Button)`
  color: ${darkBlueColor};
  font-family: ${defaultFontFamily};
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0;
  padding: 0rem;
  text-transform: none;

  &:hover {
    background-color: transparent;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }

  ${mobileS} {
    justify-content: start;
  }
`;

export const ViewContainer = styled.div`
  background: ${whiteColor};
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  justify-content: space-between;
  padding: 3rem;
  text-align: center;
  width: 100%;
`;
