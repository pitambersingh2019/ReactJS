import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
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
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f3f3f4;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: ${animationShowShareTable} 0.2s linear;
  width: 272px;
  padding: 32px 44px 10px 24px;
  background-color: #ffffff;
  z-index: 2;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #101010;
`;

export const SubTitle = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #050709;
`;

export const WarningIconStyled = styled.img`
  width: 24px;
  height: 24px;
`;

export const Header = styled.div`
  width: 100%;
  position: relative;
  gap: 4px;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`;

export const FooterStyled = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
`;

export const Body = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  gap: 44px;
`;
export const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 4px;
`;
export const CheckBoxTitle = styled.div`
  font-family: ProximaNova;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #575757;
`;
export const CancelButton = styled.div`
  width: 98px;
  height: 32px;
  padding: 8px 24px;
  border-radius: 4px;
  border: solid 1px #0080ff;
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
  color: #0080ff;
  cursor: pointer;
  user-select: none;

  &:hover {
    border: solid 1px #104fbc;
    color: #104fbc;
  }
`;

export const ApplyButton = styled.div<{ disabled: boolean }>`
  width: 98px;
  height: 32px;
  padding: 8px 24px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => (p.disabled ? "#a8d4ff" : "#1268fb")};
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
    background-color: ${(p) => (p.disabled ? "#a8d4ff" : "#104fbc")};
  }
`;
