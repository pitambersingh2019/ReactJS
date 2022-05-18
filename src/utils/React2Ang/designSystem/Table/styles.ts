import styled, { keyframes } from "styled-components";
import {
  ROW_HEIGHT,
  COL_HEIGHT,
  INFO_ROW_HEIGHT,
  SELECTED_COUNT_BOTTOM_HEIGHT,
  SCROLLBAR_WIDTH,
} from "./config";
// @ts-ignore
import rtl from "styled-components-rtl";
import MenuIcon from "./SVG/MenuIcon";
import SortingIcon from "./SVG/SortIcon";
// export const TableRows = styled(FixedSizeList)`
//   &::-webkit-scrollbar {
//     width: 8px;
//     height: 8px;
//     margin: 5px;
//   }

//   &::-webkit-scrollbar-thumb {
//     border-radius: 8px;
//     background-color: #e3e3e3;
//   }
// `;

const scaleAnimation = keyframes`
  from {
    transform:  scale(0.9);
  }

  to {
    transform:  scale(1);
  }
`;

export const ColumnMeniInformations = styled.div`
  box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, 0.04);
  width: 100%;
  background-color: #e6effd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: #101010;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px;
  position: absolute;
  z-index: 2;
  user-select: none;
  animation: ${scaleAnimation} 0.3s linear;
`;
export const ColumnAddCell = styled.div`
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: #101010;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px;
  position: absolute;
  z-index: 2;
  user-select: none;
  animation: ${scaleAnimation} 0.3s linear;
`;
export const MenuIconStyled = styled(MenuIcon)<{ open: boolean }>`
  width: 20px;
  height: 20px;
  fill: ${(p) => (p.open ? "#5900d3" : "#6c7481")};
  cursor: pointer;
  :hover {
    fill: #5900d3;
  }
`;
export const SortingIconStyled = styled(SortingIcon)`
  width: 16px;
  height: 16px;
`;
export const Resizer = styled.div<{ isRtl: boolean }>`
  background: #ecf1f7;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  ${(props) => rtl`
         right: ${props.isRtl ? "-20" : "0"}px;
  `}

  top: 0;
  transform: translateX(50%);
  z-index: 2;
  ${"" /* prevents from scrolling while dragging on touch devices */}
  touch-action:none;

  &.isResizing {
    background: #ecf1f7;
  }
`;

export const Styles = styled.div`
  height: 100%;
  /* border: solid 1px #e3e3e3; */
  background-color: #fff;
  .table {
    all: unset;
    display: inline-block;
    position: relative;
    /* border: solid 1px #e3e3e3; */
    /* width: 100%; */
    /* overflow-y: hidden;
    overflow-x: hidden; */

    .reactTable {
      ::-webkit-scrollbar-thumb:horizontal {
        border-radius: 5px;
        background-color: #e3e3e3;
        border-top: 4px white solid;
        border-bottom: 4px white solid;
        border-left: 1px white solid;
        border-right: 1px white solid;
        background-clip: padding-box;
      }
      ::-webkit-scrollbar-track:horizontal {
        box-shadow: 0 -4px 10px 0 rgba(0, 0, 0, 0.04);
      }

      ::-webkit-scrollbar-thumb:vertical {
        border-radius: 5px;
        background-color: #e3e3e3;
        border-left: 4px white solid;
        border-right: 4px white solid;
        border-top: 1px white solid;
        border-bottom: 1px white solid;
        background-clip: padding-box;
      }

      ::-webkit-scrollbar-track {
        background: #ffffff;
        margin-top: 80px;
        border: solid 3px transparent;
      }

      ::-webkit-scrollbar {
        width: ${SCROLLBAR_WIDTH}px;
        height: ${SCROLLBAR_WIDTH}px;
        margin: 5px;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }
    .thead {
      position: relative;
      width: 100%;
    }
    .tr {
      position: relative;
      width: 100%;
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .tbody {
      height: calc(100% - 100px);
      //width: 100%;
      /* body takes all the remaining available space */
      flex: 1 1 auto;
      display: block;
      overflow-y: hidden;
      overflow-x: hidden;
    }

    .th,
    .td {
      margin: 0;
      position: relative;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

export const Col = styled.div`
  height: ${COL_HEIGHT}px;
  width: 100%;
  background-color: #ecf1f7;
`;
export const ColWrapper = styled.div`
  cursor: grabbing;
  color: #4a4a4a;
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: white;
  font-size: 14px;
  font-weight: 700;
  font-weight: normal;
  font-stretch: normal;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  padding: 0px;
  background-color: #ecf1f7;
  user-select: none;
  /* cursor: grab; */

  &.ondrag {
    visibility: hidden;
    background-color: #fff;
  }
`;

const rotateanimation = keyframes`
  from {
    transform: rotate(0deg) scale(0.9);
  }

  to {
    transform: rotate(-10deg) scale(1);
  }
`;

export const ColContent = styled.div<{ width: number }>`
  max-width: ${(p) => p.width - 70}px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #050709;
`;
export const DraggedColumnStyled = styled.div<{
  show: boolean;
  zindex: number;
}>`
  position: fixed;
  opacity: 1;
  cursor: grab;
  //display: none;
  top: 999999px;
  z-index: ${(p) => (p.show ? p.zindex : -1)};
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
  transform: rotate(-10deg);
  animation: ${rotateanimation} 0.3s linear;
