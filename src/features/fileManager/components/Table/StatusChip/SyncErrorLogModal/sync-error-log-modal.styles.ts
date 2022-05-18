import styled from "styled-components";

export const FileName = styled.div`
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-top: 26px;
  padding-inline-start: 32px;
`;

export const WrapperScroll = styled.div`
  height: calc(640px - 56px - 50px);
  margin-top: 32px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
`;

export const ErrorLog = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => props.theme.colors.black};
  padding: 0px 32px;
`;

export const Download = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.89;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  cursor: pointer;
  text-decoration: underline;
`;

export const ActionsBar = styled.div`
  padding: 0 16px 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
