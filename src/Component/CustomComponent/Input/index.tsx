import React, { FC, useEffect, useState } from "react";
import TitleRequired from "../TitleRequired";
import * as Styled from "./style";

interface IProps {
  value: string;
  placeholder: string;
  status: "editable" | "readonly" | "disable";
  onChange: (text: string) => void;
  isRequired: boolean;
  title?: string;
  error?: string | boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const colorBackground = {
  editable: "white",
  readonly: "#fafafa",
  disable: "white",
};

const colorBorder = {
  editable: "#6c7481",
  readonly: "#e4e7eb",
  disable: "#e4e7eb",
};

const colorText = {
  editable: "#050709",
  readonly: "#6c7481",
  disable: "#b9bec6",
};

const InputComponent: FC<IProps> = ({
  value,
  status,
  onChange,
  isRequired,
  title,
  placeholder,
  error,
  onBlur,
  onFocus,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [ph, setPh] = useState<string>();
  const [isTouch, setIsTouch] = useState(false);
  const [isLeave, setIsLeave] = useState(false);

  useEffect(() => {
    if (isActive) {
      setPh(undefined);
    } else {
      setPh(placeholder);
    }
  }, [isActive]);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouch(true);
    setIsLeave(false);
    setIsActive(true);
    if (!onFocus) return;
    onFocus(e);
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsLeave(true);
    setIsActive(false);
    if (!onBlur) return;
    onBlur(e);
  };

  return (
    <TitleRequired
      isRequired={isRequired}
      title={title}
      status={status}
      error={error}
      touch={isTouch}
      leave={isLeave}
    >
      <Styled.Input
        colorText={colorText[status]}
        backgroundColor={colorBackground[status]}
        borderColor={
          error && isTouch && isLeave ? "#c73431" : colorBorder[status]
        }
        isAble={status === "editable"}
        value={value}
        placeholder={ph}
        onChange={onChangeText}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
      />
    </TitleRequired>
  );
};

export default InputComponent;
