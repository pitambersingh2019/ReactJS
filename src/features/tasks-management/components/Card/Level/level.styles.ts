import styled from "styled-components";

export const StyledLevel = styled.div<{ isSmallMargin: boolean }>`
  font-size: 14px;
  font-weight: normal;
  color: #707071;
  margin-top: ${(props) => (props.isSmallMargin ? "1px" : "8px")};
  line-height: 1.21;

  //max 1 line, ellipsis if more
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
