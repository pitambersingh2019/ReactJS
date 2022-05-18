import styled from "styled-components";
import { HEADER_HEIGHT } from "../config";
import ExportIcon from "../SVG/ExportIcon";
import RestoreIcon from "../SVG/RestoreIcon";
import FilterIcon from "../SVG/FilterIcon";
import FilterIcon2 from "../SVG/FilterIcon2";
import ShareIcon from "../SVG/ShareIcon";
import DeleteIcon from "../SVG/DeleteIcon";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
export enum POSITION {
  LEFT_BOTTOM = "left_bottom",
  RIGHT_BOTTOM = "right_bottom",
  LEFT = "left",
  RIGHT = "right",
}

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
  padding: 5px;
`;

export const LeftWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  z-index: 7;
`;
export const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  z-index: 7;
`;
export const ExportWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const AddWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const ExportIconStyled = styled(ExportIcon)<{ open: boolean }>`
  width: 24px;
  height: 24px;
  .ExportIconst1 {
    fill: ${(p) => (p.open ? "#5900d3" : "#6c7481")};
  }
  cursor: pointer;
  &:hover {
    .ExportIconst1 {
      fill: #5900d3;
    }
  }
`;
export const ShareIconStyled = styled(ShareIcon)<{ open: boolean }>`
  width: 24px;
  height: 24px;
  .shareTableIcon {
    fill: ${(p) => (p.open ? "#5900d3" : "#6c7481")};
  }
  cursor: pointer;
  &:hover {
    .shareTableIcon {
      fill: #5900d3;
    }
  }
`;
export const RestoreIconStyled = styled(RestoreIcon)<{ open: boolean }>`
  width: 24px;
  height: 24px;
  .RestoreIconst1 {
    fill: ${(p) => (p.open ? "#5900d3" : "#6c7481")};
  }
  cursor: pointer;
  &:hover {
    .RestoreIconst1 {
      fill: #5900d3;
    }
  }
`;
export const FilterIconStyled = styled(FilterIcon)<{ open: boolean }>`
  width: 24px;
  height: 24px;
  .FilterIconTable {
    fill: ${(p) => (p.open ? "#5900d3" : "#6c7481")};
  }
  cursor: pointer;
  &:hover {
    .FilterIconTable {
      fill: #5900d3;
    }
  }
`;
export const FilterIconStyled2 = styled(FilterIcon2)<{ open: boolean }>`
  width: 14px;
  height: 14px;
  .FilterIconTable {
    fill: #1362e8;
  }
  cursor: pointer;
  &:hover {
    .FilterIconTable {
      fill: #1362e8;
    }
  }
`;
export const DeleteIconStyled = styled(DeleteIcon)<{ enabled: boolean }>`
  width: 24px;
  height: 24px;
  cursor: ${(p) => (p.enabled ? "pointer" : "default")};
  .DeleteIconReactst0 {
    fill: ${(p) => (p.enabled ? "#4a4a4a" : "#afafaf")};
  }
  &:hover {
    .DeleteIconReactst0 {
      fill: ${(p) => (p.enabled ? "#5900d3" : "#afafaf")};
    }
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Divider = styled.div`
  background-color: #e3e3e3;
  width: 2px;
  height: 20px;
`;

export const ArrowDownIconStyled = styled(KeyboardArrowDownIcon)`
  color: #6c7481;
  width: 16px;
  height: 16px;
  cursor: pointer;
  &:hover {
    background-color: #eeeff1;
    border-radius: 50%;
  }
`;
