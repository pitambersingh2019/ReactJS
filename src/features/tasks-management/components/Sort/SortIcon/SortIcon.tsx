import { useState } from "react";
import icon from "../../../../../assets/icons/tasks-management/sort.svg";
import { StyledSortIcon } from "./sort-icon.styles";

type SortIconProps = {
  onClick: () => void;
};

export default function SortIcon({ onClick }: SortIconProps) {
  const [rotate, setRotate] = useState(false);

  const handleClick = () => {
    setRotate((prev) => !prev);
    onClick();
  };
  return (
    <StyledSortIcon
      src={icon}
      alt="sort icon"
      onClick={handleClick}
      isRotate={rotate}
    />
  );
}
