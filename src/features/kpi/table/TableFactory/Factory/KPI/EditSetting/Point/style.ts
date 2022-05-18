import styled, { css } from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

interface IWrapper {
  disable: boolean;
}

export const Wrapper = styled.div<IWrapper>`
  display: flex;
  justify-content: start;
  padding: 10px;
  color: #4a4a4a;
  opacity: ${({ disable }) => (disable ? 0.4 : 1)};
  cursor: pointer;
  line-height: normal;
  &:hover {
    background-color: #f4f2ff;
  }
  &:active {
    color: ${({ disable }) => (disable ? "#4a4a4a" : "white")};
    background-color: ${({ disable }) => (disable ? "#f4f2ff" : "#5900d3")};
    ${({ disable }) =>
      !disable &&
      css`
        & > div:first-child > img:first-child {
          display: none;
        }
        & > div:first-child > img:last-child {
          display: block;
        }
      `};
  }
`;

interface WrapperImgInterface {
  text: string;
}

const handleImgWidth = (text: string) => {
  switch (text) {
    case "Edit":
      return "16px";
    case "Duplicate":
      return "13px";
    case "Delete":
      return "14px";
    default:
      return "initial";
  }
};

const handleImgHeight = (text: string) => {
  switch (text) {
    case "Edit":
      return "16px";
    case "Duplicate":
      return "15px";
    case "Delete":
      return "15.2px";
    default:
      return "initial";
  }
};

const handlePadding = (text: string) => {
  switch (text) {
    case "Edit":
      return "1px 1px";
    case "Make Primary":
      return "1px 3px";
    default:
      return "initial";
  }
};

export const WrapperImg = styled.div<WrapperImgInterface>`
  width: 16px;
  height: 16px;
  ${rtl`
    margin-right: 6.7px;
  `};
  & > img {
    width: ${({ text }) => handleImgWidth(text)};
    height: ${({ text }) => handleImgHeight(text)};
    padding: ${({ text }) => handlePadding(text)};
  }
  & > img:last-child {
    display: none;
  }
`;

export const PointText = styled.div`
  width: 100px;
  font-family: ProximaNova, sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: inherit;
  &:dir(rtl) {
    text-align: right;
  }
  &:dir(ltr) {
    text-align: left;
  }
`;
