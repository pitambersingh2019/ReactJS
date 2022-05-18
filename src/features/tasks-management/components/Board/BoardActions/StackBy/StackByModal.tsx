import { useStackBy } from "../../../../context/useStackBy";
import ModalItem from "./ModalItem";
import { ModalContainer } from "./styles";

export default function StackByModal() {
  const { stackByOptions, stackBySelectedOption } = useStackBy();
  const selected = stackByOptions.find(
    (option) => option.name === stackBySelectedOption
  );
  return (
    <ModalContainer>
      {stackByOptions.map((option) => (
        <ModalItem
          name={option.name}
          key={option.name}
          isSelected={option.name === selected?.name}
        />
      ))}
    </ModalContainer>
  );
}
