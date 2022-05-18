import styled from "styled-components";

export const FooterContainer = styled.div<{ show: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  position: fixed;
  width: calc(100% - 200px);
  background: #ffffff;
  bottom: ${(props) => (props.show ? "0" : "-48px")};
  transition: 0.5s;
  box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.08);
  gap: 24px;
`;

export const FooterButton = styled.button<{
  variant: string;
  disabled?: boolean;
}>`
  height: 32px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  font-family: ProximaNova;
  line-height: 1.19;
  border: ${(props) => (props.disabled ? "none" : "1px solid #5900d3;")};
  color: ${(props) => (props.variant === "primary" ? "#ffffff" : "#5900d3")};
  background: ${(props) =>
    props.variant === "primary" ? "#5900d3" : "#ffffff"};
  width: ${(props) => (props.variant === "primary" ? "164px" : "150px")};
  background-color: ${(props) =>
    props.disabled && props.theme.colors.purpleDisabled};
`;

export const RequiredText = styled.div`
  color: #050709;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  flex-direction: column;
  left: 20px;
  position: absolute;
`;
