import { useTranslation } from "react-i18next";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { translations } from "../../../../../../locales/translations";
import {
  Container,
  DropDownContainer,
  DropDownHeader,
  DropDownList,
  DropDownListContainer,
  DropDownText,
  ListItem,
} from "./dropdown.styles";
import { ClickAwayListener } from "@material-ui/core";
import { useEffect, useState } from "react";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import DeleteIcon from "./DeleteIcon";

export default function FilterSetsDropDown({
  items,
  onSelect,
  selectedItem,
  handleRemoveFilterSet,
  setListItems,
  setSelectedFilterSet,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setselected] = useState(selectedItem);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation();

  const placeholder = "Select a filter set";

  const toggleDropDown = () => {
    setIsOpen((prev) => {
      if (prev) {
        return false;
      } else {
        if (items.length > 0) return true;
        return false;
      }
    });
  };

  const onItemClick = (item) => {
    setIsOpen(false);
    if (selected?.value === item.value) {
      onSelect(undefined);
      setselected(undefined);
    } else {
      onSelect(item);
      setselected(item);
    }
  };

  const onDeleteComplete = (resetSelected) => {
    if (resetSelected) setselected(undefined);
    setIsOpen(false);
  };

  useEffect(() => {
    setselected(selectedItem);
  }, [selectedItem]);

  return (
    <Container>
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
                {items.map((option, index) => (
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
                      handleRemoveFilterSet={handleRemoveFilterSet}
                      selectedItem={selectedItem}
                      setListItems={setListItems}
                      setSelectedFilterSet={setSelectedFilterSet}
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
