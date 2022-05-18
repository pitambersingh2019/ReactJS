/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useCallback, useState, useEffect } from "react";
import {
  FilterFieldsWrapper,
  FilterFieldsContent,
  DropDownAddWrapper,
  FilterFieldAddWrapperButton,
  AddButtonFilterField,
  InputTypeWrapper,
  EditHeaderDivider,
  EditHeaderTitle,
  EditHeaderWrapper,
  CancelButton,
  SaveChangesButton,
  SaveChangesStyled,
} from "./styles";
import { MENU_COLS, SELECTION_COLS } from "../config";
import Dropdown from "../../../../../Component/DesignSystem/DropDown/SingleSelect";
import { DropDownMode } from "../../../../../Component/DesignSystem/DropDown/types";
import { FILTER_TYPES } from "./utils";
import FilterInput from "./FilterInputs";
import { nanoid } from "nanoid";
import { MODES } from "./utils";
function FilterFields({
  setListItems,
  handleGoToHomePage,
  fields,
  mode,
  setfilterItem,
  filterItem,
  showFilterSaveButton,
  handleCancelSave,
  handleSaveChanges,
}) {
  const [containsItems, setcontainsItems] = useState([]);
  const [containSelectedItem, setcontainSelectedItem] = useState(null);
  const [criteriaSelectedItem, setcriteriaSelectedItem] = useState(null);
  // console.log("fieldsfieldsfieldsfields", fields);
  const CriteriaItems = useMemo(
    () =>
      fields.map((elem) => ({
        helper: { ...elem },
        value: elem.Name,
        label: elem.DisplayEName,
      })),
    [fields]
  );
  const getFilterTypeOfCol = useCallback(
    (fieldId) => {
      const field = fields.find((elem) => elem.Name === fieldId);
      let FilterType = FILTER_TYPES.find(
        (filterType) => filterType.type === field.DisplayTypeName
      );
      if (FilterType !== undefined) {
        const Items = FilterType.OPTIONS.map((elem) => ({
          ...elem,
          type: field.DisplayTypeName,
        }));
        setcontainsItems(Items);
        setcontainSelectedItem(Items[0]);
      } else {
        setcontainsItems([]);
        setcontainSelectedItem(null);
      }
    },
    [fields]
  );

  const filterData = useMemo(
    () => ({
      containSelectedItem,
      criteriaSelectedItem,
    }),
    [containSelectedItem, criteriaSelectedItem]
  );

  const handleAddButtonClick = useCallback(() => {
    setListItems((prev) => [...prev, { ...filterItem, id: nanoid() }]);
    //show save filter button
    showFilterSaveButton();
    handleGoToHomePage && handleGoToHomePage();
  }, [filterItem, handleGoToHomePage, setListItems, showFilterSaveButton]);

  useEffect(() => {
    if (mode === MODES.EDITFILTER) {
      if (filterItem.criteriaSelectedItem && filterItem.criteriaSelectedItem) {
        setcriteriaSelectedItem(filterItem.criteriaSelectedItem);
        getFilterTypeOfCol(filterItem.criteriaSelectedItem.value);
        setcontainSelectedItem(filterItem.containSelectedItem);
      }
    }
  }, [getFilterTypeOfCol, mode, filterItem]);

  return (
    <FilterFieldsWrapper>
      <FilterFieldsContent>
        {mode === MODES.EDITFILTER && (
          <EditHeaderWrapper>
            <EditHeaderTitle>{filterItem?.text}</EditHeaderTitle>
            <EditHeaderDivider />
          </EditHeaderWrapper>
        )}

        <DropDownAddWrapper>
          <Dropdown
            placeholder={"Select Field"}
            required={false}
            TitleText={"Field"}
            onSelect={(item) => {
              setcriteriaSelectedItem(item);
              //clear values when criteria change!
              if (mode === MODES.EDITFILTER) {
                setfilterItem((prev) => ({ id: prev.id }));
              } else {
                setfilterItem(null);
              }

              item && getFilterTypeOfCol(item.value);
            }}
            items={CriteriaItems}
            mode={DropDownMode.selectable}
            searchable={false}
            selectedItem={criteriaSelectedItem}
          />
        </DropDownAddWrapper>
        {criteriaSelectedItem && (
          <DropDownAddWrapper>
            <Dropdown
              placeholder={"Select Criteria"}
              required={false}
              TitleText={"Criteria"}
              onSelect={(item) => {
                setcontainSelectedItem(item);
                if (mode === MODES.EDITFILTER) {
                  setfilterItem((prev) => ({ id: prev.id }));
                }
              }}
              items={containsItems}
              mode={DropDownMode.selectable}
              searchable={false}
              selectedItem={containSelectedItem}
            />
          </DropDownAddWrapper>
        )}
        {criteriaSelectedItem && containSelectedItem && (
          <InputTypeWrapper>
            <FilterInput
              filterData={filterData}
              setfilterItem={setfilterItem}
              id={mode === MODES.EDITFILTER ? filterItem.id : null}
              initvalue={filterItem?.val}
            />
          </InputTypeWrapper>
        )}
        {mode === MODES.ADDFILTER && (
          <FilterFieldAddWrapperButton>
            {criteriaSelectedItem && containSelectedItem && (
              <AddButtonFilterField
                onClick={() => {
                  filterItem.valid && handleAddButtonClick();
                }}
                disabled={!filterItem?.valid}
              >
                Add
              </AddButtonFilterField>
            )}
          </FilterFieldAddWrapperButton>
        )}
        {mode === MODES.EDITFILTER && (
          <SaveChangesStyled>
            <CancelButton onClick={() => handleCancelSave()} disabled={false}>
              Cancel
            </CancelButton>
            <SaveChangesButton
              disabled={false}
              onClick={() => handleSaveChanges()}
            >
              Save Changes
            </SaveChangesButton>
          </SaveChangesStyled>
        )}
      </FilterFieldsContent>
    </FilterFieldsWrapper>
  );
}

export default FilterFields;
