import styled from "styled-components";

export const ContentWrapper = styled.div`
  padding: 26px 0px 0px 32px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const ButtonContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 16px;
  display: flex;
  justify-content: flex-end;
  padding-inline-end: 16px;
  background-color: ${(props) => props.theme.colors.white};
`;
