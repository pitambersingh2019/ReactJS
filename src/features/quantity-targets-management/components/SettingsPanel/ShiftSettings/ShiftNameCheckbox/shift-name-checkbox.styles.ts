import styled from "styled-components";

export const ShiftNameCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Checkbox = styled.img`
  height: 16px;
  cursor: pointer;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-inline-start: 8px;
`;
