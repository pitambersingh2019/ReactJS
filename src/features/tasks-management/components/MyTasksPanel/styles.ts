import styled from "styled-components";

export const MyTasksPanelContainer = styled.div`
  width: 256px;
  ${(props) => (props.theme.dir === "rtl" ? "left: 0" : "right: 0")}
  background-color: ${(props) => props.theme.colors.white};
  z-index: 12002;
  position: fixed;
  top: 40px;
  box-shadow: -3px 0 10px 0 rgba(0, 0, 0, 0.04);
  height: calc(100vh - 56px);
`;
