import styled, { css, DefaultTheme } from "styled-components";
import { DropDownMode, POSITION } from "./types";
// @ts-ignore
import rtl from "styled-components-rtl";

const handleBorderColor_Hover = (
  mode: DropDownMode,
  colors: DefaultTheme["colors"]
) => {
  switch (mode) {
    case DropDownMode.disabled:
      return `solid 1px #e4e7eb`;
    case DropDownMode.readonly:
      return `solid 1px #e4e7eb`;
    case DropDownMode.selectable:
      return `solid 1px ${colors.purple}`;
  }
};

const HandleBorderColor = (mode: DropDownMode, varient?: string) => {
  switch (mode) {
    case DropDownMode.disabled:
      return `solid 1px #e4e7eb`;
    case DropDownMode.readonly:
      return `solid 1px #e4e7eb`;
    case DropDownMode.selectable:
      return varient === "smallblue"
        ? "solid 1px #d1d1d1"
        : "solid 1px #6c7481";
  }
};

const handleBackground = (mode: DropDownMode) => {
  switch (mode) {
    case DropDownMode.disabled:
      return `#ffffff`;
    case DropDownMode.readonly:
      return `#fafafa`;
    case DropDownMode.selectable:
      return "#ffffff";
  }
};

const HandleTitleColor = (mode: DropDownMode) => {
  switch (mode) {
    case DropDownMode.disabled:
      return `#b9bec6`;
    case DropDownMode.readonly:
      return `#6c7481`;
    case DropDownMode.selectable:
      return "#404d61";
  }
};

const HandleDropDownColor = (
  mode: DropDownMode,
  isPlaceholder?: boolean,
  selected?: boolean
) => {
  if (selected) {
    return "#5900d3";
  }
  if (isPlaceholder) {
    return `#6C7481;`;
  }
  switch (mode) {
    case DropDownMode.disabled:
      return `#b9bec6;`;
    case DropDownMode.readonly:
      return `#6c7481;`;
    case DropDownMode.selectable:
      return "#050709;";
  }
};

export const Container = styled.div<{ Title?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => (p.Title ? 4 : 0)}px;
  width: 100%;
`;

export const WithDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 50%;
`;

export const Title = styled.div<{ mode: DropDownMode; isError?: boolean }>`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  overflow: hidden;
  ${rtl`
    text-align: left;
  `}
  -webkit-line-clamp: 1;
  display: -webkit-box;

  -webkit-box-orient: vertical;
  color: ${(props) =>
    props.isError ? props.theme.colors.red : HandleTitleColor(props.mode)};
`;

export const TitleReq = styled.div<{ isError?: boolean }>`
  margin: 0 0 0 16px;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  ${rtl`
    text-align: left;
  `}
  color: ${(props) => (props.isError ? props.theme.colors.red : "#6c7481")};
`;

//////////////

