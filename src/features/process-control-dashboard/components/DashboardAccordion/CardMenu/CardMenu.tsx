import { CardMenuContainer, MenuIcon } from "./card-menu.styles";
import dots from "../../../../../assets/icons/3_dots_menu.svg";
import React, { useState } from "react";
import { ClickAwayListener } from "@material-ui/core";

import CardMenuModal from "./CardMenuModal";
import DeleteDashboardModal from "../DeleteDashboardModal/DeleteDashboardModal";

type CardMenuProps = {
  isCreatedByOthers?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
};

export default function CardMenu({
  isCreatedByOthers,
  onEdit,
  onDelete,
  onDuplicate,
}: CardMenuProps) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onShowModal = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const onHideModal = () => {
    setShowModal(false);
  };

  const onCloseDeleteDashboardModal = () => {
    setShowDeleteModal(false);
  };

  const onDeleteDashboard = () => {
    onHideModal();
    setShowDeleteModal(true);
  };

  return (
    <CardMenuContainer>
      <MenuIcon src={dots} alt="menu icon" onClick={onShowModal} />
      {showModal && (
        <ClickAwayListener onClickAway={onHideModal}>
          <div>
            <CardMenuModal
              isCreatedByOthers={isCreatedByOthers}
              onEdit={onEdit}
              onDelete={onDeleteDashboard}
              onDuplicate={onDuplicate}
              hideModal={onHideModal}
            />
          </div>
        </ClickAwayListener>
      )}
      <DeleteDashboardModal
        isOpen={showDeleteModal}
        handleClose={onCloseDeleteDashboardModal}
        onDelete={onDelete}
      />
    </CardMenuContainer>
  );
}
