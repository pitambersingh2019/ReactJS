import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/translations";
import {
  ContainerInput,
  InputFieldStyled,
  Container,
  Title,
  TitleReq,
  Counter,
} from "./styles";
import { InputMode, InputTextInterface } from "./types";

const TextAreaField: React.FC<InputTextInterface> = (props) => {
  const {
    placeholder,
    onChange,
    required,
    value,
    TitleText,
    isError,
    withCounter,
  } = props;
  const mode = props.mode ?? InputMode.editable;
  const maxLength = props.maxLength ?? 524288;

  const { t } = useTranslation();

  const [error, seterror] = useState(false);

  const InputHandler = (text: string) => {
    onChange(text);
    if (!text.length && required) {
      seterror(true);
    } else {
      seterror(false);
    }
  };

  useEffect(() => {
    isError !== undefined && seterror(isError);
  }, [isError]);

  return (
    <Container>
      {TitleText && (
        <Title mode={mode} error={error}>
          {" "}
          {TitleText}{" "}
        </Title>
      )}
      <ContainerInput mode={mode} error={error}>
        <InputFieldStyled
          value={value}
          placeholder={placeholder}
          onChange={(e) => InputHandler(e.target.value)}
          required={required}
          rows={5}
          cols={30}
          mode={mode}
          disabled={mode !== InputMode.editable}
          maxLength={maxLength}
        />
      </ContainerInput>
      {withCounter && <Counter>{value.length}/2000</Counter>}
      {required && mode === InputMode.editable && (
        <TitleReq error={error}>
          * {t(translations.RulesContainer.CREATE_RULE.REQUIRED)}
        </TitleReq>
      )}
    </Container>
  );
};

export default TextAreaField;
