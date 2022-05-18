import React from "react";
import {
  ContainerInput,
  InputFieldStyled,
  Container,
  IconStyled,
} from "./styles";
import { InputSearchInterface } from "./types";
import CloseIcon from "../../../assets/icons/closeIcon.svg";

const InputSearchField: React.FC<InputSearchInterface> = (props) => {
  const { placeholder, onChange, value, onEnter, size = "lg" } = props;

  return (
    <Container>
      <ContainerInput size={size}>
        <InputFieldStyled
          value={value}
          placeholder={placeholder}
          type={"text"}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (onEnter) {
                onEnter();
              }
            }
          }}
        />
        {value && (
          <IconStyled
            title={"Close"}
            src={CloseIcon}
            onClick={() => onChange("")}
          />
        )}
      </ContainerInput>
    </Container>
  );
};

export default InputSearchField;
