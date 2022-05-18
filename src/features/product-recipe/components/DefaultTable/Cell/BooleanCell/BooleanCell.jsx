import React, { useState, useEffect } from "react";
import { CheckBoxWrapper } from "./boolean-cell.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectEditMode } from "../../../../slice/selectors";
import { SetChangedRecipeValue } from "../../../../slice";
import CheckBox from "../../../../../../Component/DesignSystem/CheckBox";

const BooleanCell = ({ cell }) => {
  const dispatch = useDispatch();
  const editMode = useSelector(selectEditMode);
  const [value, setValue] = useState(cell.value.value);
  const onChange = () => {
    const changedValue = {
      RecipeID: cell.row.original.ProductRecipeID,
      FValue: !value,
    };
    dispatch(SetChangedRecipeValue(changedValue));
    setValue(!value);
  };

  useEffect(() => {
    setValue(cell.value.value);
  }, [cell.value, editMode]);

  return (
    <CheckBoxWrapper editing={editMode}>
      <CheckBox
        onChange={onChange}
        checked={value === "True" || value === true ? true : false}
        TitleText=""
        height={16}
        disabled={!editMode || !cell.value.isEditable}
      />
    </CheckBoxWrapper>
  );
};

export default BooleanCell;
