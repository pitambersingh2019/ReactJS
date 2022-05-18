import styled from "styled-components";

export const Container = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 30vh;

  & > div {
    border: none;
  }
`;

export const InfoText = styled.div`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.black};
`;
