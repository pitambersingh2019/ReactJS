import styled from "styled-components";

export const ParameterCellContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: space-between;
  padding: 0 8px;
`;

export const Value = styled.div<{ isRequred: boolean }>`
  font-size: 14px;
  font-weight: ${(props) => (props.isRequred ? "bold" : "normal")};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: ${(props) => (props.theme.dir === "ltr" ? "left" : "right")};
  color: ${(props) => props.theme.colors.black};
  position: relative;
  cursor: default;
`;
