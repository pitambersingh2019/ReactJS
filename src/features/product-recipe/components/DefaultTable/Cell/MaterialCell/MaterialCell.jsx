import React, { useState, useEffect } from "react";
import {
  MaterialCellWrapper,
  MaterialName,
  LeftSide,
  RightSide,
  SettingIcon,
} from "./material-cell.styled";
import { useSelector, useDispatch } from "react-redux";
import { SetChangedRecipeValue } from "../../../../slice";
import { selectEditMode } from "../../../../slice/selectors";
import PopupIcon from "../../../../../../assets/icons/recipe/popup-modal.svg";
import DeleteIcon from "../../../../../../assets/icons/card_delete.svg";
import Modal from "../../../Modal/Modal";
import SelectMaterialID from "../../../SelectMaterialID/SelectMaterialID";
import ToolTip from "../../../Tooltip";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import _startCase from "lodash/startCase";

const MaterialCell = ({ cell }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const editMode = useSelector(selectEditMode);
  const [materialName, setMaterialName] = useState(cell.value.value.FValue);
  const modalTitle = `Select a ${_startCase(cell.value.value.PropertyEName)}`;
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(undefined);
  const handlShowModal = () => {
    setShowModal(!showModal);
  };
  const disableApply = materialName || selectedRow ? false : true;

  const handleApply = () => {
    if (selectedRow) {
      setMaterialName(selectedRow.MaterialID);
      setShowModal(false);
    } else {
      setMaterialName("");
    }
    const changedValue = {
      RecipeID: cell.value.value.ProductRecipeID,
      FValue: selectedRow ? selectedRow.MaterialID : "",
    };
    dispatch(SetChangedRecipeValue(changedValue));
    setSelectedRow(undefined);
  };

  useEffect(() => {
    setMaterialName(cell.value.value.FValue);
  }, [cell.value.value, editMode]);

  return (
    <MaterialCellWrapper editing={editMode}>
      <LeftSide>
        <MaterialName>{materialName}</MaterialName>
      </LeftSide>
      {editMode && cell.value.isEditable && (
        <RightSide>
          {materialName && (
            <ToolTip
              title={<div>{t(translations.ProductRecipe.CLEAR_DATA)}</div>}
            >
              <SettingIcon src={DeleteIcon} onClick={() => handleApply()} />
            </ToolTip>
          )}
          <SettingIcon src={PopupIcon} onClick={() => handlShowModal()} />
        </RightSide>
      )}
      {showModal && (
        <Modal
          closeModal={handlShowModal}
          handleApply={handleApply}
          title={modalTitle}
          disableApply={disableApply}
          Content={
            <SelectMaterialID
              onSelect={setSelectedRow}
              selectedItem={materialName}
            />
          }
        />
      )}
    </MaterialCellWrapper>
  );
};

export default MaterialCell;
