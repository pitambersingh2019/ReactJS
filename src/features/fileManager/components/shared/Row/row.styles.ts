import styled from "styled-components";

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  margin-inline-end: 32px;
  border-bottom: ${(props) => `1px solid ${props.theme.colors.lightGray5}`};
`;

export const LeftSideContainer = styled.div`
  width: 52%;
`;

export const RightSideContainer = styled.div`
  width: 43%;
`;
