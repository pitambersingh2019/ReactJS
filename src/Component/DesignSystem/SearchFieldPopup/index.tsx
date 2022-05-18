import React from "react";
import {
  ContainerInput,
  InputFieldStyled,
  Container,
  Title,
  IconStyled,
  TitleReq,
} from "./styles";
import { InputSearchInterface } from "./types";
import SearchIcon from "../../../assets/icons/modalpopup.svg";

const InputSearchField: React.FC<InputSearchInterface> = (props) => {
  const { placeholder, onChange, value, TitleText, onSearch, disabled } = props;
  const required = props.required ?? false;
  return (
    <Container>
      {TitleText && <Title disabled={disabled}> {TitleText} </Title>}
      <ContainerInput disabledStyle={disabled}>
        <InputFieldStyled
          value={value}
          disabledStyle={disabled} //for disabled style
          disabled={true} //to not edit input
          placeholder={placeholder}
          type={"text"}
          onChange={(e) => onChange(e.target.value)}
        />
        <IconStyled
          title={"Search"}
          disabled={disabled}
          src={SearchIcon}
          onClick={() => onSearch(value)}
        />
      </ContainerInput>
      {required && <TitleReq>* Required</TitleReq>}
    </Container>
  );
};

export default InputSearchField;
