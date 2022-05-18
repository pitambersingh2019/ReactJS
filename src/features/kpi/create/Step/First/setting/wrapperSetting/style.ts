import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Wrapper = styled.div`
  width: 226px;
  height: 100%;
  padding: 16px 11px 16px 16px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #d8d8d8;
`;

interface TitleSettingInterface {
  isActive: boolean;
}

export const TitleSetting = styled.div<TitleSettingInterface>`
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  ${rtl`
    text-align: left;
  `}
  color: #000;
`;

interface IWrapperChildren {
  gap: number;
}

export const WrapperChildren = styled.div<IWrapperChildren>`
  max-height: calc(100% - 20px);
  display: flex;
  flex-wrap: wrap;
  gap: ${({ gap }) => gap + "px"};
  margin-top: 10px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
`;
