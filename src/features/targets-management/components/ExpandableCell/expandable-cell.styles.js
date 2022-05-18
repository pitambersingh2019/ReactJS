import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;

  & span {
    padding-left: ${({ theme: { dir }, row }) =>
      dir === "rtl" ? 0 : row.canExpand ? "0.5rem" : "3rem"};
    padding-right: ${({ theme: { dir }, row }) =>
      dir === "rtl" ? (row.canExpand ? "0.5rem" : "3rem") : 0};
  }
`;

export const StyledExpandIcon = styled.img`
  margin-left: ${({ theme: { dir }, row }) =>
    dir === "rtl" ? 0 : `${row.depth}rem`};
  width: 12px;
  height: 12px;
  margin-right: ${({ theme: { dir }, row }) =>
    dir === "rtl" ? `${row.depth}rem` : 0};
`;

export const StyledPencilIcon = styled.img`
  margin-left: ${({ theme: { dir } }) => (dir === "rtl" ? 0 : "auto")};
  margin-right: ${({ theme: { dir } }) => (dir === "rtl" ? "auto" : 0)};
  height: 13px;
  display: ${(props) => (props.isEditable ? "block" : "none")};
`;
