import { DeleteIconContainer, StyledDeleteIcon } from "./styles";
import deleteIcon from "../../../../../../assets/icons/tasks-management/delete.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import DeleteFilterSetModal from "./DeleteFilterSetModal";
import { ToolTipComp } from "../../Components/ToolTip";
export default function DeleteIcon({
  option,
  onDeleteComplete,
  handleRemoveFilterSet,
  selectedItem,
  setListItems,
  setSelectedFilterSet,
}) {
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation();

  const handleIconClick = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
    // setSelectedFilterSet(undefined);
  };

  const onDelete = async () => {
    const resetSelected = selectedItem
      ? selectedItem.value === option.value
      : false;
    //we are deleteing selected filter set from dropdown!
    if (selectedItem) {
      if (selectedItem.value === option.value) {
        handleRemoveFilterSet(option.value);
        setListItems([]);
        setSelectedFilterSet(null);
      } else {
        handleRemoveFilterSet(option.value);
      }
    } else {
      handleRemoveFilterSet(option.value);
    }

    onModalClose();
    onDeleteComplete(resetSelected);
  };

  return (
    <ToolTipComp title={t(translations.TasksManagement.DeleteFilterSet)}>
      <DeleteIconContainer>
        <StyledDeleteIcon
          src={deleteIcon}
          alt="delete icon"
          onClick={(e) => handleIconClick(e)}
        />
        {showModal && (
          <DeleteFilterSetModal
            isOpen={showModal}
            handleClose={onModalClose}
            onDelete={onDelete}
          />
        )}
      </DeleteIconContainer>
    </ToolTipComp>
  );
}
