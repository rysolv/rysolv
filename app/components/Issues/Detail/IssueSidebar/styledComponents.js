import styled from 'styled-components';

import { borderColor, detailFontSize, textColor } from 'defaultStyleHelper';

export const Divider = styled.div`
  border-bottom: 0.1rem solid ${borderColor};
  margin: 1rem 0;
  width: 100%;
`;

export const SidebarItem = styled.div`
  display: flex;
  padding: 0.5rem;
  width: 100%;
`;

export const StyledIssueSidebar = styled.div`
  background-color: white;
  border: 0.1rem solid ${borderColor};
  color: ${textColor};
  font-size: ${detailFontSize};
  margin-bottom: 1rem;
  max-width: 30rem;
  padding: 1rem;
`;
