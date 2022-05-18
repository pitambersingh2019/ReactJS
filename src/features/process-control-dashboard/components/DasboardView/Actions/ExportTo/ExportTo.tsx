import arrow from "../../../../../../assets/icons/Arowdropdown.svg";
import {
  DropdownIcon,
  ExportIcon,
  ExportToContainer,
} from "./export-to.styles";
import { useState } from "react";
import ExportToModal from "./ExportToModal/ExportToModal";
import exportIcon from "../../../../../../assets/icons/export.svg";

type ExportToProps = {
  onExportToPDF: () => void;
};

export default function ExportTo({ onExportToPDF }: ExportToProps) {
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onShowModal = () => {
    setShowModal(true);
  };
  return (
    <ExportToContainer>
      <ExportIcon src={exportIcon} alt="export icon" />
      <DropdownIcon src={arrow} alt="arrow icon" onClick={onShowModal} />
      {showModal && (
        <ExportToModal
          onCloseModal={onCloseModal}
          onExportToPDF={onExportToPDF}
        />
      )}
    </ExportToContainer>
  );
}
