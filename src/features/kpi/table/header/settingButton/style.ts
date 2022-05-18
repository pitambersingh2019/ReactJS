import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const ViewButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

interface IImgWrapper {
  width: number;
}

export const ImgWrapper = styled.div<IImgWrapper>`
  width: ${({ width }) => width + "px"};
  ${rtl`
    margin-left: 8px;
  `};
  & > img {
    width: 100%;
    height: auto;
  }
`;

export const Text = styled.span`
  font-family: ProximaNova, sans-serif;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  ${rtl`
    margin-left: 12px;
  `};
`;
