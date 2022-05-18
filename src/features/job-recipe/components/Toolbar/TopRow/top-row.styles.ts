import styled, { css } from "styled-components";

const scrollStyles = css`
  position: fixed;
  top: 86px;
  left: ${(props) => (props.theme.dir === "rtl" ? "36px" : "224px")};
  right: ${(props) => (props.theme.dir === "rtl" ? "224px" : "36px")};
  z-index: 20;
`;

export const TopRowContainer = styled.div<{ showBarOnScroll: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  ${(props) => props.showBarOnScroll && scrollStyles}
`;

export const CollapseAll = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  text-decoration: underline;
  cursor: pointer;
`;

export const SideContainer = styled.div`
  display: flex;
  align-items: center;
`;