export const DropDownContainer = styled.div<{
  isOpen: boolean;
  mode: DropDownMode;
  Placement?: POSITION | undefined;
  isError?: boolean;
  varient?: string;
  width?: number;
}>`
  width: ${(p) => (p.width ? `${p.width}px` : "100%")};
  position: relative;
  box-sizing: border-box;
  cursor: ${(p) =>
    p.mode === DropDownMode.selectable ? "pointer" : "default"};
  border-bottom-style: solid;
  border-bottom: ${(props) =>
    props.isOpen ? "solid 1px #c5c9cf" : "solid 1px #6c7481"};

  ${(p) => {
    if (p.Placement === POSITION.BOTTOM) {
      return css`
        border-bottom-style: solid;
        ${p.isOpen
          ? "border-bottom:solid 1px #c5c9cf;"
          : "border-bottom:solid 1px #6c7481;"}
      `;
    } else {
      return css`
        border-top-style: solid;
        ${p.isOpen
          ? "border-top:solid 1px #c5c9cf;"
          : "border-top:solid 1px #6c7481;"}
      `;
    }
  }}

  border: ${(props) =>
    props.isError
      ? `solid 1px ${props.theme.colors.red}`
      : HandleBorderColor(props.mode, props.varient)};

  border-bottom-left-radius: ${(props) =>
    props.isOpen && props.Placement === POSITION.BOTTOM ? 0 : "4px"};
  border-bottom-right-radius: ${(props) =>
    props.isOpen && props.Placement === POSITION.BOTTOM ? 0 : "4px"};

  border-top-left-radius: ${(props) =>
    props.isOpen && props.Placement === POSITION.TOP ? 0 : "4px"};
  border-top-right-radius: ${(props) =>
    props.isOpen && props.Placement === POSITION.TOP ? 0 : "4px"};

  ${(p) =>
    p.Placement === POSITION.BOTTOM
      ? `border-top-left-radius: 4px;
    border-top-right-radius: 4px;`
      : `border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;`}

  ${(p) => {
    if (p.Placement === POSITION.BOTTOM) {
      return css`
        border-bottom: ${p.isError
          ? `solid 1px ${p.theme.colors.red}`
          : p.isOpen
          ? "1px solid #c5c9cf"
          : HandleBorderColor(p.mode, p.varient)};
      `;
    } else {
      return css`
        border-top: ${p.isError
          ? `solid 1px ${p.theme.colors.red}`
          : p.isOpen
          ? "1px solid #c5c9cf"
          : HandleBorderColor(p.mode, p.varient)};
      `;
    }
  }}

  height: ${(p) => (p.varient === "smallblue" ? 32 : 40)}px;
  background-color: ${(props) =>
    props.varient === "smallblue" ? "#ecf1f7" : handleBackground(props.mode)};
  &:hover {
    border-top: ${(props) =>
      !props.isOpen
        ? handleBorderColor_Hover(props.mode, props.theme.colors)
        : props.Placement === POSITION.TOP
        ? "1px solid #c5c9cf"
        : HandleBorderColor(props.mode, props.varient)};
    border-left: ${(props) =>
      !props.isOpen
        ? handleBorderColor_Hover(props.mode, props.theme.colors)
        : HandleBorderColor(props.mode, props.varient)};
    border-right: ${(props) =>
      !props.isOpen
        ? handleBorderColor_Hover(props.mode, props.theme.colors)
        : HandleBorderColor(props.mode, props.varient)};
    border-bottom: ${(props) =>
      !props.isOpen
        ? handleBorderColor_Hover(props.mode, props.theme.colors)
        : props.Placement === POSITION.BOTTOM
        ? "1px solid #c5c9cf"
        : HandleBorderColor(props.mode, props.varient)};
  }
`;

export const DropDownHeader = styled.div<{
  mode: DropDownMode;
  varient?: string;
}>`
  display: flex;
  flex-direction: row;
  margin: 4px;
  justify-content: space-between;
  align-items: center;
  ${rtl`
    text-align: left;
    padding: 12px 16px 12px 16px;
  `}
  height: ${(p) => (p.varient === "smallblue" ? 24 : 30)}px;
  background-color: ${(props) =>
    props.varient === "smallblue" ? "#ecf1f7" : handleBackground(props.mode)};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #575757;
  overflow: hidden;
  cursor: ${(p) =>
    p.mode === DropDownMode.selectable ? "pointer" : "default"};
`;

export const DropDownListContainer = styled.div<{
  mode: DropDownMode;
  Placement?: POSITION | undefined;
  width?: number;
  visibileItemsHeight?: number;
  varient?: string;
}>`
  width: ${(p) => p.width}px;
  z-index: 2;
  background: white;
  /* ${(props) =>
    props.Placement === POSITION.TOP &&
    `
    transform: translateY(${
      props.visibileItemsHeight ? 200 - props.visibileItemsHeight * 40 : 0
    }px);
  `} */
  height: fit-content;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-direction: ${(p) =>
    p.Placement === POSITION.BOTTOM ? "column" : "column-reverse"};
  border: ${(props) => HandleBorderColor(props.mode, props.varient)};
  ${(p) =>
    p.Placement === POSITION.BOTTOM
      ? `border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-style: none;`
      : `border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-style: none;`}
`;

