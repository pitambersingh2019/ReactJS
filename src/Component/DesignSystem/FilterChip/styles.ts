import styled from "styled-components";

export const ChipContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  height: 24px;
  padding: 0 8px;
  background-color: ${(props) => props.theme.colors.lightGray2};
  border-radius: 4px;
`;

export const Label = styled.div`
  font-size: 13px;
  color: #101010;
  cursor: pointer;
`;

export const CloseIcon = styled.img`
  height: 9px;
  cursor: pointer;
  margin-inline-start: 12px;
`;
