import { useState } from "react";

import chooser from "../../../../assets/icons/column-chooser.svg";
import ColumnChooserModal from "../ColumnChooserModal/ColumnChooserModal";
import { StyledIcon } from "./last-column-header.styles";

export default function LastColumnHeader() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  return (
    <>
      <StyledIcon src={chooser} alt="column-chooser" onClick={toggleModal} />
      <ColumnChooserModal isOpen={modalIsOpen} />
    </>
  );
}
