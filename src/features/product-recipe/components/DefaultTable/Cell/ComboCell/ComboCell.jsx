import { useEffect, useState } from "react";
// import SmallSingleSelect from "./SingleSelect/SingleSelect";
// import { useDispatch, useSelector } from "react-redux";
// import { selectEditMode } from "../../../../slice/selectors";
// import { SetChangedRecipeValue } from "../../../../slice";
import { ComboText } from "./combo-cell.styles";
import { loadStateLang } from "../../../../../../AppStart";

const ComboCell = ({ cell }) => {
  const lang = JSON.parse(loadStateLang());
  // const dispatch = useDispatch();
  // const editMode = useSelector(selectEditMode);
  const [selected, setSelected] = useState(undefined);
  // const [comboValues, setComboValues] = useState(undefined);

  useEffect(() => {
    // const items = cell.row.original.ComboValues.map((item) => ({
    //   label: lang === "eng" ? item.ComboQueryEField : item.ComboQueryHField,
    //   value: item.ComboValueField,
    // }));

    const selectedItem = cell.row.original.ComboValues.find(
      (item) => item.isDefault === true
    );

    // setComboValues(items);
    setSelected(
      lang === "eng"
        ? selectedItem?.ComboQueryEField
        : selectedItem?.ComboQueryHField
    );
  }, [cell]);

  // const handleSelect = (item) => {
  //   const changedValue = {
  //     RecipeID: cell.row.original.ProductRecipeID,
  //     FValue: item.value,
  //   };
  //   dispatch(SetChangedRecipeValue(changedValue));
  //   setSelected(item);
  // };

  return (
    <>
      {/* {editMode && cell.value.isEditable ? (
        <SmallSingleSelect
          selectedItem={selected}
          items={comboValues}
          onSelect={handleSelect}
        />
      ) : (
        <ComboText>{selected?.label}</ComboText>
      )} */}
      <ComboText>{selected}</ComboText>
    </>
  );
};

export default ComboCell;
