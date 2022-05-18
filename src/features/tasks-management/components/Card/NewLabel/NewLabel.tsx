import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useNewTaskId } from "../../../context/useNewTaskId";
import { NewLabelContainer, Text } from "./new-label.styles";

export default function NewLabel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { setNewTaskId } = useNewTaskId();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setNewTaskId(undefined);
    }, 10000);

    return () => {
      clearTimeout(timeId);
    };
  }, [setNewTaskId]);

  return (
    <NewLabelContainer ref={scrollRef}>
      <Text>{t(translations.TasksManagement.New)}</Text>
    </NewLabelContainer>
  );
}
