import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import {
  Container,
  DropDownContainer,
  DropDownHeader,
  DropDownList,
  DropDownListContainer,
  DropDownText,
  Label,
  ListItem,
} from "./dropdown.styles";
import { ClickAwayListener } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Item } from "../../../../../Component/DesignSystem/DropDown/types";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import DeleteIcon from "./DeleteIcon";

type FilterSetsDropDownProps = {
  items: Item[];
  onSelect: (item: Item | undefined) => void;
  selectedItem: Item | undefined;
};

export default function FilterSetsDropDown({
  items,
  onSelect,
  selectedItem,
}: FilterSetsDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setselected] = useState<Item | undefined>(selectedItem);

  const { t } = useTranslation();

  const placeholder = t(translations.TasksManagement.SelectSet);

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  const onItemClick = (item: Item) => {
    setIsOpen(false);
    if (selected?.value === item.value) {
      onSelect(undefined);
      setselected(undefined);
    } else {
      onSelect(item);
      setselected(item);
    }
  };

  const onDeleteComplete = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setselected(selectedItem);
  }, [selectedItem]);

  return (
    <Container>
      <Label>{t(translations.TasksManagement.SavedFilterSets)}</Label>
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <DropDownContainer isOpen={isOpen}>
          <DropDownHeader onClick={toggleDropDown}>
            <DropDownText isPlaceholder={!selected?.label}>
              {selected ? selected.label : placeholder}
            </DropDownText>
            <ExpandMoreSharpIcon
              style={{
                color: "#575757",
              }}
            />
          </DropDownHeader>
          {isOpen && (
            <DropDownListContainer>
              <DropDownList>
                {items.map((option: Item, index: number) => (
                  <ListItem
                    isSelected={
                      selected ? option.value === selected.value : false
                    }
                    key={index}
                  >
                    <DropDownText
                      selected={selected && option.value === selected.value}
                      onClick={() => onItemClick(option)}
                    >
                      {option.label}
                    </DropDownText>
                    <DeleteIcon
                      option={option}
                      onDeleteComplete={onDeleteComplete}
                      isOnlyChild={items.length === 1}
                      isLastChild={index + 1 === items.length}
                    />
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainer>
          )}
        </DropDownContainer>
      </ClickAwayListener>
    </Container>
  );
}
