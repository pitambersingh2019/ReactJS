import styled from "styled-components";

export const MachineNameWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px white;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
`;

export const InputDefaultWrapper = styled.div`
  margin-bottom: 12px;
`;

export const MachineType = styled.div`
  margin-bottom: 0;
  margin-left: 10px;
  margin-right: 60px;
  font-family: ProximaNova, sans-serif;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: normal;
  color: #404d61;
  cursor: pointer;
`;
