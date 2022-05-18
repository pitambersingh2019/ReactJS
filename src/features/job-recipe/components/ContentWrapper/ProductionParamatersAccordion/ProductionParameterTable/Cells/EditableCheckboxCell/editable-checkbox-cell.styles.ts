import styled from "styled-components";

export const EditableCheckboxCellContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ValueContainer = styled.div<{ isEditing: boolean }>`
  height: 40px;
  display: flex;
  align-items: center;
  padding-inline-start: 9px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 4px;
  border: ${(props) =>
    props.isEditing ? `solid 1px ${props.theme.colors.gray2}` : "none"};
  margin: 2px 0;
`;

export const ReferenceValue = styled.div`
  background-color: ${(props) => props.theme.colors.lightGray4};
  height: 32px;
  display: flex;
  align-items: center;
  padding-inline-start: 9px;
`;
