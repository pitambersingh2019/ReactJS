import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import useClickOutside from "../../../hooks/useClickOutside";
import { SortOption } from "../../../ts";
import SortOptionsModal from "../SortOptionsModal/SortOptionsModal";
import { Container, Label, StyledSortButton } from "./sort-button.styles";

type SortButtonProps = {
  selectedOption: string;
  onOptionClick: (option: SortOption) => void;
};

export default function SortButton({
  selectedOption,
  onOptionClick,
}: SortButtonProps) {
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
      name: "AssigneeDisplayName",
      value: t(translations.TasksManagement.UserName),
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

  const { isVisible, setIsVisible, ref } = useClickOutside(false);

  return (
    <Container>
      <Label>{t(translations.TasksManagement.SortBy)}:</Label>
      <StyledSortButton onClick={() => setIsVisible(!isVisible)}>
        <span className="selected">{selected?.value}</span>
        {isVisible && (
          <div ref={ref}>
            <SortOptionsModal
              options={sortOptions}
              selected={selected}
              onOptionClick={onOptionClick}
            />
          </div>
        )}
      </StyledSortButton>
    </Container>
  );
}
