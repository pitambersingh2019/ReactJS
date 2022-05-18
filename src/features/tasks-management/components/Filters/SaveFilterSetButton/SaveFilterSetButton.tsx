import { useState } from "react";
import { useTranslation } from "react-i18next";
import SplitButton from "../../../../../Component/DesignSystem/Buttons/SplitButton";
import XsButton from "../../../../../Component/DesignSystem/Buttons/XsButton";
import { translations } from "../../../../../locales/translations";
import { useFilter } from "../../../context/useFilter";
import { useFilterDrawer } from "../../../context/useFilterDrawer";
import { InitialFilterState } from "../../../context/useFiltersInitialState";
import { useSavedFilters } from "../../../context/useSavedFilters";
import useSaveFilterSet from "../../../hooks/useSaveFilterSet";
import { useSelectedFilterSet } from "../../../context/useSelectedFilterSet";
import { deepEqual } from "../../../utils";
import NotifyModal from "./NotifyModal";
import SaveFilterModal from "./SaveFilterModal";

export default function SaveFilterSet() {
  const [showSplitButtonModal, setShowSplitButtonModal] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [notifyModalOpen, setNotifyModalOpen] = useState(false);

  const { currentFilters, filtersUpdated } = useFilter();

  const { closeAllDrawers } = useFilterDrawer();
  const { selectedFilterSet, selectedActiveFilter } = useSelectedFilterSet();
  const { saveFilterSet } = useSaveFilterSet();
  const { fetchSavedFilters } = useSavedFilters();

  const { t } = useTranslation();

  const getDisabled = () => {
    if (selectedFilterSet) {
      return (
        selectedActiveFilter &&
        deepEqual<InitialFilterState>(selectedActiveFilter, currentFilters)
      );
    } else {
      return !filtersUpdated;
    }
  };

  const disabled = getDisabled();

  const handleButtonClick = () => {
    setNotifyModalOpen(true);
  };

  const onSaveNewSet = () => {
    setSaveModalOpen(true);
  };

  const onUpdateSet = () => {
    if (selectedFilterSet) {
      saveFilterSet(selectedFilterSet.label, fetchSavedFilters);
      onModalClose();
    }
  };

  const modalItems = [
    {
      label: t(translations.TasksManagement.SaveFilterSet),
      onClickAction: onUpdateSet,
    },
    {
      label: t(translations.TasksManagement.SaveNewFilterSet),
      onClickAction: onSaveNewSet,
    },
  ];

  const onCancel = () => {
    setSaveModalOpen(false);
    setShowSplitButtonModal(false);
  };

  const onModalClose = () => {
    setSaveModalOpen(false);
    setShowSplitButtonModal(false);
    closeAllDrawers();
  };

  const onNotifyModalClose = () => {
    setNotifyModalOpen(false);
    setShowSplitButtonModal(false);
  };

  const onSaveAsNew = () => {
    setNotifyModalOpen(false);
    setSaveModalOpen(true);
  };

  const onSaveAsFilterSetClick = () => {
    setSaveModalOpen(true);
  };

  return (
    <>
      {selectedFilterSet ? (
        <SplitButton
          label={t(translations.TasksManagement.SaveFilterSet)}
          onButtonClick={handleButtonClick}
          modalItems={modalItems}
          showModal={showSplitButtonModal}
          setShowModal={setShowSplitButtonModal}
          disabled={disabled}
        />
      ) : (
        <XsButton
          label={t(translations.TasksManagement.SaveAsFilterSet)}
          onButtonClick={onSaveAsFilterSetClick}
          disabled={disabled}
        />
      )}
      <SaveFilterModal
        isOpen={saveModalOpen}
        handleClose={onModalClose}
        onCancel={onCancel}
      />
      <NotifyModal
        isOpen={notifyModalOpen}
        handleClose={onNotifyModalClose}
        onSaveAsNew={onSaveAsNew}
      />
    </>
  );
}
