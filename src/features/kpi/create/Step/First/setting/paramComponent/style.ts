import styled from "styled-components";
interface IWrapper {
  isSetting: boolean;
  isAble: boolean;
}

export const Wrapper = styled.div<IWrapper>`
  max-width: 100%;
  height: ${({ isSetting }) => (isSetting ? "unset" : "50px")};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: end;
  cursor: pointer;
  opacity: ${(props) => (props.isAble ? 1 : 0.5)};
  pointer-events: ${(props) => (props.isAble ? "unset" : "none")};
`;

interface IWrapperText {
  isActive: boolean;
  isSetting: boolean;
}

export const WrapperText = styled.div<IWrapperText>`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #fdf3e8;
  border-radius: 4px;
  padding: 0 13px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  border: 1px solid;
  border-color: ${({ isActive }) => (isActive ? "#1268fb" : "#fae9d2")};
  &:hover {
    border-color: ${({ isSetting, isActive }) =>
      isActive || !isSetting ? " #1268fb" : "#fae9d2"};
  }
`;

export const Text = styled.div`
  width: 100%;
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #050709;
  overflow: hidden;
  text-overflow: ellipsis;
`;
