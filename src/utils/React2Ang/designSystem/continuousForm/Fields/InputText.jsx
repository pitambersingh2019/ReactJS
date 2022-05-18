import React, { useState } from "react";
import InputText from "../../../../../Component/DesignSystem/InputText";
import { mode } from "../../../../../Component/DesignSystem/InputText/types";
import { InputWrapper } from "./styles";
const InputTextField = ({ field, SaveValues, DeleteValues }) => {
  const [value, setValue] = useState(field.value);
  const handleInputChange = (text) => {
    setValue(text);
    if (text) {
      SaveValues({
        FieldName: field.Name,
        Eq: text,
        DataType: "text",
      });
    } else {
      DeleteValues && DeleteValues(field.Name);
    }
  };

  return (
    <InputWrapper>
      <InputText
        value={value}
        placeholder={field.Hint}
        required={false}
        onChange={(text) => handleInputChange(text)}
        TitleText={field.DisplayLName}
        mode={mode}
      ></InputText>
    </InputWrapper>
  );
};

export default InputTextField;
