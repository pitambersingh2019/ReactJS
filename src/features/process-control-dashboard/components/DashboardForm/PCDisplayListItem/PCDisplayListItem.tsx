import {
  ActionsContainer,
  Container,
  DeleteIcon,
  Name,
  PencilIcon,
} from "./pc-display-list-item.styles";
import pencilIcon from "../../../../../assets/icons/pencil.svg";
import deleteIcon from "../../../../../assets/icons/tasks-management/delete.svg";
import { useDisplayForm } from "../../../context/useDisplayForm";
import { useState } from "react";
import Combo from "../Combo/Combo";
import { PCParam } from "../../../ts";
import { useShowCombo } from "../../../context/useShowCombo";
import DeleteParamModal from "./DeleteParamModal";
import { useEditing } from "../../../context/useEditing";

type PCDisplayListItemProps = {
  pcDisplay: PCParam;
  onScroll: () => void;
};

export default function PCDisplayListItem({
  pcDisplay,
  onScroll,
}: PCDisplayListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { setPCDisplay } = useDisplayForm();
  const { setShowCombo } = useShowCombo();
  const { setEditing } = useEditing();

  const onDelete = () => {
    setPCDisplay((prev) => {
      const updatedPcDisplays = [...prev.PCParams].map((param) =>
        param.ParamID === pcDisplay.ParamID
          ? { ...pcDisplay, UpsertType: 1 as PCParam["UpsertType"] }
          : param
      );
      return {
        ...prev,
        PCParams: updatedPcDisplays,
      };
    });
  };

  const onEdit = () => {
    setIsEditing(true);
    setEditing(true); //to disable Done button
  };

  const onHideCombo = () => {
    setIsEditing(false);
    setShowCombo(false);
    setEditing(false); //to enable Done button
  };

  const onCloseDeleteParamModal = () => {
    setShowDeleteModal(false);
  };

  const onShowDeleteParamModal = () => {
    setShowDeleteModal(true);
  };

  const name = `${pcDisplay.MachineName} | ${pcDisplay.ParamDisplayName}`;

  return isEditing ? (
    <Combo
      hideCombo={onHideCombo}
      pcDisplayId={pcDisplay.ParamID}
      onScroll={onScroll}
    />
  ) : (
    <Container>
      <Name>{name}</Name>
      <ActionsContainer>
        <PencilIcon src={pencilIcon} alt="pencil icon" onClick={onEdit} />
        <DeleteIcon
          src={deleteIcon}
          alt="delete icon"
          onClick={onShowDeleteParamModal}
        />
      </ActionsContainer>
      <DeleteParamModal
        isOpen={showDeleteModal}
        handleClose={onCloseDeleteParamModal}
        onDelete={onDelete}
      />
    </Container>
  );
}
