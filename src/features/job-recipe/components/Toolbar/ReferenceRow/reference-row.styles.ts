import styled from "styled-components";

export const ReferenceRowContainer = styled.div<{ showReference: boolean }>`
  display: flex;
  border-radius: 4px;
  background-color: ${(props) =>
    props.showReference
      ? props.theme.colors.lightGray4
      : props.theme.colors.lightGray1};
  height: 32px;
  margin-top: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray3};
  margin-inline-end: 8px;
`;

export const ToggleContainer = styled.div`
  margin-bottom: -7px; //overrides Angular styles
`;
