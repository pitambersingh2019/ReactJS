import styled from "styled-components";
import { device } from "../../../utils/devices";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 100%;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  ${rtl`
      text-align: left;
  `}
  color: #404d61;
`;

export const ImageContainer = styled.div`
  display: flex;

  ${rtl`
        align-items: start;
  `}
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

export const Image = styled.img`
  /* 
  @media ${device.laptopL} {
    width: 480px;
    height: 288px;
  } */
  width: 100%;
  height: 100%;

  width: ${(p) => p.width ?? 252}px;
  height: ${(p) => p.height ?? 171}px;
`;
export const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;
  gap: 5px;
`;

export const TitleButton = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${rtl`
      text-align: left;
  `}

  color: #1268fb;
`;
export const Icon = styled.img`
  height: 20px;
  width: 20px;
`;
