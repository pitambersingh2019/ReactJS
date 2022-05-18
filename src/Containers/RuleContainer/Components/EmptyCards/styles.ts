import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const EmptyCardContainer = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Body = styled.div`
  flex: 1;
  width: 100%;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${rtl`
    padding-left: 27px;
    padding-right: 27px;
  `}
`;
export const StyledIconMenu = styled.img<{ width: Number; height: Number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  color: #575757;
  ${rtl`
          margin-right: 8px;
          margin-top: 106px
  `}
`;

export const InfoText = styled.div`
  width: 254px;
  height: 34px;
  margin-top: 30px;
  margin-bottom: 0;
  font-family: ProximaNova;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: center;
  color: #797e8d;
`;

export const CardsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding-top: 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 300px;
  &::-webkit-scrollbar {
    width: 10px;
    margin: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #e3e3e3;
  }
`;
export const CardTapet = styled.div`
  position: relative;
  place-items: start;
  background-color: #f6f7fc;
  border-radius: 6px;
  width: 236px;
  height: 200px;
  transition: transform 0.2s; /* Animation */

  &.ShowCard {
    transform: scale(1.2);
    z-index: 2;
  }

  ${rtl`
          margin-right: 7px;
          margin-left: 7px;
          margin-bottom: 14px;
  `}
`;
