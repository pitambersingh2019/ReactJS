import styled from "styled-components";
import { device } from "../../../../../utils/devices";

export const StyledSelectedMachineWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledSelectedMachine = styled.div`
  overflow: auto;
  border: 1px solid #5900d3;
  border-radius: 4px;
  width: 432px;
  height: 100%;
  padding: 14px 32px 0 16px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border-right: 2px white solid;
    background-color: rgba(5, 7, 9, 0.38);
  }
  ul {
    padding-inline-start: 16px;
  }
  @media ${device.laptop} {
    width: 360px;
    padding: 14px 16px 0 0;
  }
  @media ${device.laptopL} {
    width: 360px;
    padding: 14px 16px 0 0;
  }
  @media ${device.desktop} {
    width: 400px;
    padding: 14px 16px 0 0;
  }
`;

export const StyledSelectedMachineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
`;

export const StyledSelectedMachineTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.29;
  color: #050709;
`;
