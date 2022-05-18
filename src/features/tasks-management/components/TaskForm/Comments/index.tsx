import { useEffect } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import useGetTaskNotes from "../../../hooks/useGetTaskNotes";
import AddComment from "./AddComment/AddComment";
import CommentsTitle from "./CommentsTitle/CommentsTitle";
import TextBox from "./TextBox/TextBox";
import Comment from "./Comment/Comment";
import { CommentsContainer } from "./styles";
import { getCurrentUserId } from "../../../utils";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";

type CommentsProps = {
  taskId: number;
  historyId: number;
};

export default function Comments({ taskId, historyId }: CommentsProps) {
  const { ref, isVisible, setIsVisible } = useClickOutside(false);
  const { getTaskNotes, taskNotes } = useGetTaskNotes();

  const { t } = useTranslation();

  const currentUserId = getCurrentUserId();

  const showTextBox = () => {
    setIsVisible(true);
  };

  const closeTextBox = () => {
    setIsVisible(false);
    getTaskNotes(taskId);
  };

  const sortedNotes = taskNotes?.sort(
    (a, b) => +new Date(b.CreateDate) - +new Date(a.CreateDate)
  );

  useEffect(() => {
    getTaskNotes(taskId);
  }, [taskId, getTaskNotes]);

  return (
    <div>
      <CommentsTitle />
      {!isVisible && <AddComment onClick={showTextBox} />}
      {isVisible && (
        <div ref={ref}>
          <TextBox
            taskId={taskId}
            historyId={historyId}
            onClose={closeTextBox}
          />
        </div>
      )}
      {sortedNotes && (
        <CommentsContainer>
          {sortedNotes.map((note) => (
            <Comment
              key={note.ID}
              text={note.Note}
              author={
                Number(currentUserId) === note.UserID
                  ? t(translations.TasksManagement.You)
                  : note.UserName
              }
              createDate={note.CreateDate}
            />
          ))}
        </CommentsContainer>
      )}
    </div>
  );
}
