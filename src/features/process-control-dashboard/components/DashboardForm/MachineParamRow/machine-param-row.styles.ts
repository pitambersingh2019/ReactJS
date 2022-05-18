import styled from "styled-components";

export const MachineParamRowContainer = styled.div`
  display: flex;

  & > * {
    &:first-child {
      margin-inline-end: 24px;
    }
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  width: 0;
`;

export const DepartmentMachineContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Department = styled.span`
  font-weight: 600;
`;
