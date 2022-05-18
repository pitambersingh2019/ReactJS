import {
  SortContainer,
  SortIcon,
  SortModal,
  SortModalItem,
} from "./sort.styles";
import sortIcon from "../../../../assets/img/sort.svg";
import purpleSortIcon from "../../../../assets/img/sort-purple.svg";
import { useEffect, useRef, useState } from "react";
import {
  SortFieldOption,
  useSortFieldState,
  useSortFieldUpdaterState,
} from "../../../../context/SortFieldsContext";

export default function Sort() {
  const [showModal, setShowModal] = useState(false);

  const { sortOptions, selectedOption } = useSortFieldState();
  const { setSelectedOption } = useSortFieldUpdaterState();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const onHideModal = () => {
    setShowModal(false);
  };

  const onOptionClick = (option: SortFieldOption["value"]) => {
    setSelectedOption(option);
    onHideModal();
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: TouchEvent | MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onHideModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <SortContainer ref={ref}>
      <SortIcon
        src={showModal ? purpleSortIcon : sortIcon}
        alt="sort icon"
        onClick={toggleModal}
      />
      {showModal && (
        <SortModal>
          {sortOptions.map((option) => (
            <SortModalItem
              key={option.value}
              isSelected={option.value === selectedOption}
              onClick={() => onOptionClick(option.value)}
            >
              {option.label}
            </SortModalItem>
          ))}
        </SortModal>
      )}
    </SortContainer>
  );
}
