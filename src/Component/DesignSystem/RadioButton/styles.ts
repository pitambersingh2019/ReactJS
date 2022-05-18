import styled from "styled-components";

export const ContainerWrapperRadio = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RadioButtonDiv = styled.div<{ isOnOff: boolean }>`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 12px;
  transition: 0.2s;
  background: ${(props) => (props.isOnOff ? "#6d6dc5;" : "#ad9ebe")};
  box-shadow: 0 0 1px 0 rgba(10, 10, 10, 0.29);
`;

export const RadioContainer = styled.div<{ isOnOff: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  transition: background-color 0.3s;
  border: ${(props) =>
    props.isOnOff ? "solid 1px #6d6dc5;" : "solid 1px  #ad9ebe"};
  background-color: #ffffff;
`;
