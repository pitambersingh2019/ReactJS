import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Checkbox = styled.img<{ isDisabled: boolean }>`
  height: 16px;
  cursor: ${(props) => (props.isDisabled ? "default" : "pointer")};
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-inline-start: 8px;
`;
