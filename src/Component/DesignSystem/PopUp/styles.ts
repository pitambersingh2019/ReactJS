import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const CloseButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 10px;
  bottom: 0;
  ${rtl`
    left: 0;
  `};
`;
export const Wrapper = styled.div<{ width?: number }>`
  position: absolute;
  width: ${(p) => p.width ?? 270}px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f3f3f4;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  ${rtl`
      text-align: left;
  `};

  margin-bottom: 16px;
  color: #101010;
`;

export const ContentWrapper = styled.div<{ width?: number }>`
  width: ${(p) => (p.width ? p.width - 80 : 200)}px;
  margin-top: 26px;
  margin-left: 60px;
  margin-right: 60px;
  display: flex;
  word-wrap: break-word;
  flex-direction: column;
  justify-content: center;
`;

export const ContentWrapperSubTitle = styled.div<{ width?: number }>`
  width: ${(p) => (p.width ? p.width - 80 : 200)}px;
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  margin-bottom: 96px;
  word-wrap: break-word;
  flex-direction: column;
  justify-content: center;
`;

export const ContentTextStyled = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  ${rtl`
      text-align: left;
  `};
  color: #101010;
`;

export const Icon = styled.img`
  position: absolute;
  ${rtl`
      left: 24px;
  `};

  top: 24px;
  height: 28px;
  width: 28px;
`;

export const CloseIconStyled = styled(CloseIcon)`
  position: absolute;
  top: 12px;
  ${rtl`
        right: 12px;
  `};
  cursor: pointer;
`;

export const ApplyButton = styled.div<{ disabled: boolean }>`
  /* width: 140px; */
  height: 32px;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => (p.disabled ? "#ad9ebe" : "#5900d3")};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  user-select: none;

  // &:hover {
  //   background-color: ${(p) => (p.disabled ? "#a8d4ff" : "#104fbc")};
  // }
`;
