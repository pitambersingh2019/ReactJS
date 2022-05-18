import styled from "styled-components";

export const MachineChannelsContainer = styled.div`
  margin-top: 16px;

  & > * {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
