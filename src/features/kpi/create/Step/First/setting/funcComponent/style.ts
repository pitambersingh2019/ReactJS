import styled from "styled-components";

interface IWrapper {
  isSetting: boolean;
  isAble: boolean;
}

export const Wrapper = styled.div<IWrapper>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: end;
  cursor: pointer;
  height: ${(props) => (!props.isSetting ? "50px" : "unset")};
  opacity: ${(props) => (props.isAble ? 1 : 0.5)};
  pointer-events: ${(props) => (props.isAble ? "unset" : "none")};
`;

interface IWrapperNumber {
  isActive: boolean;
  isSetting: boolean;
  isSign: boolean;
}

export const WrapperNumber = styled.div<IWrapperNumber>`
  height: 32px;
  width: ${({ isSign }) => (isSign ? "32px" : "56px")};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e8f8fd;
  border: 1px solid #d2f1fa;
  border-radius: 5px;
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #050709;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  border: 1px solid;
  border-color: ${({ isActive }) => (isActive ? "#1268fb" : "#d2f1fa")};
  &:hover {
    border-color: ${({ isSetting, isSign, isActive }) =>
      isActive || (!isSign && !isSetting) ? "#1268fb" : "#d2f1fa"};
  }
`;

export const IsActiveWrapper = styled.div`
  position: relative;
`;

export const WrapperSettingImg = styled.div`
  width: 24px;
  height: 12px;
  margin-bottom: 6px;
  border-radius: 6px;
  background-color: #1268fb;
  & > img {
    width: 100%;
    height: 100%;
    transform: rotateY(90deg);
  }
`;

export const WrapperSetting = styled.div`
  border-radius: 5px;
  border: 1px solid #eeeff1;
  background-color: white;
  position: absolute;
  z-index: 10;
  top: 12px;
  left: calc(100% - 24px);
`;

export const WrapperSettingButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  width: 100px;
  & img {
    width: 100%;
    height: auto;
  }
`;

export const WrapperSettingButtonText = styled.div`
  display: flex;
`;

export const WallSetting = styled.div`
  width: 100vw;
  height: calc(100vh - 152px);
  position: absolute;
  top: 0;
  left: 0;
`;
