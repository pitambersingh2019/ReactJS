import styled from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const StyledAddAssignee = styled.div`
  border-radius: 4px;
  background-color: #ecf3ff;
  text-align: center;
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 5px 12px 4px;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
  }

  & img {
    height: 18px;
  }

  .text {
    font-size: 12px;
    font-weight: normal;
    color: #1362e8;
    margin-inline-start: 5px;
  }
`;
