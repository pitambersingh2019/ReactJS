import styled from "styled-components";

export const WeekSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const Subtitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.black};
  margin-top: 16px;
`;
