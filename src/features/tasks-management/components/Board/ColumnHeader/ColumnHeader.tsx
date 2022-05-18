import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useStackBy } from "../../../context/useStackBy";
import { TaskPriority } from "../../../ts";
import { HeaderTitle, StyledHeader } from "./column-header.styles";
import PriorityHeader from "./PriorityHeader";

type ColumnHeaderProps = {
  title: string;
  count: number;
  isDraggingOver: boolean;
};

export default function ColumnHeader({
  title,
  count,
  isDraggingOver,
}: ColumnHeaderProps) {
  const { t } = useTranslation();
  const { stackBySelectedOption } = useStackBy();
  const isUnassigned =
    title === "Unassigned" && stackBySelectedOption === "status";

  const translatedUnassigned = t(translations.TasksManagement.Unassigned);

  const getTranslatedHeader = () => {
    if (stackBySelectedOption === "assignee") {
      return title === "Unassigned" ? translatedUnassigned : title;
    }
    if (stackBySelectedOption === "subject") {
      return title;
    }
    return t(translations.TasksManagement[title.replace(" ", "")]);
  };

  const translatedHeader = getTranslatedHeader();

  return (
    <StyledHeader isUnassigned={isUnassigned} isDraggingOver={isDraggingOver}>
      {stackBySelectedOption === "priority" ? (
        <PriorityHeader
          priority={TaskPriority[title as keyof typeof TaskPriority]}
        />
      ) : (
        <HeaderTitle>{translatedHeader}</HeaderTitle>
      )}
      <div className="count-box">
        <span>{count}</span>
      </div>
    </StyledHeader>
  );
}
