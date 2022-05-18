import styled from "styled-components";
import { DropDownMode, PlacementEnum } from "./types";
// @ts-ignore
import rtl from "styled-components-rtl";

const handleBorderColor_Hover = (mode: DropDownMode) => {
  switch (mode) {
    case DropDownMode.disabled:
      return `solid 1px #e4e7eb`;
    case DropDownMode.readonly:
      return `solid 1px #e4e7eb`;
    case DropDownMode.selectable:
      return "solid 1px #1268fb";
  }
};

const HandleBorderColor = (mode: DropDownMode) => {
  switch (mode) {
    case DropDownMode.disabled:
      return `solid 1px #e4e7eb`;
    case DropDownMode.readonly:
      return `solid 1px #e4e7eb`;
    case DropDownMode.selectable:
      return "solid 1px #d1d1d1";
  }
};

const handleBackground = (mode: DropDownMode) => {
  switch (mode) {
    case DropDownMode.disabled:
      return `#ffffff`;
    case DropDownMode.readonly:
      return `#fafafa`;
    case DropDownMode.selectable:
      return "transparent";
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
  isSelected?: boolean
) => {
  if (isPlaceholder) {
    return `#6C7481;`;
  }
  if (isSelected) {
    return "#1268fb";
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled.div<{ mode: DropDownMode; isError?: boolean }>`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  ${rtl`
    text-align: left;
  `}

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
  Placement: PlacementEnum;
  isError?: boolean;
}>`
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  border-bottom-style: solid;
  border-bottom: ${(props) =>
    props.isOpen ? "solid 1px #c5c9cf" : "solid 1px #6c7481"};

  border: ${(props) =>
    props.isError
      ? `solid 1px ${props.theme.colors.red}`
      : HandleBorderColor(props.mode)};

  border-bottom-left-radius: ${(props) =>
    props.isOpen && props.Placement === PlacementEnum.bottom ? 0 : "4px"};
  border-bottom-right-radius: ${(props) =>
    props.isOpen && props.Placement === PlacementEnum.bottom ? 0 : "4px"};

  border-top-left-radius: ${(props) =>
    props.isOpen && props.Placement === PlacementEnum.top ? 0 : "4px"};
  border-top-right-radius: ${(props) =>
    props.isOpen && props.Placement === PlacementEnum.top ? 0 : "4px"};

  ${(p) =>
    p.Placement === PlacementEnum.bottom
      ? `border-top-left-radius: 4px;
    border-top-right-radius: 4px;`
      : `border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;`}
  border-bottom: ${(p) =>
    p.isError
      ? `solid 1px ${p.theme.colors.red}`
      : p.isOpen
      ? "1px solid #c5c9cf"
      : HandleBorderColor(p.mode)};

  height: 32px;
  /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08); */
  background-color: ${(props) => handleBackground(props.mode)};
  &:hover {
    border-top: ${(props) =>
      !props.isOpen
        ? handleBorderColor_Hover(props.mode)
        : HandleBorderColor(props.mode)};
    border-left: ${(props) =>
      !props.isOpen
        ? handleBorderColor_Hover(props.mode)
        : HandleBorderColor(props.mode)};
    border-right: ${(props) =>
      !props.isOpen
        ? handleBorderColor_Hover(props.mode)
        : HandleBorderColor(props.mode)};
    border-bottom: ${(props) =>
      !props.isOpen
        ? handleBorderColor_Hover(props.mode)
        : "1px solid #c5c9cf"};
  }
`;

export const DropDownHeader = styled.div<{ mode: DropDownMode }>`
  display: flex;
  flex-direction: row;
  margin: 4px;
  justify-content: space-between;
  align-items: center;
  ${rtl`
    text-align: left;
    padding: 12px 16px 12px 16px;
  `}
  height: 24px;

  background-color: ${(props) => handleBackground(props.mode)};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #575757;
  overflow: hidden;
  cursor: ${(props) =>
    props.mode === DropDownMode.disabled ? "not-allowed" : "pointer"};
`;

export const DropDownListContainer = styled.div<{
  mode: DropDownMode;
  Placement: PlacementEnum;
}>`
  position: absolute;
  bottom: 0;
  left: -1px;
  top: ${(p) => (p.Placement === PlacementEnum.bottom ? 31 : -374)}px;
  width: calc(100% + 2px);
  z-index: 2;
  height: fit-content;
  max-height: 335px;
  overflow-y: auto;
  overflow-x: hidden;

  border: ${(props) => HandleBorderColor(props.mode)};
  ${(p) =>
    p.Placement === PlacementEnum.bottom
      ? `border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-style: none;`
      : `border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-style: none;`}

  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.38);
  }
`;

export const DropDownList = styled.div`
  padding: 0;
  margin: 0;
  background: "transparent";
  font-weight: 500;
  border-top: none;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  max-height: 200px;
`;

export const ListItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 40px;
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
  color: ${(props) => (props.isSelected ? "#1268fb" : "#101010 ")};
  background-color: #ecf1f7;

  &:hover {
    background-color: #e6effd;
    color: #e6effd;
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
`;

export const StyledDropDownIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 0;
  position: sticky;
  background: #ffffff;
  border-bottom: 1px solid #c5c9cf;
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

  color: ${(p) => (p.active ? "#1268fb" : "#a8d4ff")};
  user-select: none;
`;

export const StyledIconDropDown = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
