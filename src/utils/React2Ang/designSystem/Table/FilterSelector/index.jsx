/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  FilterWrapper,
  Divider,
  HeaderStyled,
  Title,
  AddFilterContainer,
  AddEditFilterWrapper,
  AddIconStyled,
  AddFilterText,
  FilterContentWrapper,
  AddFilterRightSideWrapper,
  ClearWrapper,
  SaveIconStyled,
} from "./styles";
import LoadFilter from "./LoadFilter";
import Header from "./Header";
import Footer from "./Footer";
import FilterFields from "./FilterFields";
import InitialStep from "./InitialStep";
import SplitButton from "../../../../../Component/DesignSystem/Buttons/SplitButton";
import XsButton from "../../../../../Component/DesignSystem/Buttons/XsButton";
import { MODES } from "./utils";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../..//locales/translations";
import SaveFilterModal from "./SaveFilterModal";
import NotifyModal from "./NotifyModal";
// import
// eslint-disable-next-line react/display-name
const FilterSelector = React.forwardRef(
  (
    {
      onClickHandler,
      allColumns,
      handleAddFilters,
      handleRemoveFilterFromItems,
      handleClearFilterItems,
      FilterItems,
      fields,
      firstTimeFilterApply,
      initialFilters,
      selectedFilterSet,
      setSelectedFilterSet,
      handleAddFilterSet,
      handleRemoveFilterSet,
      handleUpdateFilterSet,
      filterSets,
      showSaveFilterButton,
      showFilterSaveButton,
      hideFilterSaveButton,
      filterPosition,
      editedFilterId,
      handleClearEditItem,
    },
    ref
  ) => {
    const [mode, setmode] = useState(MODES.INITIAL);
    const [ListItems, setListItems] = useState([]);
    const [filterItem, setfilterItem] = useState(null);
    const [showSplitButtonModal, setShowSplitButtonModal] = useState(false);
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [notifyModalOpen, setNotifyModalOpen] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
      if (editedFilterId !== null && mode !== MODES.EDITFILTER) {
        // setmode(MODES.INITIAL);
        // setfilterItem(null);
        const item = ListItems.find((elem) => elem.id === editedFilterId);
        console.log("item ", item);
        if (item) {
          setfilterItem(item);
          setmode(MODES.EDITFILTER);
        }
      }
    }, [editedFilterId, ListItems, handleClearEditItem, mode]);

    useEffect(() => {
      if (selectedFilterSet) setListItems(selectedFilterSet.data);
      else {
        setListItems(firstTimeFilterApply ? initialFilters : FilterItems);
      }
    }, [FilterItems, firstTimeFilterApply, initialFilters, selectedFilterSet]);

    const handleClickAddButton = () => {
      if (mode !== MODES.EDITFILTER) {
        setmode((prev) =>
          prev === MODES.INITIAL ? MODES.ADDFILTER : MODES.INITIAL
        );
        setfilterItem(null);
      }
    };

    const handleGoToHomePage = useCallback(() => {
      setmode(MODES.INITIAL);
    }, []);

    const handleApplyFilters = useCallback(() => {
      handleAddFilters(ListItems);
      onClickHandler && onClickHandler();
    }, [ListItems, handleAddFilters, onClickHandler]);

    const handleEditItem = useCallback((item) => {
      setmode(MODES.EDITFILTER);
      setfilterItem(item);
    }, []);

    const handleSaveEditButtonClick = useCallback(() => {
      if (
        filterItem.criteriaSelectedItem &&
        filterItem.criteriaSelectedItem &&
        filterItem?.valid
      ) {
        //show save filter button
        handleClearEditItem();
        showFilterSaveButton();
        setListItems((prev) => {
          return prev.map((elem) => {
            if (elem.id === filterItem.id) {
              return filterItem;
            }
            return elem;
          });
        });
        handleGoToHomePage && handleGoToHomePage();
      }
    }, [filterItem, handleGoToHomePage, showFilterSaveButton]);

    const handleCancelEditButtonClick = useCallback(() => {
      //show save filter button
      handleClearEditItem();
      showFilterSaveButton();
      handleGoToHomePage && handleGoToHomePage();
    }, [handleGoToHomePage, showFilterSaveButton]);

    const handleDeleteFrommItemListFilter = useCallback(
      (id) => {
        setListItems((prev) => prev.filter((elem) => elem.id !== id));
        //show filter set if items still with positive lenght
        showFilterSaveButton();
      },
      [showFilterSaveButton]
    );

    const handleClearAllItems = useCallback(() => {
      setListItems([]);
      handleGoToHomePage && handleGoToHomePage();
    }, [handleGoToHomePage]);

    const onSaveAsFilterSetClick = () => {
      setSaveModalOpen(true);
    };

    const onNotidyAsFilterSetClick = () => {
      setNotifyModalOpen(true);
    };

    const modalItems = [
      {
        label: t(translations.TasksManagement.SaveFilterSet),
        onClickAction: onNotidyAsFilterSetClick,
      },
      {
        label: t(translations.TasksManagement.SaveNewFilterSet),
        onClickAction: onSaveAsFilterSetClick,
      },
    ];

    const handleButtonClick = () => {
      onNotidyAsFilterSetClick();
    };

    const onModalSaveClose = () => {
      setSaveModalOpen(false);
      setShowSplitButtonModal(false);
    };

    const onModalNotifyClose = () => {
      setNotifyModalOpen(false);
      setShowSplitButtonModal(false);
    };

    const onSaveasNewModalButton = () => {
      setShowSplitButtonModal(false);
      setNotifyModalOpen(false);
      setSaveModalOpen(true);
    };
    return (
      <FilterWrapper
        className="FilterReactPanel"
        ref={ref}
        top={filterPosition ? filterPosition.top : 0}
      >
        <FilterContentWrapper>
          <Header
            firstTimeFilterApply={firstTimeFilterApply}
            onClickHandler={onClickHandler}
          />
          <Divider />
          {filterSets.length > 0 && (
            <React.Fragment>
              <LoadFilter
                selectedFilterSet={selectedFilterSet}
                setSelectedFilterSet={setSelectedFilterSet}
                filterSets={filterSets}
                handleRemoveFilterSet={handleRemoveFilterSet}
                setListItems={setListItems}
              />
              <Divider />
            </React.Fragment>
          )}

          <AddFilterContainer>
            <AddEditFilterWrapper onClick={handleClickAddButton}>
              <AddIconStyled
                disabledColor={
                  mode === MODES.ADDFILTER || mode === MODES.EDITFILTER
                }
              />
              <AddFilterText
                disabledColor={
                  mode === MODES.ADDFILTER || mode === MODES.EDITFILTER
                }
              >
                Add Filter
              </AddFilterText>
            </AddEditFilterWrapper>
            {/*{mode !== MODES.EDITFILTER && (*/}
            {/*  <AddEditFilterWrapper onClick={handleClickAddButton}>*/}
            {/*    <AddIconStyled disabledColor={mode === MODES.ADDFILTER} />*/}
            {/*    <AddFilterText disabledColor={mode === MODES.ADDFILTER}>*/}
            {/*      Add Filter*/}
            {/*    </AddFilterText>*/}
            {/*  </AddEditFilterWrapper>*/}
            {/*)}*/}
            {/*{mode === MODES.EDITFILTER && (*/}
            {/*  <AddEditFilterWrapper onClick={handleSaveEditButtonClick}>*/}
            {/*    <SaveIconStyled disabledColor={!filterItem?.valid} />*/}
            {/*    <AddFilterText disabledColor={!filterItem?.valid}>*/}
            {/*      Save Changes*/}
            {/*    </AddFilterText>*/}
            {/*  </AddEditFilterWrapper>*/}
            {/*)}*/}
            {ListItems.length > 0 && (
              <AddFilterRightSideWrapper>
                {selectedFilterSet ? (
                  <div style={{ width: "155px" }}>
                    <SplitButton
                      label={t(translations.TasksManagement.SaveFilterSet)}
                      onButtonClick={handleButtonClick}
                      modalItems={modalItems}
                      showModal={showSplitButtonModal}
                      setShowModal={setShowSplitButtonModal}
                      disabled={mode !== MODES.INITIAL || !showSaveFilterButton}
                    />
                  </div>
                ) : (
                  <XsButton
                    label={t(translations.TasksManagement.SaveAsFilterSet)}
                    onButtonClick={onSaveAsFilterSetClick}
                    disabled={mode !== MODES.INITIAL || !showSaveFilterButton}
                  />
                )}
                <ClearWrapper onClick={handleClearAllItems}>
                  Clear All
                </ClearWrapper>
              </AddFilterRightSideWrapper>
            )}
          </AddFilterContainer>
          {mode === MODES.INITIAL && (
            <InitialStep
              ListItems={ListItems}
              handleRemoveFilterFromItems={handleDeleteFrommItemListFilter}
              handleEditItem={handleEditItem}
            />
          )}
          {mode !== MODES.INITIAL && (
            <FilterFields
              fields={fields}
              setListItems={setListItems}
              handleGoToHomePage={handleGoToHomePage}
              mode={mode}
              setfilterItem={setfilterItem}
              filterItem={filterItem}
              showFilterSaveButton={showFilterSaveButton}
              handleCancelSave={() => {
                handleCancelEditButtonClick();
              }}
              handleSaveChanges={() => {
                handleSaveEditButtonClick();
              }}
            />
          )}
        </FilterContentWrapper>

        <Footer
          // addButtondisabled={ListItems.length}
          handleApplyFilters={handleApplyFilters}
          cancelHandler={onClickHandler}
          firstTimeFilterApply={firstTimeFilterApply}
        />
        <SaveFilterModal
          isOpen={saveModalOpen}
          handleClose={onModalSaveClose}
          ListItems={ListItems}
          handleAddFilterSet={handleAddFilterSet}
          filterSets={filterSets}
          hideFilterSaveButton={hideFilterSaveButton}
        />
        <NotifyModal
          isOpen={notifyModalOpen}
          handleClose={onModalNotifyClose}
          onSaveAsNew={onSaveasNewModalButton}
          selectedFilterSet={selectedFilterSet}
          handleUpdateFilterSet={handleUpdateFilterSet}
          ListItems={ListItems}
          hideFilterSaveButton={hideFilterSaveButton}
        />
      </FilterWrapper>
    );
  }
);

export default FilterSelector;
