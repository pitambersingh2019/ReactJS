import styled from "styled-components";

export const ValueCellContainer = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  min-height: 40px;
  padding: 8px;
  display: flex;
  align-items: center;
`;
