import styled from "styled-components";

export const EmptyTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid 1px #e3e3e3;
  height: calc(100vh - 320px);
`;

export const Illustration = styled.img`
  height: 48px;
`;

export const Text = styled.div`
  margin-top: 24px;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.gray3};
`;

export const SubText = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => props.theme.colors.gray1};
`;
