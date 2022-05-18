import styled from "styled-components";

export const Wrapper = styled.div`
  width: 304px;
  position: absolute;
  top: 35px;
  right: 0px;
  background: ${(props) => props.theme.colors.white};
  z-index: 10;
  box-shadow: -3px 0 10px 0 rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  height: calc(100vh - 250px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SettingsPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 13px 16px 16px;
`;

export const Header = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;

export const CloseIcon = styled.img`
  height: 20px;
  cursor: pointer;
`;

export const ScrollArea = styled.div`
  height: calc(100vh - 250px - 70px - 80px);
  overflow: auto;
  padding: 0px 8px 12px 16px;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.38);
    border-radius: 16px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
  }
`;
