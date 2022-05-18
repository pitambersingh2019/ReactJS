import styled from "styled-components";

export const HeaderContainer = styled.div<{
  showBarOnScroll: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0 12px;
  padding: 0 24px;
  position: absolute;
  top: ${(props) => (props.showBarOnScroll ? "0" : "-52px")};
  transition: 0.3s;
  width: 100%;
  background: #ffffff;
  z-index: 2;
`;

export const SideGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledCollapsAll = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.21;
  color: #101010;
  cursor: pointer;
  text-decoration: underline;
  margin-bottom: 0;
`;

export const StyledEditButton = styled.button<{ editing: boolean }>`
  width: 122px;
  height: 32px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${(p) => (p.editing ? "#bfb2cf" : "#5900d3")};
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  border: none;
  font-stretch: normal;
  font-family: ProximaNova;
  display: flex;
  align-items: center;
  justify-content: center;
`;
