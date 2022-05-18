import { KeyboardEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../../locales/translations";
import useCreateNotes from "../../../../hooks/useCreateNotes";
import {
  ButtonContainer,
  TextBoxContainer,
  TextInput,
} from "./text-box.styles";

type TextBoxProps = {
  taskId: number;
  historyId: number;
  onClose: () => void;
};

export default function TextBox({ taskId, historyId, onClose }: TextBoxProps) {
  const [value, setValue] = useState("");

  const { createNotes } = useCreateNotes();

  const { t } = useTranslation();

  const handleResize = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    (e.target as HTMLTextAreaElement).style.height = "inherit";
    (e.target as HTMLTextAreaElement).style.height = `${Math.min(
      (e.target as HTMLTextAreaElement).scrollHeight,
      70
    )}px`;
    onEnterPress(e);
  };

  const onSaveNote = async () => {
    await createNotes({ text: value, taskId, historyId });
    onClose();
  };

  const onSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSaveNote();
  };

  const onEnterPress = (
    e: KeyboardEvent<HTMLButtonElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSaveNote();
    }
  };
  return (
    <TextBoxContainer>
      <TextInput
        value={value}
        onChange={(text) => setValue(text.target.value)}
        placeholder={t(translations.TasksManagement.WriteComment)}
        onKeyDown={handleResize}
      />
      <ButtonContainer>
        <Button
          label={t(translations.TasksManagement.Save)}
          onClick={onSaveClick}
          size="md"
          width="88px"
          disabled={value.trim().length < 1}
          onKeyDown={onEnterPress}
        />
      </ButtonContainer>
    </TextBoxContainer>
  );
}
