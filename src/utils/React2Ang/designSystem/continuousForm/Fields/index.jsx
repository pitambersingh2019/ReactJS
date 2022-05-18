import React from "react";
import InputTextField from "./InputText";
import MultiSelectDropField from "./MultiSelectDropDown";
import BooleanDropDownField from "./BooleanDropDown";
import SingleSelectDropField from "./SingleSelectDropDown";
import DatePickerField from "./DatePicker";
const Index = ({ field, SaveValues, DeleteValues }) => {
  switch (field.DisplayType) {
    case 1:
      return (
        <InputTextField
          field={field}
          SaveValues={SaveValues}
          DeleteValues={DeleteValues}
        />
      );

    case 2:
      return (
        <>
          {field.ComboDisplayList ? (
            <MultiSelectDropField
              field={field}
              SaveValues={SaveValues}
              DeleteValues={DeleteValues}
            />
          ) : (
            <SingleSelectDropField
              field={field}
              SaveValues={SaveValues}
              DeleteValues={DeleteValues}
            />
          )}
        </>
      );
    case 3:
      return (
        <BooleanDropDownField
          field={field}
          SaveValues={SaveValues}
          DeleteValues={DeleteValues}
        />
      );
    case 7:
      return (
        <DatePickerField
          field={field}
          SaveValues={SaveValues}
          DeleteValues={DeleteValues}
        />
      );
    default:
      return <div>no</div>;
  }
};

export default Index;
