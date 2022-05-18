import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const Body = styled.div`
  flex: 1;
  height: 100%;
  min-width: 600px;

  ${rtl`
    padding-left: 15px;
    padding-right: 15px;
  `}
`;
export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding-top: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 80%;
  &::-webkit-scrollbar {
    width: 10px;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #e3e3e3;
  }
`;
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 80%;
`;

export const LoadingTitle = styled.div`
  font-family: ${({ theme: { language } }) =>
    language === "eng" ? "ProximaNova" : "unset"};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  margin-bottom: 20px;
  user-select: none;
`;

export const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  position: relative;
  height: 95vh;
  overflow: hidden;
  padding-bottom: 20px;
  padding-top: 20px;
`;

export const EmptyContainer = styled.div`
  margin-top: 10px;
  ${rtl`
    margin-right: 10px;
  `}
`;
