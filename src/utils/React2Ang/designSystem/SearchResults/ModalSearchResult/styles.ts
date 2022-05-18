import styled, { keyframes } from "styled-components";

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
  width: 80vw;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px #f3f3f4;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: ${animationShowShareTable} 0.2s linear;
  padding: 32px 44px 10px 24px;
  background-color: #ffffff;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #050709;
`;

export const FooterStyled = styled.div`
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 16px;
  padding: 10px;
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
