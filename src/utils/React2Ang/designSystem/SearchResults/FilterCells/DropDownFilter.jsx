/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from "react";
import SingleSelect from "../../../../../Component/DesignSystem/DropDown/SingleSelect";
import { DropDownMode } from "../../../../../Component/DesignSystem/DropDown/types";

const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id, Filteroptions },
}) => {
  // const options = React.useMemo(() => {
  //   const options = new Map();
  //   preFilteredRows.forEach((row) => {
  //     const item = {
  //       value: row.values[id].toString(),
  //       label: row.values[id].toString(),
  //     };
  //     options.set(item.value, item);
  //   });
  //   return [...options.values()];
  // }, [id, preFilteredRows]);

  //value : filterValue
  // set : setFilter(e.target.value || undefined);
  const selectedItem = useMemo(
    () => Filteroptions.find((elem) => elem.value === filterValue),
    [Filteroptions, filterValue]
  );

  return (
    <div style={{ width: "100%" }}>
      <SingleSelect
        placeholder={"All"}
        onSelect={function (item) {
          if (item) setFilter(item.value);
          else setFilter(undefined);
        }}
        items={Filteroptions}
        mode={DropDownMode.selectable}
        selectedItem={selectedItem}
        searchable={false}
        varient="smallblue"
      />
    </div>
  );
};
export default SelectColumnFilter;
