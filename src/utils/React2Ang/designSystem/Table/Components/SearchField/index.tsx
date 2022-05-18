import React, { useEffect, useState } from "react";
import {
  ContainerInput,
  InputFieldStyled,
  Container,
  Title,
  IconStyled,
} from "./styles";
import { InputSearchInterface } from "./types";
import SearchIcon from "../../../../../../assets/icons/icons8-search.svg";
import CloseIcon from "../../../../../../assets/icons/closeIcon.svg";

const InputSearchField: React.FC<InputSearchInterface> = (props) => {
  const {
    placeholder,
    onChange,
    value,
    TitleText,
    onEnter,
    size = "lg",
  } = props;

  const [input, setinput] = useState<string>(value ?? "");
  const handleInput = (text: string) => {
    setinput(text);
    onChange(text);
  };

  useEffect(() => {
    setinput(value ?? "");
  }, [value]);
  return (
    <Container>
      {TitleText && <Title> {TitleText} </Title>}
      <ContainerInput size={size}>
        {!input && <IconStyled title={"Search"} src={SearchIcon} />}
        <InputFieldStyled
          value={input}
          placeholder={placeholder}
          type={"text"}
          onChange={(e) => handleInput(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (onEnter) {
                onEnter();
              }
            }
          }}
        />
        {input && (
          <IconStyled
            title={"Close"}
            src={CloseIcon}
            onClick={() => handleInput("")}
          />
        )}
      </ContainerInput>
    </Container>
  );
};

export default InputSearchField;
