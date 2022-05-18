import styled, { css } from "styled-components";

export const CheckBoxContainer = styled.div<{ height?: number }>`
  display: flex;
  height: ${(p) => `${p.height}px` ?? "100%"};
  margin: 5px;
  align-items: center;
  cursor: pointer;
`;

export const Container = styled.div`
  height: 100%;
  overflow: hidden;

  overflow-y: auto;
  margin: 10px;
  &::-webkit-scrollbar {
    width: 4px;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(5, 7, 9, 0.38);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`;

export const OptContainer = styled.div`
  display: flex;
  align-items: center;
  .MuiSvgIcon-root {
    cursor: pointer;
    color: "#4a4a4a";
  }
`;

export const Title = styled.div<{ width?: number }>`
  margin-right: 10px;
  margin-left: 10px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #101010;
  ${(p) =>
    p.width
      ? css`
          max-width: ${p.width}px;
        `
      : css``}
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
