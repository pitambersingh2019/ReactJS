import styled from "styled-components";

export const StyledItemContainer = styled.div`
  display: flex;
  margin-bottom: 13px;
  align-items: center;
`;

export const StyledCheckbox = styled.img<{ checkboxDisabled: boolean }>`
  height: 13px;
  cursor: ${(props) => (props.checkboxDisabled ? "not-allowed" : "pointer")};
  margin-bottom: 6px;
`;

export const StyledText = styled.div<{ isCrossed: boolean }>`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: #101010;
  margin-inline-start: 8px;
  text-decoration: ${(props) => (props.isCrossed ? "line-through" : "none")};
`;

export const StyledPencil = styled.img<{ isVisible: boolean }>`
  height: 10px;
  cursor: pointer;
  margin-inline-start: 10px;
  display: ${(props) => (props.isVisible ? "block" : "none")};
`;
