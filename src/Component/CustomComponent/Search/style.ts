import styled from "styled-components";

interface IWrapper {
  border: "all" | "bottom" | "without";
  isActive: boolean;
  isPadding: boolean;
  type?: string;
}

const setPadding = (isPadding?: boolean, type?: string) => {
  if (isPadding) {
    return "12px 16px";
  } else {
    switch (type) {
      case "tableSearch":
        return "2px 4px";
      case "parameters":
        return "2px 4px";
      default:
        return "unset";
    }
  }
};

const setHeight = (isPadding?: boolean, type?: string) => {
  if (isPadding) {
    return type === "parameters" ? "30px" : "40px";
  } else {
    return "fit-content";
  }
};

export const Wrapper = styled.div<IWrapper>`
  width: ${({ type }) => (type === "tableSearch" ? "auto" : "100%")};
  min-width: 50px;
  height: ${({ isPadding, type }) => setHeight(isPadding, type)};
  display: flex;
  align-items: center;
  gap: ${({ type }) => (type === "parameters" ? "0 8px" : "0 12px")};
  background-color: white;
  padding: ${({ isPadding, type }) => setPadding(isPadding, type)};
  border-radius: ${({ border }) => (border === "bottom" ? "unset" : "4px")};
  border: ${({ border }) => (border === "all" ? "1px solid #d1d1d1" : "unset")};
  border-bottom: ${({ border }) =>
    border === "without" ? "unset" : "1px solid"};
  border-color: ${({ isActive }) => (isActive ? "#5900d3" : "#d1d1d1")};
  &:hover {
    border-color: #5900d3;
  }
`;

interface IImgWrapper {
  cursor: boolean;
  type?: string;
}

const setImgWidth = (type?: string) => {
  switch (type) {
    case "parameters":
    case "tableSearch":
      return "14px";
    default:
      return "20px";
  }
};

export const ImgWrapper = styled.div<IImgWrapper>`
  width: ${({ type }) => setImgWidth(type)};
  display: flex;
  align-items: center;
  cursor: ${({ cursor }) => (cursor ? "pointer" : "initial")};
  & > img {
    width: 100%;
    height: auto;
  }
`;

interface inputInterface {
  type?: string;
}

const setFontSize = (type?: string) => {
  switch (type) {
    case "parameters":
      return "14px";
    case "tableSearch":
      return "13px";
    default:
      return "16px";
  }
};

export const Input = styled.input<inputInterface>`
  border: unset;
  outline: unset;
  width: ${({ type }) =>
    type === "tableSearch" ? "auto" : "calc(100% - 28px)"};
  border-radius: 4px;
  font-size: ${({ type }) => setFontSize(type)};
  ::-webkit-input-placeholder {
    font-size: ${({ type }) => setFontSize(type)};
  }
  ::-moz-placeholder {
    font-size: ${({ type }) => setFontSize(type)};
  }
  :-ms-input-placeholder {
    font-size: ${({ type }) => setFontSize(type)};
  }
  :-moz-placeholder {
    font-size: ${({ type }) => setFontSize(type)};
  }
`;
