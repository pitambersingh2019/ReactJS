/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState, useEffect, useCallback } from "react";
import DropDown from "../../../../../../Component/DesignSystem/DropDown/MultiSelect";
import { DropDownMode } from "../../../../../../Component/DesignSystem/DropDown/types";
const DropDownComp = ({ setfilterItem, filterData, initvalue, id }) => {
  // console.log("initvalue", initvalue);
  const items = useMemo(
    () =>
      filterData.criteriaSelectedItem.helper.comboValues.map((elem) => ({
        value: elem.ComboValueField,
        label: elem.DisplayEName,
      })),
    [filterData.criteriaSelectedItem.helper.comboValues]
  );

  const handleSelectItem = (items) => {
    console.log(items);
    if (items) {
      setfilterItem &&
        setfilterItem({
          ...filterData,
          id: id,
          val: items,
          valid: items.length ? true : false,
          text: filterData.containSelectedItem.text(filterData, items),
        });
    }
  };
  return (
    <>
      <DropDown
        placeholder={"Select an Item"}
        // TitleText={filterData.criteriaSelectedItem.label}
        TitleText="Value"
        onSelect={handleSelectItem}
        items={items}
        mode={DropDownMode.selectable}
        selectedItems={initvalue ?? []}
      />
    </>
  );
};

export default DropDownComp;
