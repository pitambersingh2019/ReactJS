import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  color: white;
  border-radius: 4px 4px 0 0;
  background-color: #5aca96;
  padding: 0 20px;
`;

export const TitleText = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #fff;
`;

export const SubTitleText = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #fff;
`;

export const ChildrenWrapper = styled.div`
  padding: 20px 15px 20px 20px;
  height: calc(100% - 40px);
  overflow-y: auto;
  overflow-x: hidden;
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
