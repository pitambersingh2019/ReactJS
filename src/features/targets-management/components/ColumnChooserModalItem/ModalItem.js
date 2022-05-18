import checkbox from "../../../../assets/icons/checkbox.svg";
import checkboxChecked from "../../../../assets/icons/checkbox-checked-purple.svg";
import useShowHideTargets from "../../hooks/useShowHideTargets";
import { Checkbox, ColumnTitle, ModalItemContainer } from "./modal-item.styles";
import { useValues } from "../../hooks/useValues";

export default function ModalItem({ columnTitle, targetName, checked }) {
  const [toggleTarget] = useShowHideTargets();
  const { fetchValues } = useValues();

  const toggleChecked = async () => {
    await toggleTarget({ targetName, checked: !checked });
    fetchValues();
  };

  return (
    <ModalItemContainer>
      <Checkbox
        src={checked ? checkboxChecked : checkbox}
        alt="checkbox"
        onClick={toggleChecked}
      />
      <ColumnTitle>{columnTitle}</ColumnTitle>
    </ModalItemContainer>
  );
}
