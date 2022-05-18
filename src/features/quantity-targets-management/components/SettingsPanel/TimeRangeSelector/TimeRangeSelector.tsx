import { TimeRangeSelectorContainer } from "./time-range-selector.styles";
import DropDown from "../../../../../Component/DesignSystem/DropDown/SingleSelect";
import { Item } from "../../../../../Component/DesignSystem/DropDown/types";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateSelectedTimeRange } from "../../../redux/quantityTargetsManagementSlice";

export default function TimeRangeSelector() {
  const dispatch = useAppDispatch();
  const { selectedTimeRange } = useAppSelector((state) => state.qtm);

  const { t } = useTranslation();

  const timeRangeOptions: Item[] = [
    {
      label: t(translations.QuantityTargetsManagement.Shift),
      value: 1,
    },
    {
      label: t(translations.QuantityTargetsManagement.Day),
      value: 2,
    },
    {
      label: t(translations.QuantityTargetsManagement.Week),
      value: 3,
    },
    {
      label: t(translations.QuantityTargetsManagement.Month),
      value: 4,
    },
  ];

  const onSelect = async (option: Item | undefined) => {
    option && dispatch(updateSelectedTimeRange(option.value));
  };

  const selectedItem = timeRangeOptions.find(
    (option) => option.value === selectedTimeRange
  );

  return (
    <TimeRangeSelectorContainer>
      <DropDown
        placeholder=""
        required={false}
        TitleText=""
        items={timeRangeOptions}
        onSelect={onSelect}
        selectedItem={selectedItem}
      />
    </TimeRangeSelectorContainer>
  );
}
