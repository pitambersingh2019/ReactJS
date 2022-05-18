import styled from "styled-components";

export const ComboContainer = styled.div`
  margin-top: 16px;
  background-color: ${(props) => props.theme.colors.lightGray2};
  padding: 8px 8px 24px;
  position: relative;
`;

export const DeleteIcon = styled.img`
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: 10px;
`;
