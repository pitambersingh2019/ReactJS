import { useTranslation } from "react-i18next";
import statusIcon from "../../../../../assets/icons/tasks-management/status.svg";
import { translations } from "../../../../../locales/translations";
import { useStackBy } from "../../../context/useStackBy";
import { StatusContainer, Label, Icon } from "./status.styles";

type StatusProps = {
  status: string;
};

export default function Status({ status }: StatusProps) {
  const { t } = useTranslation();
  const { stackBySelectedOption } = useStackBy();
  return (
    <StatusContainer noMargin={stackBySelectedOption === "priority"}>
      <Icon src={statusIcon} alt="status icon" />
      <Label>{t(translations.TasksManagement[status.replace(" ", "")])}</Label>
    </StatusContainer>
  );
}
