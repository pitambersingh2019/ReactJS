import styled from "styled-components";
import { device } from "../../../devices";
export const Container = styled.div`
  /* height: 100%; */
  width: 100%;
`;
export const FormContainer = styled.div`
  width: 100%;
  overflow: visible;
  height: 100%;
`;
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingTitle = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  margin-bottom: 20px;
  user-select: none;
`;

export const FormWrapper = styled.div<{ wizard: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: visible;
`;

export const InputsContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  column-gap: 24px;
  row-gap: 20px;
  @media ${device.laptop} {
    column-gap: 24px;
  }
  @media ${device.laptopL} {
    column-gap: 24px;
  }
  @media ${device.desktop} {
    column-gap: 24px;
  }
  @media ${device.LaptopM} {
    column-gap: 24px;
  }
  @media ${device.LaptopML} {
    column-gap: 48px;
  }
  @media ${device.desktopS} {
    column-gap: 48px;
  }
  @media ${device.desktopL} {
    column-gap: 48px;
  }
`;

export const InputWrapper = styled.div<{
  order: number;
  fullSize: boolean;
  doubleSize?: boolean;
}>`
  display: flex;
  justify-content: start;
  align-items: center;
  order: ${(p) => p.order};
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  position: sticky;
  left: 0;
  bottom: 0;
  height: 62px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 12px;
  box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
`;
export const Body = styled.div`
  width: 100%;
  padding: 4px 24px 68px 24px;
  flex-direction: column;
  display: flex;
  justify-content: start;
  align-items: center;
  overflow-y: auto;
  /* overflow: hidden; */
  height: calc(100% - 0px);
  /* height: 500px; */
  gap: 10px;

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #e3e3e3;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
`;

export const ExpandCollapseText = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-decoration: underline;
  text-align: left;
  cursor: pointer;
  color: #101010;
`;
