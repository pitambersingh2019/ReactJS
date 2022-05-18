import { CommentsContainer } from "./comments.styles";
import icon from "../../../../../assets/icons/tasks-management/comments.svg";

type CommentsProps = {
  numOfComments: number;
};

export default function Comments({ numOfComments }: CommentsProps) {
  return (
    <CommentsContainer>
      <img src={icon} alt="comments icon" />
      <span>{numOfComments}</span>
    </CommentsContainer>
  );
}
