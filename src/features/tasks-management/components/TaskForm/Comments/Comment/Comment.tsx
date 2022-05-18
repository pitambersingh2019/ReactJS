import {
  Author,
  AuthorContainer,
  CommentContainer,
  PersonIcon,
  Text,
} from "./comment.styles";
import personIcon from "../../../../../../assets/icons/tasks-management/user.svg";
import Timestamp from "../Timestamp/Timestamp";

type CommentProps = {
  text: string;
  author: string;
  createDate: string;
};

export default function Comment({ text, author, createDate }: CommentProps) {
  return (
    <CommentContainer>
      <AuthorContainer>
        <PersonIcon src={personIcon} alt="person icon" />
        <Author>{author}</Author>
        <Timestamp createDate={createDate} />
      </AuthorContainer>
      <Text>{text}</Text>
    </CommentContainer>
  );
}
