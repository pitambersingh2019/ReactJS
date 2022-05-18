import styled from "styled-components";

export const IsActiveWrapper = styled.div`
  position: relative;
`;

export const WrapperSettingImg = styled.div`
  width: 24px;
  position: relative;
  z-index: 10;
  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const WrapperSettingPoint = styled.div`
  border-radius: 4px;
  border: 1px solid #eeeff1;
  background-color: white;
  width: 100px;
  & > div:first-child {
    border-radius: 4px 4px 0 0;
  }
  & > div:last-child {
    border-radius: 0 0 4px 4px;
  }
`;

export const WallSetting = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: initial;
`;

export const WrapperSetting = styled.div`
  display: flex;
  position: fixed;
  align-items: flex-start;
  font-size: 14px;
  z-index: 10;
`;

interface IEditWrapper {
  top: number;
  left: number;
}

export const EditWrapper = styled.div<IEditWrapper>`
  position: fixed;
  top: ${({ top }) => top + "px"};
  left: ${({ left }) => left + "px"};
`;
