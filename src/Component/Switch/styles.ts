import styled from "styled-components";
// @ts-ignore
import rtl from "styled-components-rtl";

export const ContainerWrapperSwitch = styled.div`
  width: 35px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SwitchButton = styled.div<{ isOnOff: boolean }>`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 12px;
  transition: 0.2s;
  background: #fff;
  box-shadow: 0 0 1px 0 rgba(10, 10, 10, 0.29);
  transform: ${(props) => {
    if (props.isOnOff) {
      if (props.theme.dir === "rtl") {
        return "translateX(-16px)";
      } else {
        return "translateX(16px)";
      }
    } else {
      if (props.theme.dir === "rtl") {
        return "translateX(-1px)";
      } else {
        return "translateX(2px)";
      }
    }
  }};
`;

export const SwitchContainer = styled.div<{ isOnOff: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 32px;
  height: 16px;
  border-radius: 8px;
  transition: background-color 0.3s;
  border: ${(props) =>
    props.isOnOff ? "solid 1px #6d6dc5;" : "solid 1px  #ad9ebe"};
  background-color: ${(props) => (props.isOnOff ? "#6d6dc5;" : "#ad9ebe")};
  position: relative;
`;

export const React_switch_checkbox_input = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  :checked + .React_switch_label .React_switch_button_span {
    ${rtl`
         left: calc(100% - 1px);
  `}

    transform: translateX(-100%);
  }
`;
export const React_switch_label = styled.label<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 32px;
  height: 16px;
  background: ${(props) => (props.disabled ? "#0080ff" : "#afafaf")};
  border-radius: 32px;
  position: relative;
  transition: background-color 0.2s;
  :active .React_switch_button_span {
    width: 10px;
  }
`;

export const React_switch_button_span = styled.span`
  content: "";
  position: absolute;
  top: 1px;
  ${rtl`
        left: 1px;
  `}
  width: 14px;
  height: 14px;
  border-radius: 14px;
  transition: 0.2s;
  background: #fff;
  box-shadow: 0 0 1px 0 rgba(10, 10, 10, 0.29);
`;
