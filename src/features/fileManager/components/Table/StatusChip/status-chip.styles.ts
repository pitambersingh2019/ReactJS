import styled from "styled-components";

export const StatusChipContainer = styled.div<{ isSynced: boolean }>`
  min-width: 64px;
  height: 24px;
  border-radius: 4px;
  padding: ${(props) => (props.isSynced ? "5px 10px" : "5px 2px 5px 10px")};
  background-color: ${(props) =>
    props.isSynced ? props.theme.colors.lightBlue2 : "#fae9e9"};
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.isSynced ? "default" : "pointer")};
`;

export const Text = styled.div<{ isSynced: boolean }>`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) =>
    props.isSynced ? props.theme.colors.primaryBlue : props.theme.colors.red};
`;

export const ArrowIcon = styled.img`
  margin-inline-start: 4px;
  height: 12px;
  transform: rotate(-90deg);
`;
