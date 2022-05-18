import styled from "styled-components";

export const CheckBoxWrapper = styled.div<{ editing: boolean }>`
  border: 1px solid ${(props) => (props.editing ? "#6c7481" : "#ffffff")};
  border-radius: 4px;
  width: 100%;
  height: 100%;
  padding: 7px 3px;
`;
