import { useEffect, useState, ReactNode } from "react";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import { ClickAwayListener } from "@material-ui/core";
import checkmark from "../../../../../../../assets/icons/checkmark.svg";
import {
  Container,
  DropDownButton,
  DropDownContainer,
  DropDownListContainer,
  ListItem,
  SelectedText,
  StyledCheckmarkIcon,
} from "./single-select.styles";
import { useTheme } from "styled-components";

interface Item {
  value: number;
  label: string;
  childComponent?: ReactNode;
}

type SmallSingleSelectProps = {
  onSelect: (item: Item) => void;
  items: Item[];
  selectedItem: Item | undefined;
};

export default function SmallSingleSelect({
  onSelect,
  items,
  selectedItem,
}: SmallSingleSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Item | undefined>(selectedItem);

  const theme = useTheme();

  useEffect(() => {
    setSelected(selectedItem);
  }, [selectedItem]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (item: Item) => {
    onSelect(item);
    setSelected(item);
    setIsOpen(false);
  };

  return (
    <Container>
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <DropDownContainer>
          <DropDownButton onClick={toggleOpen} isOpen={isOpen}>
            <SelectedText>{selected?.label}</SelectedText>
            <ExpandMoreSharpIcon
              style={{
                color: theme.colors.gray3,
              }}
            />
          </DropDownButton>
          {isOpen && (
            <DropDownListContainer>
              {items.map((option: Item, index: number) => (
                <ListItem
                  onClick={() => handleSelect(option)}
                  isSelected={
                    selected ? option.value === selected.value : false
                  }
                  key={index}
                >
                  <SelectedText
                    selected={selected && option.value === selected.value}
                  >
                    {option.label}
                  </SelectedText>
                  {selected && option.value === selected.value && (
                    <StyledCheckmarkIcon src={checkmark} alt="checkmark-icon" />
                  )}
                </ListItem>
              ))}
            </DropDownListContainer>
          )}
        </DropDownContainer>
      </ClickAwayListener>
    </Container>
  );
}
