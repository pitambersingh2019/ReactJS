import styled, { css } from "styled-components";

const basicStyle = css`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
`;

export const UserColumnContainer = styled.div`
  ${basicStyle}
  color: ${(props) => props.theme.colors.black};
`;

export const NotMapped = styled.div`
  ${basicStyle}
  color: ${(props) => props.theme.colors.gray2};
`;
