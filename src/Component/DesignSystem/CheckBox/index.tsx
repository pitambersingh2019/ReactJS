import React from "react";
import { CheckBoxContainer, Wrapper, Title } from "./styles";
import { CheckBoxInterface } from "./types";

import CheckIcon from "@material-ui/icons/Check";
const CheckBoxField: React.FC<CheckBoxInterface> = (props) => {
  const { onChange, checked, TitleText, height } = props;
  const Disabled = props.disabled ?? false;

  const CheckBoxHandler = () => {
    if (!Disabled) onChange();
  };

  return (
    <CheckBoxContainer height={height}>
      <Wrapper
        selected={checked}
        disabled={Disabled}
        onClick={() => CheckBoxHandler()}
      >
        {checked ? (
          <CheckIcon style={{ fontSize: "10px", color: "#ffffff" }} />
        ) : null}
      </Wrapper>
      {TitleText && (
        <Title disabled={Disabled} onClick={() => CheckBoxHandler()}>
          {TitleText}
        </Title>
      )}
    </CheckBoxContainer>
  );
};

export default CheckBoxField;
