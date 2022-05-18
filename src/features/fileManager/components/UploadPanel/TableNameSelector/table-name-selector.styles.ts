import styled from "styled-components";

export const TableNameSelectorContainer = styled.div``;

export const TopRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SelectorLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray3};
`;

export const ViewMappingButton = styled.div<{ isDisabled: boolean }>`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) =>
    props.isDisabled ? "#bcade5" : props.theme.colors.purple};
  cursor: ${(props) => (props.isDisabled ? "default" : "pointer")};
`;
