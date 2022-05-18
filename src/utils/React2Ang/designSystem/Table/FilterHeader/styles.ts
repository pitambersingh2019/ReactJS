import styled from "styled-components";
import CloseIcon from "../SVG/CloseIcon";
import { FILTER_ItemsContainer_WIDTH } from "../config";
// @ts-ignore
import rtl from "styled-components-rtl";
import EditIcon from "../SVG/EditIcon";

export const Container = styled.div<{ width: number }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  overflow: hidden;
  position: relative;
`;
export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100% - 52px);
  justify-content: start;
  flex-wrap: wrap;
  align-items: center;
  padding: 12px 0px;
  /* height: ${FILTER_ItemsContainer_WIDTH}px; */
  overflow: hidden;
  background-color: white;
  gap: 8px;

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
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

export const ItemWrapper = styled.div`
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background-color: #f6f7fc;
  gap: 8px;
  overflow-wrap: break-word;
  padding: 0 10px;
`;

export const ItemContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  ${rtl`
   text-align: left;
  `}

  color: #101010;
  overflow-wrap: break-word;
  width: max-content;
  user-select: none;
`;

export const CloseIconStyled = styled(CloseIcon)`
  width: 8px;
  height: 8px;
  fill: #797e8d;
  cursor: pointer;
  :hover {
    fill: #1268fb;
  }
`;

export const EditIconStyledHeader = styled(EditIcon)`
  width: 8px;
  height: 8px;
  .EditIconst1 {
    fill: #4a4a4a;
  }
  cursor: pointer;
  :hover {
    .EditIconst1 {
      fill: #1268fb;
    }
  }
`;

export const RightSideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;

  color: #101010;
  text-decoration: underline;
  cursor: pointer;
  user-select: none;
  position: absolute;
  bottom: 5px;
  ${rtl`
   right: 5px;
   text-align: left;
  `}
`;
