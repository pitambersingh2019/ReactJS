import styled from "styled-components";
import { device } from "../../../../../utils/devices";

export const StyledTitleWrapper = styled.div<{ step: number }>`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding-left: ${(props) => (props.step === 2 ? "24px" : "0")};
  @media ${device.laptop} {
    padding-left: 0px;
  }
`;

export const StyledTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 1.21;
  color: #050709;
`;

export const StyledStatueDesription = styled.p`
  font-size: 14px;
  margin-bottom: 0;
  color: #797e8d;
  ${(props) =>
    props.theme.dir === "rtl" ? `margin-right: 4px;` : `margin-left: 4px;`}
`;

export const StyledStatueWrapper = styled.div`
  display: flex;
  align-item: center;
`;
