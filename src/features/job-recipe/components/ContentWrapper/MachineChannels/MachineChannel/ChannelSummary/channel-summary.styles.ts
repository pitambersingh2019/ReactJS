import styled from "styled-components";

export const ChannelSummaryContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding-inline-end: 24px;
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const ChannelPC = styled.div`
  border-radius: 4px;
  border: solid 1px #eff0f5;
  background-color: ${(props) => props.theme.colors.white};
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.primaryBlue};
  height: 32px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline-start: 24px;
`;
