import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const HeaderWrapper = styled.div`
  border-radius: 4px 4px 0 0;
  display: flex;
  justify-content: space-between;
  align-self: center;
  padding: 16px;
  background-color: #f3f3f4;
`;

export const HeaderTextWrapper = styled.div`
  display: flex;
  align-items: center;
  ${rtl`
    margin-left: 8px;
  `}
`;

export const HeaderTextImgWrapper = styled.div`
  height: 25px;
  & > img {
    height: 100%;
    width: auto;
  }
`;

export const HeaderText = styled.div`
  font-family: ProximaNova, sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #050709;
  ${rtl`
    margin-left: 7px;
  `}
`;

export const CancelWrapper = styled.div`
  height: 25px;
  cursor: pointer;
  & > img {
    height: 100%;
  }
`;
