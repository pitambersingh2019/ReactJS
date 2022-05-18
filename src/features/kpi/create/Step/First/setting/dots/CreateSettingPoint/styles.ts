import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Wrapper = styled.div`
  padding: 0 2px;
  color: #4a4a4a;
  height: 39.5px;
  & > div:first-child {
    border-bottom: 1px solid #eeeff1;
  }
  &:hover {
    background-color: #f4f2ff;
  }
  &:active {
    color: white;
    background-color: #5900d3;
`;

export const WrapperSettingButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 6px;
  color: #4a4a4a;
  &:active {
    & > div > img:first-child {
      display: none;
    }
    & > div > img:nth-child(2) {
      display: block;
    }
  }
`;

export const WrapperSettingButtonText = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  color: inherit;
  width: 14px;
  & > div {
    color: inherit;
  }
  & > img {
    ${rtl`
    margin-right: 10px;
  `};
    width: 14px;
    height: auto;
  }
  & > img:nth-child(2) {
    display: none;
  }
`;

export const WrapperArrowImg = styled.div`
  width: 16px;
  height: 100%;
  display: flex;
  align-items: center;
  & > img {
    width: 100%;
    height: auto;
    transform: ${(props) => {
      if (props.theme.dir === "rtl") {
        return "rotateZ(90deg)";
      } else {
        return "rotateZ(-90deg)";
      }
    }};
  }
  & > img:nth-child(2) {
    display: none;
  }
`;
