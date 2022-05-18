import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  width: 760px;
`;

export const RowContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const VerticalDivider = styled.div`
  border-inline-start: 2px solid #404d61;
  height: 16px;
`;

export const Mode = styled.div`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.gray3};
  margin-inline-start: 8px;
`;
