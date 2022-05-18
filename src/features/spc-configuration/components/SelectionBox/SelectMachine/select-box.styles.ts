import styled from "styled-components";
import { device } from "../../../../../utils/devices";

export const StyledSelectMachineWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledSelectMachine = styled.div`
  overflow: auto;
  border: 1px solid #ecf1f7;
  border-radius: 4px;
  width: 432px;
  height: 100%;
  padding-top: 14px;
  padding-left: 16px;
  ul {
    padding-inline-start: 16px;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border-right: 2px white solid;
    background-color: rgba(5, 7, 9, 0.38);
  }
  @media ${device.laptop} {
    width: 360px;
    padding-left: 0;
  }
  @media ${device.laptopL} {
    width: 360px;
    padding-left: 0;
  }
  @media ${device.desktop} {
    width: 400px;
    padding-left: 0;
  }
`;

export const StyledSelectMachineTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.19;
  color: #050709;
  padding: 8px 16px;
`;
