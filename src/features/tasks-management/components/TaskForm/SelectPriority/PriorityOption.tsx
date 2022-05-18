import { TaskPriority } from "../../../ts";
import {
  Label,
  PriotiryOptionContainer,
  Radio,
} from "./select-priority.styles";

type PriorityOptionProps = {
  priority: string;
  value: TaskPriority;
  handleSelect: (value: TaskPriority) => void;
  isSelected: boolean;
  disabled: boolean;
};

export default function PriorityOption({
  priority,
  value,
  handleSelect,
  isSelected,
  disabled,
}: PriorityOptionProps) {
  return (
    <PriotiryOptionContainer>
      <Radio
        type="radio"
        checked={isSelected}
        data-name={value}
        onChange={(e) =>
          handleSelect(
            e.currentTarget.getAttribute("data-name") as unknown as TaskPriority
          )
        }
        disabled={disabled}
      />
      <Label data-name={value}>{priority}</Label>
    </PriotiryOptionContainer>
  );
}
