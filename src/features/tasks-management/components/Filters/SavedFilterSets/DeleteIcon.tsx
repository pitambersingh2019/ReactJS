import {
  DeleteIconContainer,
  StyledDeleteIcon,
  StyledDeleteTooltip,
} from "./styles";
import deleteIcon from "../../../../../assets/icons/tasks-management/delete.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { Item } from "../../../../../Component/DesignSystem/DropDown/types";
import useDeleteFilterSet from "../../../hooks/useDeleteFilterSet";
import { useSelectedFilterSet } from "../../../context/useSelectedFilterSet";
import { useSavedFilters } from "../../../context/useSavedFilters";
import DeleteFilterSetModal from "./DeleteFilterSetModal";

type DeleteIconProps = {
  option: Item;
  onDeleteComplete: () => void;
  isLastChild: boolean;
  isOnlyChild: boolean;
};

export default function DeleteIcon({
  option,
  onDeleteComplete,
  isLastChild,
  isOnlyChild,
}: DeleteIconProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { deleteFilterSet } = useDeleteFilterSet();
  const { setSelectedFilterSet } = useSelectedFilterSet();
  const { fetchSavedFilters } = useSavedFilters();
  const { t } = useTranslation();

  const handleIconClick = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const onModalClose = () => {
    setShowModal(false);
    setSelectedFilterSet(undefined);
  };

  const onDelete = async () => {
    await deleteFilterSet(option.value);
    onModalClose();
    fetchSavedFilters();
    onDeleteComplete();
  };

  return (
    <DeleteIconContainer
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StyledDeleteIcon
        src={deleteIcon}
        alt="delete icon"
        onClick={(e) => handleIconClick(e)}
      />
      {showTooltip && (
        <StyledDeleteTooltip
          isLastChild={isLastChild}
          isOnlyChild={isOnlyChild}
        >
          {t(translations.TasksManagement.DeleteFilterSet)}
        </StyledDeleteTooltip>
      )}
      {showModal && (
        <DeleteFilterSetModal
          isOpen={showModal}
          handleClose={onModalClose}
          onDelete={onDelete}
        />
      )}
    </DeleteIconContainer>
  );
}
