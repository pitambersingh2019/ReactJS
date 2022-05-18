import { Item, ModalContainer } from "./active-filter-item-modal.styles";

type ActiveFilterItemModalProps = {
  modalItems: string[];
};

export default function ActiveFilterItemModal({
  modalItems,
}: ActiveFilterItemModalProps) {
  return (
    <ModalContainer>
      {modalItems.map((item, idx) => (
        <Item key={idx}>{item}</Item>
      ))}
    </ModalContainer>
  );
}
