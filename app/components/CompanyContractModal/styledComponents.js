import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import {
  darkBlueColor,
  defaultFontFamily,
  lightBlueColor,
  lightGreyColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';
import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobileS } = mediaQueriesByDevice;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CheckboxWrapper = styled.div`
  margin: 3rem 0;
  text-align: left;

  .PrivateSwitchBase-root-1 {
    margin: 0 0.8rem 0.25rem 0;
    padding: 0;
  }

  svg {
    color: ${lightBlueColor};
    height: 2.4rem;
    width: 2.4rem;
  }
`;

export const ContentGroup = styled.div`
  align-self: center;
  font-size: 1.6rem;
  line-height: 2.4rem;
  max-width: 50rem;
`;

export const DescriptionWrapper = styled.div`
  color: ${lightGreyColor};
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem 0;
  text-align: left;
`;

export const HorizontalDivider = styled.div`
  background: ${whiteColor};
  border-bottom: 0.1rem solid rgb(211 211 211 / 70%);
  height: 0.1rem;
  margin: 1.5rem 0;
`;

export const LegalTextWrapper = styled.div`
  margin-top: ${({ isFirst }) => (isFirst ? '1rem' : '2rem')};
  text-align: justify;
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

export const Subtitle = styled.div`
  color: ${lightGreyColor};
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem 0;
`;

export const Title = styled.div`
  color: ${darkBlueColor};
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.36rem;
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
