import React, { useState } from "react";
import {
  ContainerInput,
  InputFieldStyled,
  Container,
  Title,
  IconStyled,
} from "./styles";
import { InputSearchInterface } from "./types";
import SearchIcon from "../../../assets/icons/icons8-search.svg";
import CloseIcon from "../../../assets/icons/closeIcon.svg";

const InputSearchField: React.FC<InputSearchInterface> = (props) => {
  const {
    placeholder,
    onChange,
    value,
    TitleText,
    onEnter,
    size = "lg",
  } = props;

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <Container>
      {TitleText && <Title> {TitleText} </Title>}
      <ContainerInput size={size}>
        {!value && !focused && <IconStyled title={"Search"} src={SearchIcon} />}
        <InputFieldStyled
          value={value}
          placeholder={focused ? "" : placeholder}
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
          onClick={() => setFocused(true)}
          onFocus={onFocus}
          onBlur={onBlur}
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
