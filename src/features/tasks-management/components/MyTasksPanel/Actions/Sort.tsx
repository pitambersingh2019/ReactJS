import { ActionsTooltip, SortContainer, SortIcon } from "./styles";
import sortIcon from "../../../../../assets/icons/tasks-management/sort.svg";
import { useState } from "react";
import SortOptionsModal from "../../Sort/SortOptionsModal/SortOptionsModal";
import { useTranslation } from "react-i18next";
import { SortOption } from "../../../ts";
import { translations } from "../../../../../locales/translations";
import { ClickAwayListener } from "@material-ui/core";

type SortProps = {
  selectedOption: string;
  onOptionClick: (option: SortOption) => void;
};
export default function Sort({ selectedOption, onOptionClick }: SortProps) {
  const [showSortModal, setShowSortModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const onShowTooltip = () => {
    //show tooltip only when modal is not visible
    !showSortModal && setShowTooltip(true);
  };

  const onSortClick = () => {
    setShowSortModal(true);
    setShowTooltip(false);
  };

  const handleOptionClick = (option: SortOption) => {
    setShowSortModal(false);
    onOptionClick(option);
  };

  const { t } = useTranslation();
  const sortOptions: SortOption[] = [
    {
      name: "TaskStartTimeTarget",
      value: t(translations.TasksManagement.StartTime),
    },
    {
      name: "HistoryCreateDate",
      value: t(translations.TasksManagement.CreateTime),
    },
    {
      name: "TaskEndTimeTarget",
      value: t(translations.TasksManagement.EndTime),
    },
    {
      name: "TaskLevel",
      value: t(translations.TasksManagement.TaskLevel),
    },
    {
      name: "TaskPriorityID",
      value: t(translations.TasksManagement.Priority),
    },
  ];

  const selected = sortOptions.find((option) => option.name === selectedOption);

  return (
    <SortContainer
      onMouseEnter={onShowTooltip}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SortIcon src={sortIcon} alt="sort icon" onClick={onSortClick} />
      {showTooltip && (
        <ActionsTooltip>
          {t(translations.TasksManagement.SortBy)}: <b>{selected?.value}</b>
        </ActionsTooltip>
      )}
      {showSortModal && (
        <ClickAwayListener onClickAway={() => setShowSortModal(false)}>
          <div>
            <SortOptionsModal
              options={sortOptions}
              selected={selected}
              onOptionClick={handleOptionClick}
              isTasksPanel
            />
          </div>
        </ClickAwayListener>
      )}
    </SortContainer>
  );
}
