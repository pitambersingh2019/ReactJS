import styled from "styled-components";

export const StyledDescription = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.19;
  color: #101010;
  //max 2 lines, ellipsis if more
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
