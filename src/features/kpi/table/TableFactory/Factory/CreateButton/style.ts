import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const CreateWrapper = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 5px;
`;

export const CreateImgWrapper = styled.div`
  width: 20px;
  height: 100%;
  ${rtl`
    margin-right: 6px;
  `}
  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const CreateText = styled.div`
  font-size: 16px;
  font-family: ProximaNova, sans-serif;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #5900d3;
  @media (max-width: 1200px) {
    font-size: 15px;
  }
`;
