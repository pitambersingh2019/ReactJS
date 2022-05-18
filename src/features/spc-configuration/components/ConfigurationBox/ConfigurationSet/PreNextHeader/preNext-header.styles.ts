import styled from "styled-components";

export const StyledPreNext = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  margin-bottom: 17px;
`;

export const StyledPreNextButton = styled.div<{ disabled: boolean }>`
  display: flex;
  align-item: center;
  justify-content: center;
  cursor: pointer;
  color: ${(p) => (p.disabled ? "#b9bec6" : "#404d61")};
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`;

export const StyledPreNextText = styled.div`
  font-size: 14px;
`;
