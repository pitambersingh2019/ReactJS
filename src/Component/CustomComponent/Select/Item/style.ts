import styled from "styled-components";

interface IWrapper {
  isBorder: boolean;
  isFits: boolean;
  color: string;
}

export const Wrapper = styled.div<IWrapper>`
  height: 40px;
  padding: 12px 16px;
  position: relative;
  z-index: 90;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0 14px;
  color: ${({ color }) => color};
  cursor: pointer;
  border-bottom: ${({ isBorder, isFits }) =>
    isBorder && isFits ? "1px solid #c5c9cf" : "unset"};
  border-top: ${({ isBorder, isFits }) =>
    isBorder && !isFits ? "1px solid #c5c9cf" : "unset"};
`;

export const Text = styled.div`
  width: calc(100% - 60px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ProximaNova;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: inherit;
`;

export const ImgWrapper = styled.div`
  height: 16px;
  cursor: pointer;
  & > img {
    height: 100%;
    width: auto;
  }
`;
export const WarningWrapper = styled.div`
  height: 16px;
  width: 16px;
  & img {
    height: 100%;
    width: auto;
  }
  &:hover {
    & > div {
      display: block;
    }
  }
`;

export const WarningTooltip = styled.div`
  display: none;
  position: relative;
  transform: translate(-50%, -30px);
  word-break: break-word;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.16);
  background-color: white;
  width: 220px;
  max-height: 60px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
  &:hover {
    display: block;
  }
`;
