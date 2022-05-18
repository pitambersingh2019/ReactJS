import styled from "styled-components";

export const ShiftSettingsContainer = styled.div``;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0px;
`;

export const Header = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
`;
