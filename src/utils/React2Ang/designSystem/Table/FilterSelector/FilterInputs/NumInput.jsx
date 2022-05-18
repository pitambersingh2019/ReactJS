import React, { useState, useEffect } from "react";
import InputText from "../../../../../../Component/DesignSystem/InputText";
import {
  InputMode,
  InputType,
} from "../../../../../../Component/DesignSystem/InputText/types";
const TextInput = ({ setfilterItem, filterData, initvalue, id }) => {
  const [text, settext] = useState(initvalue ?? "");

  useEffect(() => {
    setfilterItem &&
      setfilterItem({
        ...filterData,
        id: id,
        val: text,
        valid: text ? true : false,
        text: filterData.containSelectedItem.text(filterData, text),
      });
  }, [filterData, id, setfilterItem, text]);
  return (
    <InputText
      placeholder={"Type Number"}
      required={false}
      value={text}
      onChange={(textString) => settext(textString)}
      TitleText={"Value"}
      type={InputType.number}
      mode={InputMode.editable}
    />
  );
};

export default TextInput;
