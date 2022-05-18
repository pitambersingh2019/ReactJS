import {
  ArrowIcon,
  Icon,
  Label,
  ModalContainer,
  ModalItem,
  PeriodSelectorContainer,
  PeriodSelectorModalContainer,
} from "./period-selector.styles";
import timeRangeIcon from "../../../../assets/icons/time-range.svg";
import arrowIcon from "../../../../assets/icons/Arowdropdown.svg";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectSelectedPeriod } from "../../redux/selectors";
import { translations } from "../../../../locales/translations";
import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import { PERIODS, SelectedPeriod } from "../../ts";
import { setSelectedPeriod } from "../../redux/slice";

export default function PeriodSelector() {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  const selectedPeriod = useAppSelector(selectSelectedPeriod);

  const { t } = useTranslation();

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onItemClick = (period: SelectedPeriod) => {
    dispatch(setSelectedPeriod(period));
    onCloseModal();
  };

  return (
    <PeriodSelectorContainer>
      <Icon src={timeRangeIcon} alt="time range icon" />
      <ModalContainer>
        <Label onClick={onShowModal}>
          {t(translations.SyncTool[selectedPeriod])}
        </Label>
        <ArrowIcon src={arrowIcon} alt="arrow icon" onClick={onShowModal} />
        {showModal && (
          <ClickAwayListener onClickAway={onCloseModal}>
            <PeriodSelectorModalContainer>
              {PERIODS.map((period, idx) => (
                <ModalItem
                  key={idx}
                  isSelected={selectedPeriod === period}
                  onClick={() => onItemClick(period)}
                >
                  {t(translations.SyncTool[period])}
                </ModalItem>
              ))}
            </PeriodSelectorModalContainer>
          </ClickAwayListener>
        )}
      </ModalContainer>
    </PeriodSelectorContainer>
  );
}
