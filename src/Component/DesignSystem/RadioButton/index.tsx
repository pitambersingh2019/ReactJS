import React from "react";
import {
  RadioButtonDiv,
  RadioContainer,
  ContainerWrapperRadio,
} from "./styles";
import { RadioButtonInterface } from "./types";

const RadioButton: React.FC<RadioButtonInterface> = (props) => {
  return (
    <ContainerWrapperRadio>
      <RadioContainer isOnOff={props.IsActive}>
        <RadioButtonDiv isOnOff={props.IsActive}></RadioButtonDiv>
      </RadioContainer>
    </ContainerWrapperRadio>
  );
};

export default RadioButton;
