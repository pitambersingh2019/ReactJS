import { useTranslation } from "react-i18next";
import arrowDown from "../../../../../assets/icons/Arowdropdown.svg";
import { translations } from "../../../../../locales/translations";
import { useStackBy } from "../../../context/useStackBy";
import { Task } from "../../../ts";
import SectionCard from "../SectionCard/SectionCard";
import {
  ArrowDownIcon,
  CardsContainer,
  CountBox,
  SectionContainer,
  SectionLabel,
  SectionNameContainer,
  SideContainer,
} from "./section.styles";

type SectionProps = {
  name: string;
  tasks: Task[];
  isActiveSection: boolean;
  onToggleSection: () => void;
};

export default function Section({
  name,
  tasks,
  isActiveSection,
  onToggleSection,
}: SectionProps) {
  const { stackBySelectedOption } = useStackBy();

  const { t } = useTranslation();
  const translatedName =
    stackBySelectedOption === "subject"
      ? name
      : t(translations.TasksManagement[name.replace(" ", "")]);

  return tasks.length > 0 ? (
    <SectionContainer>
      <SectionNameContainer>
        <SectionLabel>{translatedName}</SectionLabel>
        <SideContainer>
          <CountBox>{tasks.length}</CountBox>
          <ArrowDownIcon
            src={arrowDown}
            alt="arrow down icon"
            onClick={onToggleSection}
          />
        </SideContainer>
      </SectionNameContainer>
      <CardsContainer open={isActiveSection}>
        {tasks.map((task) => (
          <SectionCard key={tasks.indexOf(task)} task={task} />
        ))}
      </CardsContainer>
    </SectionContainer>
  ) : null;
}
