import styled from "styled-components";
import { device } from "../../../../../utils/devices";

export const StyledConfigurationBox = styled.div`
  ${(props) =>
    props.theme.dir === "rtl" ? `padding-right: 24px;` : `padding-left: 24px;`}
  width: 648px;
  position: relative;
  @media ${device.laptopL} {
    width: 616px;
  }
  @media ${device.desktop} {
    width: 616px;
  }
  @media ${device.laptop} {
    width: 586px;
  }
`;

export const StyledPreNext = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  margin-bottom: 17px;
`;

export const StyledPreNextButton = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
`;

export const StyledPreNextText = styled.div`
  font-size: 14px;
  color: #404d61;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-top: 30px;
  padding-bottom: 24px;
  position: absolute;
  width: 100%;
  bottom: 0;
`;
