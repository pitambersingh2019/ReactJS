import styled from "styled-components";
import { device } from "../../../../../utils/devices";

export const StyledMachineNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledMachineNavHeader = styled.div`
  display: flex;
  padding-left: 24px;
  @media ${device.laptop} {
    padding-left: 0px;
  }
`;

export const StyledSelectedMachineTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.29;
  color: #050709;
  margin-bottom: 0;
`;

export const StyledMachineNav = styled.div`
  width: 200px;
  ${(props) =>
    props.theme.dir === "rtl"
      ? `border-left: 1px solid #d1d1d1;`
      : `border-right: 1px solid #d1d1d1;`}
  @media ${device.laptop} {
    width: 170px;
  }
`;

export const StyledAddMachineWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 24px;
  cursor: pointer;
  padding-top: 10px;
  padding-left: 24px;
  @media ${device.laptop} {
    padding-left: 0px;
  }
  ${(props) =>
    props.theme.dir === "rtl"
      ? `border-left: 1px solid #d1d1d1;`
      : `border-right: 1px solid #d1d1d1;`}
`;

export const StyledAddMachineTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #5900d3;
  margin-top: 1px;
  margin-bottom: 0;
`;
