import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const PreviewFormulaWrapper = styled.div``;

export const PreviewFormulaHeaderButton = styled.div`
  display: flex;
  align-items: center;
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #7aa5ef;
`;

export const PreviewFormulaImgWrapper = styled.div`
  width: 30px;
  & img {
    width: 100%;
  }
`;

export const PreviewFormulaBody = styled.div`
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.16);
  background-color: white;
`;

export const FirstTimeWrapper = styled.div`
  height: 144px;
  padding: 20px;
  cursor: pointer;
`;

export const FTWTwo = styled.div`
  width: fit-content;
  display: flex;
  align-items: flex-start;
  & > div:first-child {
    display: none;
  }
  &:hover {
    & > div:first-child {
      display: block;
    }
    & > div:nth-child(2n) {
      display: none;
    }
    & > div:last-child {
      color: #104fbc;
    }
  }
`;

export const FirstTimeText = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #1268fb;
`;

export const FirstTimeImgWrapper = styled.div`
  width: 20px;
  position: relative;
  top: 0;
  left: 0;
  & > img {
    width: 100%;
    height: auto;
    ${rtl`
        margin-right: 4px;
    `}
  }
`;

export const Formula = styled.div`
  min-height: 60px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px 10px;
  padding: 5px 15px;
  justify-content: ${(props) => {
    if (props.theme.dir === "rtl") {
      return "flex-end";
    } else {
      return "flex-start";
    }
  }};
`;
export const SaveFormula = styled.div`
  min-height: 145px;
  padding: 25px;
  font-size: 16px;
  font-weight: 900;
  word-break: break-all;
  text-align: ${(props) => {
    if (props.theme.dir === "rtl") {
      return "right";
    } else {
      return "left";
    }
  }};
`;
