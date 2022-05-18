import { useTranslation } from "react-i18next";
import { loadStateLang } from "../../../../../AppStart";
import { translations } from "../../../../../locales/translations";
import { useStackBy } from "../../../context/useStackBy";
import { useTaskModal } from "../../../context/useTaskModal";
import { Status, Task } from "../../../ts";
import { isStartOverdue } from "../../../utils/date-time-helpers";
import Assignee from "../../Card/Assignee/Assignee";
import Description from "../../Card/Description/Description";
import Level from "../../Card/Level/Level";
import Overdue from "../../Card/Overdue/Overdue";
import SubjectRow from "../../Card/SubjectRow/SubjectRow";
import SubSubject from "../../Card/SubSubject/SubSubject";
import TaskId from "../../Card/TaskId/TaskId";
import TopRow from "../../Card/TopRow/TopRow";
import { SectionCardContainer } from "./section-card.styles";

type SectionCardProps = {
  task: Task;
};

export default function SectionCard({ task }: SectionCardProps) {
  const { stackBySelectedOption } = useStackBy();
  const { t } = useTranslation();

  const isOverdue = task.EndTimeException === 1 || isStartOverdue(task);

  const { onModalOpen } = useTaskModal();

  const handleCardClick = () => {
    onModalOpen(task);
  };

  const lang = JSON.parse(loadStateLang());

  return (
    <SectionCardContainer isOverdue={isOverdue} onClick={handleCardClick}>
      <TopRow task={task} />
      <Assignee name={t(translations.TasksManagement.You)} noPadding />
      {stackBySelectedOption !== "subject" ? (
        <SubjectRow
          subject={task.SubjectTrans}
          subSubject={task.SubSubjects && task.SubSubjects[0].Text}
          isSmallMargin={
            stackBySelectedOption === "assignee" &&
            task.TaskStatus === Status.Unassigned
          }
        />
      ) : (
        <SubSubject
          subSubject={task.SubSubjects && task.SubSubjects[0].Text}
          withTopMargin={task.AssigneeDisplayName !== null}
        />
      )}
      <Description description={task.Text} />
      {task.TaskLevel && (
        <Level
          level={task.LevelName}
          name={lang === "eng" ? task.EName : task.LName}
          isSmallMargin={
            stackBySelectedOption === "assignee" &&
            task.TaskStatus === Status.Unassigned
          }
        />
      )}
      {isOverdue ? <Overdue /> : null}
      <TaskId taskId={task.ID} />
    </SectionCardContainer>
  );
}
