import React from "react";
import {
  ContainerInput,
  InputFieldStyled,
  Container,
  CloseIconStyled,
  SearchIconStyled,
} from "./styles";
import { InputSearchInterface } from "./types";

const InputSearchField: React.FC<InputSearchInterface> = (props) => {
  const { placeholder, onChange, value, onEnter, size = "lg" } = props;

  return (
    <Container>
      <ContainerInput size={size}>
        <SearchIconStyled />
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
        {value && <CloseIconStyled onClick={() => onChange("")} />}
      </ContainerInput>
    </Container>
  );
};

export default InputSearchField;
