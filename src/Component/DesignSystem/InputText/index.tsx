import React, { useEffect, useRef, useState } from "react";
import {
  ContainerInput,
  InputFieldStyled,
  Container,
  Title,
  TitleReq,
} from "./styles";
import { InputMode, InputTextInterface, InputType } from "./types";
import { ToolTipTitle } from "../../ToolTip/ToolTipMUI";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/translations";
const InputTextField: React.FC<InputTextInterface> = (props) => {
  const {
    placeholder,
    onChange,
    required,
    value,
    TitleText,
    onBlur,
    disableCopyPaste = false,
  } = props;
  const mode = props.mode ?? InputMode.editable;
  const type = props.type ?? InputType.text;

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

  const refTitle = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflow] = useState(false);
  useEffect(() => {
    if (refTitle.current) {
      const isOverf =
        refTitle.current.scrollHeight >
        refTitle.current.getBoundingClientRect().height;
      setIsOverflow(isOverf);
    }
  }, [TitleText]);
  return (
    <Container ref={reference}>
      {TitleText && (
        <ToolTipTitle title={isOverflowed ? TitleText : ""}>
          <Title mode={mode} error={error} ref={refTitle}>
            {TitleText}
          </Title>
        </ToolTipTitle>
      )}
      <ContainerInput mode={mode} error={error}>
        <InputFieldStyled
          value={value}
          placeholder={placeholder}
          onChange={(e) => InputHandler(e.target.value)}
          required={required}
          mode={mode}
          type={type}
          onBlur={(e) => onBlur && onBlur(e.target.value)}
          disabled={mode !== InputMode.editable}
          maxLength={props.maxLength || 524288}
          onPaste={(e) => {
            if (disableCopyPaste) {
              e.preventDefault();
              return false;
            }
            return true;
          }}
          onCopy={(e) => {
            if (disableCopyPaste) {
              e.preventDefault();
              return false;
            }
            return true;
          }}
        />
      </ContainerInput>
      {required && mode === InputMode.editable && (
        <TitleReq error={error}>
          * {t(translations.JobRecipe.Required)}
        </TitleReq>
      )}
    </Container>
  );
};

export default InputTextField;
