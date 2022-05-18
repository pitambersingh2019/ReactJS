import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleDaySettingsSelectedOption } from "../../../redux/quantityTargetsManagementSlice";
import Divider from "../../shared/Divider/Divider";
import DatesSelect from "./DatesSelect/DatesSelect";
import { DaySettingsContainer } from "./day-settings.styles";
import DaysPicker from "./DaysPicker/DaysPicker";
import Section from "./Section/Section";

export type SelectedOption = "DaysOfWeek" | "SpecificDates";

export default function DaySettings() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(
    (state) => state.qtm.daySettingsSelectedOption
  );

  const loading = useAppSelector((state) => state.qtm.loading);

  const { t } = useTranslation();

  const toggleSelect = () => {
    dispatch(
      toggleDaySettingsSelectedOption(
        selected === "DaysOfWeek" ? "SpecificDates" : "DaysOfWeek"
      )
    );
  };
  return (
    <DaySettingsContainer>
      <Section
        title={t(translations.QuantityTargetsManagement.DaysWeek)}
        isSelected={selected === "DaysOfWeek"}
        onSelect={toggleSelect}
      >
        {!loading && <DaysPicker />}
      </Section>
      <Divider />
      <Section
        title={t(translations.QuantityTargetsManagement.SpecificDates)}
        isSelected={selected === "SpecificDates"}
        onSelect={toggleSelect}
      >
        <DatesSelect />
      </Section>
    </DaySettingsContainer>
  );
}
