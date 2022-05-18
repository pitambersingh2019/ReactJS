import { useState } from "react";

import cancel from "../../../../assets/icons/cancel.svg";
import cancelHover from "../../../../assets/icons/cancel-hover.svg";
import save from "../../../../assets/icons/save-purple.svg";
import saveDisabled from "../../../../assets/icons/save-disabled.svg";
import saveHover from "../../../../assets/icons/save-hover.svg";
import {
  StyledActionIcon,
  StyledIconsContainer,
} from "./save-cancel-icons.styles.js";

const SaveCancelIcons = ({ onCancel, onSave, cells, isEditing }) => {
  const [isSaveHover, setIsSaveHover] = useState(false);
  const [isCancelHover, setIsCancelHover] = useState(false);

  const areCellsValid = cells?.find((c) => c?.isValid === false);

  const toggleSaveHover = () => {
    setIsSaveHover((prev) => setIsSaveHover(!prev));
  };

  const toggleCancelHover = () => {
    setIsCancelHover((prev) => setIsCancelHover(!prev));
  };
  const renderSaveIcon = () => {
    if (!areCellsValid) {
      return isSaveHover ? saveHover : save;
    } else {
      return saveDisabled;
    }
  };

  return (
    isEditing && (
      <StyledIconsContainer>
        <StyledActionIcon
          src={renderSaveIcon()}
          alt="save-icon"
          onClick={onSave}
          disabled={areCellsValid}
          onMouseEnter={toggleSaveHover}
          onMouseLeave={toggleSaveHover}
        />
        <StyledActionIcon
          src={isCancelHover ? cancelHover : cancel}
          alt="cancel-icon"
          onClick={onCancel}
          onMouseEnter={toggleCancelHover}
          onMouseLeave={toggleCancelHover}
        />
      </StyledIconsContainer>
    )
  );
};

export default SaveCancelIcons;
