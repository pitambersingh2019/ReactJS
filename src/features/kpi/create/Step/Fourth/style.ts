import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const ResultWrapper = styled.div`
  width: 536px;
  border-radius: 4px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
  margin-left: 5px;
  margin-top: 29px;
  padding: 0 16px;
  & > div {
    border-bottom: 1px solid #d1d1d1;
  }
  & > div:last-child {
    border-bottom: unset;
  }

  @media (max-width: 1000px) {
    width: 99%;
  }
`;

export const PreviewWrapper = styled.div`
  width: 200px;

  @media (max-width: 1000px) {
    margin-top: 20px;
    margin-left: 10px;
  }
`;

export const Title = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #404d61;
  margin-bottom: 8px;
  margin-right: 10px;
`;

export const ResultStep = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #050709;
  margin-right: 10px;
  word-break: break-all;
`;

export const TooltipWrapper = styled.div`
  max-height: 220px;
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

export const DispalyTypeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const DisplayWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterWrapper = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: center;
`;

export const FilterImgWrapper = styled.div`
  width: 25px;
  & > img {
    width: 100%;
    height: auto;
  }
`;

export const FilterText = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #404d61;
`;

export const TabsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
