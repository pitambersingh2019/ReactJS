import styled from "styled-components";

export const StyledAssignee = styled.div<{ noPadding?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${(props) => (props.noPadding ? "0px" : "5px 0px 4px")};

  & img {
    height: 18px;
  }

  .text {
    font-size: 12px;
    font-weight: normal;
    color: #797e8d;
    margin-inline-start: 7px;
  }
`;
