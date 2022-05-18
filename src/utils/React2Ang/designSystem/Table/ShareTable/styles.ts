import styled, { keyframes } from "styled-components";
import CloseIcon from "../SVG/CloseIcon";
import ShareIcon from "../SVG/SearchIcon2";
// @ts-ignore
import rtl from "styled-components-rtl";
export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;
const animationShowShareTable = keyframes`
  from {
    transform: scale(0.9);
  }

  to {
    transform: scale(1);
  }
`;

export const Wrapper = styled.div`
  background: white;
  border-radius: 4px;
  width: 700px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f3f3f4;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: ${animationShowShareTable} 0.2s linear;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  ${rtl`
    text-align: left;
  `}

  color: #050709;
`;

export const SubTitle = styled.div`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  ${rtl`
    text-align: left;
  `}
  color: #050709;
  padding: 0px 0px 0px 46px;
`;

export const ContentWrapper = styled.div`
  width: 200px;
  margin-top: 30px;
  margin-left: 60px;
  margin-right: 60px;
  display: flex;
  margin-bottom: 60px;
  word-wrap: break-word;
  flex-direction: column;
  justify-content: center;
`;

export const ContentTextStyled = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  ${rtl`
    text-align: left;
  `}
  color: #101010;
`;

export const CloseIconStyled = styled(CloseIcon)`
  position: absolute;
  top: 16px;
  ${rtl`
    right: 16px;
  `}

  width: 20px;
  height: 20px;
  fill: #797e8d;
  cursor: pointer;
  :hover {
    fill: #5900d3;
  }
`;

export const Header = styled.div`
  height: 72px;
  width: 100%;
  padding: 16px 46px 16px 0px;
  border: solid 1px #f3f3f4;
  background-color: #fafafa;
  position: relative;
  gap: 4px;
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  padding-left: 24px;
  gap: 4px;
  align-items: center;
`;

export const MainSection = styled.div`
  display: flex;
  padding: 16px 46px 12px 46px;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;
export const SelectionWrapper = styled.div`
  flex: 1;
  height: 400px;
  padding-bottom: 50px;
  width: 50%;
`;

export const Divider = styled.div`
  width: 1px;
  height: 400px;
  background-color: #d1d1d1;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  padding: 16px 46px 12px 46px;
`;
export const FooterStyled = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 16px;
  gap: 16px;
`;

export const CancelButton = styled.div`
  width: 98px;
  height: 32px;
  padding: 8px 24px;
  border-radius: 4px;
  border: solid 1px #5900d3;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #5900d3;
  cursor: pointer;
  user-select: none;

  /* &:hover {
    border: solid 1px #104fbc;
    color: #104fbc;
  } */
`;

export const ApplyButton = styled.div<{ disabled: boolean }>`
  width: 98px;
  height: 32px;
  padding: 8px 24px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => (p.disabled ? "#ad9ebe" : "#5900d3")};
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${(p) => (p.disabled ? "#ad9ebe" : "#5900d3")};
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: start;
  flex-wrap: wrap;
  align-items: center;
  max-height: 80px;
  background-color: white;
  gap: 8px;
  padding: 16px 46px 12px 46px;
`;

export const ItemWrapper = styled.div`
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background-color: #f6f7fc;
  gap: 8px;
  overflow-wrap: break-word;
  padding: 0 10px;
`;

export const ItemContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  text-align: left;
  color: #101010;
  overflow-wrap: break-word;
  width: max-content;
  user-select: none;
`;

export const CloseIconItemStyled = styled(CloseIcon)`
  width: 8px;
  height: 8px;
  fill: #797e8d;
  cursor: pointer;
  :hover {
    fill: #5900d3;
  }
`;

export const ShareIconItemStyled = styled(ShareIcon)`
  width: 18px;
  height: 18px;
  .ShareIconReact2 {
    fill: #050709;
  }
`;

export const LineDivider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #e4e7eb;
`;