export const DropDownListContainerNoHeader = styled.div<{
  mode: DropDownMode;
  Placement?: POSITION | undefined;
  varient?: string;
}>`
  width: calc(100% + 2px);
  z-index: 2;
  height: fit-content;
  overflow-y: auto;
  overflow-x: hidden;

  border: ${(props) => HandleBorderColor(props.mode, props.varient)};
  ${(p) =>
    p.Placement === POSITION.BOTTOM
      ? `border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-style: none;`
      : `border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-style: none;`}

  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #afafaf;
  }
`;

export const DropDownList = styled.div<{
  maxHeight?: string;
  varient?: string;
}>`
  padding: 0;
  margin: 0;
  background: ${(p) => (p.varient ? "#ecf1f7" : "#ffffff")};
  font-weight: 500;
  border-top: none;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  max-height: ${(props) => props.maxHeight || "200px"};
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 6px;
    background: ${(p) => (p.varient ? "#ecf1f7" : "#ffffff")};
    margin-right: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #afafaf;
    border-right: 2px white solid;
    background-clip: padding-box;
  }
`;

export const ListItem = styled.div<{ isSelected: boolean; varient?: string }>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: ${(p) => (p.varient === "smallblue" ? 40 : 40)}px;
  ${rtl`
    text-align: left;
    padding: 12px 16px 12px 16px;
  `}
  list-style: none;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  border-bottom: 1px solid rgba(112, 112, 112, 0.1);
  cursor: pointer;
  color: ${(props) =>
    props.isSelected ? props.theme.colors.purple : "#101010"};
  background: ${(p) => (p.varient ? "#ecf1f7" : "#ffffff")};

  &:hover {
    background-color: #f4f2ff;
    color: #101010;
  }
`;

export const DropDownText = styled.div<{
  mode: DropDownMode;
  isPlaceholder?: boolean;
  selected?: boolean;
  width?: number;
}>`
  outline: none;
  border: none;
  overflow: hidden;
  width: calc(100% - 30px);
  color: ${(props) =>
    HandleDropDownColor(props.mode, props.isPlaceholder, props.selected)};
  user-select: none;
  font-size: 16px;
  font-weight: normal;

  white-space: nowrap;
  text-overflow: ellipsis;
  ${rtl`
    text-align: left;
  `}
`;

export const DropDownTextWithDelete = styled.div<{
  mode: DropDownMode;
  isPlaceholder?: boolean;
  selected?: boolean;
}>`
  outline: none;
  border: none;
  width: calc(100% - 22px);
  color: ${(props) =>
    HandleDropDownColor(props.mode, props.isPlaceholder, props.selected)};
  user-select: none;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ${rtl`
    text-align: left;
  `}
`;

export const StyledCheckmarkIcon = styled.img`
  width: 16px;
  height: 16px;
  color: #5900d3;
`;

export const StyledDeleteIcon = styled.img`
  width: 22px;
  height: 25px;
`;

export const StyledDropDownIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const Header = styled.div<{ hideBorder?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 0;
  position: sticky;
  background: #ffffff;
  border-bottom: ${(props) =>
    props.hideBorder ? "none" : "1px solid #c5c9cf"};
  top: 0;
  left: 0;
  right: 0;
`;
export const SearchWrapper = styled.div`
  background: #ffffff;
  height: 55px;
  padding: 7px 8px;
`;

export const ShowSelectedContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: end;
  padding: 0px 8px;
  background: #ffffff;
`;
export const ShowSelectedTitle = styled.div<{ active: boolean }>`
  font-size: 16px;
  font-weight: 600;
  background: #ffffff;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  ${rtl`
      text-align: right;
  `}

  color: ${(p) => (p.active ? p.theme.colors.purple : "#ad9ebe")};
  user-select: none;
  cursor: ${(p) => (p.active ? "pointer" : "default")};
`;

export const StyledIconDropDown = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
