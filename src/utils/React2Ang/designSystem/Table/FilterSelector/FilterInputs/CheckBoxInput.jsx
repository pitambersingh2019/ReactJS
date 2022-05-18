import React, { useEffect, useState } from "react";
import CheckBoxField from "../../../../../../Component/DesignSystem/CheckBox";
import styled from "styled-components";
const TextTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  -webkit-letter-spacing: normal;
  -moz-letter-spacing: normal;
  -ms-letter-spacing: normal;
  letter-spacing: normal;
  text-align: left;
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  color: #404d61;
`;

const CheckBoxInput = ({ setfilterItem, filterData, initvalue, id }) => {
  const [checked, setchecked] = useState(initvalue ?? false);

  const handleCheckChange = () => {
    setchecked((prev) => !prev);
  };

  useEffect(() => {
    setfilterItem &&
      setfilterItem({
        ...filterData,
        id: id,
        val: checked,
        valid: true,
        text: filterData.containSelectedItem.text(filterData, checked),
      });
  }, [checked, filterData, id, setfilterItem]);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "start",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <TextTitle>Value</TextTitle>
      <CheckBoxField
        checked={checked}
        onChange={handleCheckChange}
        TitleText={filterData.containSelectedItem.fieldName}
      />
    </div>
  );
};

export default CheckBoxInput;
