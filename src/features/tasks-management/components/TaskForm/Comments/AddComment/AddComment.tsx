import { AddCommentContainer, PlusIcon, Text } from "./add-comment.styles";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import icon from "../../../../../../assets/icons/plus-purple.svg";

type AddCommentProps = {
  onClick: () => void;
};

export default function AddComment({ onClick }: AddCommentProps) {
  const { t } = useTranslation();
  return (
    <AddCommentContainer onClick={onClick}>
      <PlusIcon src={icon} alt="plus icon" />
      <Text>{t(translations.TasksManagement.AddComment)}</Text>
    </AddCommentContainer>
  );
}
