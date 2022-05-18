import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { Container, FilterSetsButton, FiltersIcon, Label } from "./styles";
import filterSetsIcon from "../../../../../../assets/icons/tasks-management/filterNoCircle.svg";
import filterSetsDisabledIcon from "../../../../../../assets/icons/tasks-management/filterNoCircleDisabled.svg";
import { useSavedFilters } from "../../../../context/useSavedFilters";
import FilterSetsModal from "./FilterSetsModal";
import InfoModal from "./InfoModal";

export default function FilterSets() {
  const [opened, setOpened] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const { t } = useTranslation();
  const { savedFilters } = useSavedFilters();

  const disabled = !savedFilters || savedFilters.length < 1;

  const handleClick = () => {
    !disabled && setOpened((prev) => !prev);
  };

  const handleCloseModal = () => {
    setOpened(false);
  };

  const onShowInfoModal = () => {
    disabled && setShowInfoModal(true);
  };

  return savedFilters ? (
    <ClickAwayListener onClickAway={handleCloseModal}>
      <Container>
        <FilterSetsButton
          onClick={handleClick}
          disabled={disabled}
          onMouseEnter={onShowInfoModal}
          onMouseLeave={() => setShowInfoModal(false)}
        >
          <FiltersIcon
            src={disabled ? filterSetsDisabledIcon : filterSetsIcon}
            alt="filter sets icon"
          />
          <Label>{t(translations.TasksManagement.FilterSets)}</Label>
        </FilterSetsButton>
        {opened && savedFilters && (
          <FilterSetsModal
            savedFilters={savedFilters}
            onModalClose={handleCloseModal}
          />
        )}
        {showInfoModal && <InfoModal />}
      </Container>
    </ClickAwayListener>
  ) : null;
}
