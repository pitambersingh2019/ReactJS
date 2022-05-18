import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { Container, FilterSetsButton, Label } from "./styles";
import { FilterIconStyled2 } from "../../Header/styles";
import FilterSetsModal from "./FilterSetsModal";
import InfoModal from "./InfoModal";

export default function FilterSets({
  filterSets,
  handleSetFilterFromHeaderDropDown,
}) {
  const [opened, setOpened] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const { t } = useTranslation();

  // const disabled = !savedFilters || savedFilters.length < 1;
  const disabled = false;

  const handleClick = () => {
    !disabled && setOpened((prev) => !prev);
  };

  const handleCloseModal = () => {
    setOpened(false);
  };

  const onShowInfoModal = () => {
    disabled && setShowInfoModal(true);
  };

  return (
    <ClickAwayListener onClickAway={handleCloseModal}>
      <Container>
        <FilterSetsButton
          onClick={handleClick}
          disabled={disabled}
          onMouseEnter={onShowInfoModal}
          onMouseLeave={() => setShowInfoModal(false)}
        >
          <FilterIconStyled2 />
          <Label>{t(translations.TasksManagement.FilterSets)}</Label>
        </FilterSetsButton>
        {opened && (
          <FilterSetsModal
            savedFilters={filterSets}
            onModalClose={handleCloseModal}
            handleSetFilterFromHeaderDropDown={
              handleSetFilterFromHeaderDropDown
            }
          />
        )}
        {showInfoModal && <InfoModal />}
      </Container>
    </ClickAwayListener>
  );
}
