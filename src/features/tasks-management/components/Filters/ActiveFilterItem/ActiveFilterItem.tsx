import { useState } from "react";
import FilterChip from "../../../../../Component/DesignSystem/FilterChip";
import ActiveFilterItemModal from "../ActiveFilterItemModal/ActiveFIlterItemModal";
import { ActiveFilterItemContainer } from "./active-filter-item.styles";

type ActiveFilterItemProps = {
  label: string;
  count: number;
  modalItems: string[] | undefined;
  onOpenDrawer: () => void;
  onDelete: () => void;
};

export default function ActiveFilterItem({
  label,
  count,
  modalItems,
  onOpenDrawer,
  onDelete,
}: ActiveFilterItemProps) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <ActiveFilterItemContainer
      onMouseEnter={toggleModal}
      onMouseLeave={toggleModal}
    >
      <FilterChip
        label={label}
        count={count}
        onClose={onDelete}
        onButtonClick={onOpenDrawer}
      />
      {showModal && modalItems && modalItems?.length > 0 && (
        <ActiveFilterItemModal modalItems={modalItems} />
      )}
    </ActiveFilterItemContainer>
  );
}
