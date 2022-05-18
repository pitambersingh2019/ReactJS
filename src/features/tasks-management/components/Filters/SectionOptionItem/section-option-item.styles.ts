import styled from "styled-components";

export const OptionItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 11px;
`;

export const Checkbox = styled.img`
  height: 16px;
  cursor: pointer;
`;

export const OptionItemLabel = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-inline-start: 8px;
  margin-top: 2px;
`;
