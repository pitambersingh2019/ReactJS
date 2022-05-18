import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const PreviewFormulaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  padding: 5px 10px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #404d61;
`;

export const TitleImgWrapper = styled.div`
  width: 15px;
  ${rtl`
    margin-left: 10px;
  `}
  & > img {
    width: 100%;
    height: auto;
  }
`;

interface IPreviewFormulaHeaderButtonWrapper {
  activeText: boolean;
}

export const PreviewFormulaHeaderButtonWrapper = styled.div<IPreviewFormulaHeaderButtonWrapper>`
  display: flex;
  color: ${({ activeText }) => (activeText ? "#5900d3" : "#ad9ebe")};
  cursor: ${({ activeText }) => (activeText ? "pointer" : "unset")};
  & > div:first-child {
    display: ${({ activeText }) => (activeText ? "block" : "none")};
  }
  & > div:nth-child(2) {
    display: ${({ activeText }) => (activeText ? "none" : "block")};
  }
`;

export const PreviewFormulaImgWrapper = styled.div`
  width: 30px;
  & img {
    height: 100%;
    width: auto;
  }
`;

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
  color: inherit;
`;
