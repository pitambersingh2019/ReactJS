import { ReactNode } from "react";
import arrowIcon from "../../../../../../assets/icons/Arowdropdown.svg";
import RadioButton from "../RadioButton/RadioButton";
import {
  ArrowIcon,
  SectionContainer,
  SectionHeaderContainer,
} from "./section.styles";
import Collapse from "@mui/material/Collapse";

type SectionProps = {
  title: string;
  children: ReactNode;
  isSelected: boolean;
  onSelect: () => void;
};

export default function Section({
  title,
  children,
  isSelected,
  onSelect,
}: SectionProps) {
  return (
    <SectionContainer>
      <SectionHeaderContainer>
        <ArrowIcon
          src={arrowIcon}
          alt="arrow icon"
          opened={isSelected}
          onClick={onSelect}
        />
        <RadioButton
          label={title}
          isSelected={isSelected}
          handleSelect={onSelect}
        />
      </SectionHeaderContainer>
      <Collapse in={isSelected}>{children}</Collapse>
    </SectionContainer>
  );
}
