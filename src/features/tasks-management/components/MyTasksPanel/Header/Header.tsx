import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import { useTaskModal } from "../../../context/useTaskModal";
import { HeaderContainer, Title } from "./header.styles";

export default function Header() {
  const { onModalOpen } = useTaskModal();
  const { t } = useTranslation();

  const tasksButton = useRef<HTMLElement | null>(null);

  const onAddNewTask = () => {
    onModalOpen(undefined);
    tasksButton.current?.click(); //close tasks panel
  };

  //run effect on each render
  useEffect(() => {
    const el = document.getElementById("react-collapse");
    tasksButton.current = el;
  });

  return (
    <HeaderContainer>
      <Title>{t(translations.TasksManagement.MyTasks)}</Title>
      <Button
        withIcon
        onClick={onAddNewTask}
        label={t(translations.TasksManagement.NewTask)}
        size="sm"
        width="110px"
      />
    </HeaderContainer>
  );
}
