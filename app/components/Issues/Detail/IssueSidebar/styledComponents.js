import styled from 'styled-components';
import { borderColor, detailFontSize, textColor } from 'defaultStyleHelper';

export const StyledIssueSidebar = styled.div`
  background-color: white;
  border: 0.1rem solid ${borderColor};
  width: 100%;
  padding: 1rem;
  color: ${textColor};
  font-size: ${detailFontSize};
`;

export const SidebarItem = styled.div`
  width: 100%;
  display: flex;
  padding: 0.5rem;
`;
export const Divider = styled.div`
  width: 100%;
  margin: 1rem 0;
  border-bottom: 0.1rem solid ${borderColor};
`;
