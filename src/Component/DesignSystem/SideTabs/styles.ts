import styled, { css } from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";
export enum typeTab {
  HORIZONTAL = "HORIZONTAL", //4 or less tabs
  VERTICAL = "VERTICAL", //more than 4 tabs
}
export const Container = styled.div<{ type: typeTab }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: ${(p) => (p.type === typeTab.VERTICAL ? "row" : "column")};
`;

/* height: ${(p) => `${p.menuHeight}px` ?? "unset"};
  overflow-y: ${(p) => (p.menuHeight ? `205px` : "200px")}; */

export const TabsWrapper = styled.div<{ type: typeTab }>`
  position: relative;
  ${(p) => {
    if (p.type === typeTab.VERTICAL) {
      return css`
        flex: 0 0 200px;
      `;
    } else {
      return css`
        flex: 0 0 45px;
        overflow: hidden;
      `;
    }
  }}
  background-color: #f6f7fc;
  ${(p) => {
    if (p.type === typeTab.VERTICAL) {
      return css`
        /* border-right: solid 1px #d1d1d1; */
      `;
    } else {
      return css`
        border-bottom: 1px solid #d1d1d1;
        display: flex;
        flex-direction: row;
      `;
    }
  }}

  &:after {
    content: "";
    position: absolute;
    width: 12px;
    height: 100%;
    ${rtl`
          right: 0;
    `}

    top: 0;
    box-shadow: inset 0 0em 19em rgb(0 0 0 / 8%), 14px 0 4em rgb(0 0 0 / 50%);
    display: ${(p) => (p.type === typeTab.VERTICAL ? "block" : "none")};
  }
  overflow-x: hidden;
  /* border: solid 1px #000000; */
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.38);
  }
`;

export const ContentWrapper = styled.div<{ type: typeTab }>`
  flex: 1;
  background-color: #ffffff;
  /* border: solid 1px #000000; */
  width: ${(p) =>
    p.type === typeTab.VERTICAL ? "calc(100% - 200px)" : "100%"};
  position: relative;
  height: ${(p) =>
    p.type === typeTab.VERTICAL ? "100%" : "calc(100% - 200px)"};
`;

export const Tab = styled.div<{
  active: boolean;
  enabled: boolean;
  height: number;
  width: number;
  type: typeTab;
}>`
  cursor: ${(p) => (p.enabled ? "pointer" : "not-allowed")};

  display: flex;

  align-items: center;
  text-align: center;

  ${rtl`
      text-align: left;
  `}
  ${rtl`
         padding-left: 16px;
  `}

  ${(p) => {
    if (p.type === typeTab.VERTICAL) {
      return css`
        justify-content: space-between;
        height: ${p.height}px;
      `;
    } else {
      return css`
        flex-direction: column;
        width: ${p.width}px;
        justify-content: center;
        height: 40px;
      `;
    }
  }}
  position: relative;
  background-color: ${(p) => (p.active ? "#e4e7eb" : "#f6f7fc")};
  color: ${(p) => (p.active ? "#250060" : p.enabled ? "#050709" : "#404d61")};
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;

  &:before {
    content: "";
    ${(p) =>
      p.type === typeTab.VERTICAL &&
      css`
        height: 100%;
        width: 4px;
        position: absolute;
        bottom: 0;
        left: 0;
      `}
    display: ${(p) => (p.active ? "block" : "none")};
    box-sizing: border-box;
    background-color: ${(p) => (p.active ? "#250060" : "#f6f7fc")};
  }
  &:after {
    content: "";
    ${(p) =>
      p.type === typeTab.HORIZONTAL &&
      css`
        position: absolute;
        bottom: 0;
        left: 0;
        height: 4px;
        width: 100%;
      `}
    display: ${(p) => (p.active ? "block" : "none")};
    box-sizing: border-box;
    background-color: ${(p) => (p.active ? "#250060" : "#f6f7fc")};
  }

  &:hover {
    background-color: ${(p) => (p.enabled ? "#e4e7eb" : "#f6f7fc")};
  }
`;
