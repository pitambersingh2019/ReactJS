import React, { useState, useEffect } from "react";
import { StyledInput } from "./material-editable-cell.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectEditMode } from "../../../../slice/selectors";
import { SetChangedRecipeValue } from "../../../../slice";

// Create an editable cell renderer
const MaterialEditableCell = ({ cell }) => {
  const dispatch = useDispatch();
  const editMode = useSelector(selectEditMode);
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(cell.value.value.FValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We"ll only update the external data when the input is blurred
  const onBlur = (e) => {
    const changedValue = {
      RecipeID: cell.value.value.ProductRecipeID,
      FValue: e.target.value,
    };
    dispatch(SetChangedRecipeValue(changedValue));
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(cell.value.value.FValue);
  }, [cell.value.value, editMode]);

  return (
    <StyledInput
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onWheel={(e) => e.target.blur()}
      disabled={!editMode || !cell.value.isEditable}
      type={cell.value.value.DisplayType === "num" ? "number" : "text"}
      onKeyUp={(event) => {
        if (cell.value.value.DisplayType === "num") {
          if (event.keyCode === 109) event.preventDefault();
          event.target.value = Number(event.target.value);
        }
      }}
    />
  );
};

export default MaterialEditableCell;
