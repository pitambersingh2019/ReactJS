import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const SettingPreview = styled.div`
  width: calc(100% - 460px);
  height: 100%;
  ${rtl`
    padding-left: 20px;
  `};
`;

export const Preview = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PreviewText = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const PreviewInfo = styled.div`
  width: 15px;
  & > img {
    width: 100%;
    height: auto;
  }
`;

export const ComponentWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
`;
