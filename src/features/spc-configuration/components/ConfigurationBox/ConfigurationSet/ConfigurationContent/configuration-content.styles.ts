import styled from "styled-components";
import { device } from "../../../../../../utils/devices";

export const StyledContentWrapper = styled.div`
  border: 1px solid #5900d3;
  border-radius: 8px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);
`;

export const StyledHeader = styled.div`
  padding: 16px 24px;
  margin-bottom: 16px;
  background: #f6f7fc;
  color: #050709;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: left;
  border-radius: 8px 8px 0 0;
`;

export const StyledContent = styled.div`
  padding: 0 48px;
  @media ${device.laptopL} {
    padding: 0 40px;
  }
  @media ${device.desktop} {
    padding: 0 40px;
  }
  @media ${device.laptop} {
    padding: 0 24px;
  }
  max-height: calc(100vh - 296px);
  overflow: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
    margin: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(5, 7, 9, 0.38);
  }
`;

export const StyledContentHeader = styled.div`
  display: flex;
`;

export const StyledContentRow = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #eeeff1;
`;

export const StyledTitle = styled.p`
  width: 40%;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.19;
  color: #050709;
`;

export const StyledTitleSmall = styled.p`
  width: 20%;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.19;
  color: #050709;
`;

export const StyledSettingButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0 6px;
  border-radius: 4px;
  background-color: #ecf3ff;
  cursor: pointer;
`;

export const StyledSettingTitle = styled.p`
  font-size: 12px;
  color: #5900d3;
  line-height: 1.17;
  ${(props) =>
    props.theme.dir === "rtl" ? `margin-right: 2px;` : `margin-left: 2px;`}
  margin-bottom: 2px;
`;

export const StyledDetail = styled.div`
  width: 40%;
  font-size: 16px;
  line-height: 1.19;
  color: #050709;
  display: flex;
  align-items: center;
`;

export const StyledDetailSmall = styled.div`
  width: 20%;
  font-size: 16px;
  line-height: 1.19;
  color: #050709;
  display: flex;
  align-items: center;
`;

export const SettingIcon = styled.img`
  width: 19px;
`;
