import styled from "styled-components";

export const TableRowContainer = styled.tr`
  background-color: ${(props) => props.theme.colors.white};
  position: relative;

  &:hover {
    background-color: #f4f2ff;
  }
`;

export const IconWrapper = styled.td`
  position: absolute;
  right: 8px;
`;

export const DownloadIcon = styled.img`
  height: 28px;
  cursor: pointer;
`;
