import { useStackBy } from "../../../context/useStackBy";
import StackByModalItem from "./StackByModalItem";
import { StackByModalContainer } from "./styles";

export default function StackByModal() {
  const { stackByOptions, stackBySelectedOption } = useStackBy();
  const selected = stackByOptions.find(
    (option) => option.name === stackBySelectedOption
  );

  const options = stackByOptions.filter((option) => option.name !== "assignee");

  return (
    <StackByModalContainer>
      {options.map((option) => (
        <StackByModalItem
          name={option.name}
          key={option.name}
          isSelected={option.name === selected?.name}
        />
      ))}
    </StackByModalContainer>
  );
}
