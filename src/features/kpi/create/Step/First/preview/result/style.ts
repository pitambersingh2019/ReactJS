import styled from "styled-components";

export const PreviewSettingFormulaWrapper = styled.div`
  display: flex;
  min-height: 30px;
  background-color: #fafafa;
  border-radius: 0 0 10px 10px;
  padding: 5px 0;
`;

export const PreviewSettingFormula = styled.div`
  width: calc(100% - 20px);
  word-break: break-all;
  display: flex;
  justify-content: ${(props) => {
    if (props.theme.dir === "rtl") {
      return "end";
    } else {
      return "start";
    }
  }};
  align-items: center;
  padding: 0 5px;
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #050709;
  border-left: 1px solid #e4e7eb;
  ::-webkit-scrollbar {
    width: 0;
    height: 3px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
`;

export const PreviewFormulaImgWrapper = styled.div`
  width: 20px;
  display: flex;
  align-items: center;
  margin-left: 5px;
  & img {
    width: 100%;
  }
`;
