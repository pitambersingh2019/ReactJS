import React, { useEffect, useRef, useState } from "react";
import { ContainerInput, InputFieldStyled, Container, Title } from "./styles";
import { InputMode, InputTextInterface, InputType } from "./types";

const InputTextField: React.FC<InputTextInterface> = (props) => {
  const { placeholder, onChange, required, value, TitleText, onBlur } = props;
  const mode = props.mode ?? InputMode.editable;
  const type = props.type ?? InputType.text;

  const [error, seterror] = useState(false);
  const InputHandler = (text: string) => {
    onChange(text);
    if (!text.length && required) {
      seterror(true);
    } else {
      seterror(false);
    }
  };

  const reference = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const wheelHandler = () => {};

  useEffect(() => {
    const reff = reference.current;
    if (reff) {
      reff.addEventListener("wheel", wheelHandler, { passive: true });
      return () => reff.removeEventListener("wheel", wheelHandler);
    }
  }, [reference]);

  return (
    <Container ref={reference}>
      {TitleText && (
        <Title mode={mode} error={error}>
          {TitleText}
        </Title>
      )}
      <ContainerInput mode={mode} error={error}>
        <InputFieldStyled
          value={value}
          placeholder={placeholder}
          onChange={(e) => InputHandler(e.target.value)}
          required={required}
          mode={mode}
          type={type}
          onBlur={(e) => onBlur(e.target.value)}
          disabled={mode !== InputMode.editable}
        />
      </ContainerInput>
    </Container>
  );
};

export default InputTextField;
