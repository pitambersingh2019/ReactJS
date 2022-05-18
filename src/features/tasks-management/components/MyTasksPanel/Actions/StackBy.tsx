import { ClickAwayListener } from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import stackByIcon from "../../../../../assets/icons/tasks-management/stack-by.svg";
import { translations } from "../../../../../locales/translations";
import { useStackBy } from "../../../context/useStackBy";
import StackByModal from "./StackByModal";
import { ActionsTooltip, StackByContainer, StackByIcon } from "./styles";

export default function StackBy() {
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const { stackBySelectedOption, stackByOptions } = useStackBy();
  const { t } = useTranslation();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    setShowTooltip(false);
  };

  const selected = stackByOptions.find(
    (options) => options.name === stackBySelectedOption
  );

  const onShowTooltip = () => {
    //show tooltip only when modal is not visible
    !showModal && setShowTooltip(true);
  };

  return (
    <StackByContainer
      onClick={toggleModal}
      onMouseEnter={onShowTooltip}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <StackByIcon src={stackByIcon} alt="stack by icon" />
      {showTooltip && (
        <ActionsTooltip>
          {t(translations.TasksManagement.GroupBy)}: <b>{selected?.value}</b>
        </ActionsTooltip>
      )}
      {showModal && (
        <ClickAwayListener onClickAway={toggleModal}>
          <div>
            <StackByModal />
          </div>
        </ClickAwayListener>
      )}
    </StackByContainer>
  );
}
