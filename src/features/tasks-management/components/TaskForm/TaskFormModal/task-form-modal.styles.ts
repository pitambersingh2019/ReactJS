import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0px;
  z-index: 10;
  height: 40px;
  background-color: ${(props) => props.theme.colors.purple};
  padding: 12px 24px;
  width: 100%;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;
