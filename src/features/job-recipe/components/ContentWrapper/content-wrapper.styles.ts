import styled from "styled-components";

export const ContentWrapperContainer = styled.div`
  margin-top: 16px;
  padding: 0 24px 24px;
`;

export const Error = styled.div`
  color: ${(props) => props.theme.colors.red};
  font-size: 20px;
  margin-top: 50px;
  width: 100%;
  text-align: center;
`;
