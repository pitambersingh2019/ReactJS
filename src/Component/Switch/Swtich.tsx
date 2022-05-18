import React from "react";
import {
  SwitchButton,
  SwitchContainer,
  ContainerWrapperSwitch,
} from "./styles";

interface SwitchBoxInterface {
  IsActive: boolean;
}

const SwitchBox: React.FC<SwitchBoxInterface> = (props) => {
  return (
    <ContainerWrapperSwitch>
      <SwitchContainer isOnOff={props.IsActive}>
        <SwitchButton isOnOff={props.IsActive}></SwitchButton>
      </SwitchContainer>
    </ContainerWrapperSwitch>
  );
};

export default SwitchBox;