`;
export const ColContainer = styled.div`
  //style={{backgroundColor: '#f3f3f4', width: '100%', height: '100%'}}
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  padding: 8px;
  height: 30px;
`;

export const ColContentLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  ${rtl`
      padding-left: 8px;
  `}

  padding-top: 8px;
`;
export const ColContentRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 8px;
`;
export const FilterContainer = styled.div`
  padding: 10px;
  width: 100%;
`;

interface RowProps {
  isSelected: boolean;
}

export const Row = styled.div.attrs<RowProps>(({ isSelected }) => ({
  style: {
    backgroundColor: isSelected ? "#f4f2ff" : "#fff",
  },
}))`
  font-size: 14px;
  padding: 6px;
  font-weight: normal;
  font-stretch: normal;
  border: 1px #e4e7eb solid;
  height: 100%;
  width: 100%;
  font-style: normal;
  line-height: normal;
  text-overflow: clip;
  letter-spacing: normal;
  color: #4a4a4a;

  :last-child {
    ${rtl`
         border-right: 0;
  `}
  }

  &:hover {
    background-color: #f4f2ff;
  }
`;

export const AddRowMenu = styled.div`
  font-size: 16px;
  font-weight: normal;
  width: 60px;
  height: ${ROW_HEIGHT}px;
  font-style: normal;
  border-bottom: 1px #e3e3e3 solid;
  border-top: 1px #e3e3e3 solid;
  border-left: 0;
  line-height: normal;
  letter-spacing: normal;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const CheckBoxContainer = styled.div<{ checked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border: solid 0.5px #101010;
  cursor: pointer;
  background-color: ${(props) => (props.checked ? "#5900d3" : "#fafafa")};
  border-radius: 2px;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CheckMark = styled.div<{ checkd: boolean }>`
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  > * {
    font-size: 5px;
    visibility: ${(props) => (props.checkd ? "visible" : "hidden")};
  }
`;

export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${rtl`
      margin-left: 10px;
  `}
`;
export const ArrowDown = styled.div`
  width: 0px;
  height: 0px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #d1d1d1;
  margin: 2px;
  &:hover {
    border-top: 6px solid #4a4a4a;
  }
`;

export const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  margin: 2px;
  border-bottom: 6px solid #d1d1d1;

  &:hover {
    border-bottom: 6px solid #4a4a4a;
  }
`;

// export const TableWrapper = styled.div`
//   padding: 16px;
//   background-color: #ffffff;
// `;

export const TableFlex = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-x: auto;
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar {
    width: ${SCROLLBAR_WIDTH}px;
    height: ${SCROLLBAR_WIDTH}px;
    margin: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #e3e3e3;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const BodyInnerHiddenScrollBars = styled.div<{
  height: number;
  width: number;
}>`
  height: ${(p) => p.height}px;
  width: ${(p) => p.width}px;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

export const BodyInnterWithScrollBars = styled.div<{
  height: number;
  width: number;
}>`
  height: ${(p) => p.height}px;
  width: ${(p) => p.width}px;
  overflow-x: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar {
    width: ${SCROLLBAR_WIDTH}px;
    height: ${SCROLLBAR_WIDTH}px;
    margin: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #e3e3e3;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const TableWrapper = styled.div`
  height: 100%;
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08); */
  display: flex;
  flex-direction: column;
`;

export const FooterTable = styled.div<{ tableBodyHeight: number }>`
  border: solid 1px #e3e3e3;
  width: 100%;
  height: ${INFO_ROW_HEIGHT}px;
  background-color: #ffffff;
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: start;
  top: ${(p) => COL_HEIGHT + p.tableBodyHeight}px;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FooterTableAdd = styled.div<{ tableBodyHeight: number }>`
  border: solid 1px #e3e3e3;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  position: absolute;
  z-index: 2;
  top: ${(p) => COL_HEIGHT + p.tableBodyHeight}px;
  user-select: none;
`;
export const SelectedRowsCount = styled.div`
  width: 100%;
  height: ${SELECTED_COUNT_BOTTOM_HEIGHT}px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 5px;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: #6c7481;
`;

export const MenuSideItemWrapper = styled.div<{ isRtl: boolean }>`
  position: sticky;
  top: 0;
  ${rtl`
      right: 0;
  `}
  width: 60px;
  float: ${(p) => (p.isRtl ? "left" : "right")};
`;

export const MenuSideHeaderWrapper = styled.div<{
  isRtl: boolean;
  zindex: number;
}>`
  position: sticky;
  top: 0;
  width: 60px;
  height: 80px;
  float: ${(p) => (p.isRtl ? "left" : "right")};
  transform: translateY(-80px);
  background-color: #ffffff;
  z-index: ${(p) => p.zindex ?? "100"};
  ${rtl`
      right: 0;
  `};
`;

export const SelectionSideItemWrapper = styled.div`
  position: sticky;
  ${rtl`
        left: 0;
  `}
  width: 40px;
  height: calc(100% - 80px);
`;

export const SelectionHeaderWrapper = styled.div<{ zindex: number }>`
  position: sticky;
  top: 0;
  width: 40px;
  height: 80px;
  z-index: ${(p) => p.zindex ?? 100};
  ${rtl`
      left: 0;
  `}
`;
