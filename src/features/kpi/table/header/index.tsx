import { FC, useState } from "react";
import * as Styled from "./style";
import calendar from "./../../assets/img/Time_Range_Dropdown.svg";
import arrowImg from "./../../assets/img/Arow_dropdown.svg";
import { TTimePeriod } from "../../reducer/types";
import TimePeriodSelect from "./TimePeriodSelect";
import SettingButton from "./settingButton";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import SearchComponent from "../../../../Component/CustomComponent/Search";

interface IProps {
  timePeriod: TTimePeriod;
  searchValue: string;
  isLoading: boolean;
  changeSearchValue: (value: string) => void;
}

const HeaderTable: FC<IProps> = ({
  timePeriod,
  searchValue,
  isLoading,
  changeSearchValue,
}) => {
  const [view, setView] = useState<boolean>(false);

  const { t } = useTranslation();

  const timePeriodName = [
    t(translations.CustomKPI.TimeperiodShift),
    t(translations.CustomKPI.TimeperiodDay),
    t(translations.CustomKPI.TimeperiodWeek1),
    t(translations.CustomKPI.TimeperiodWeek2),
    t(translations.CustomKPI.TimeperiodMonth),
  ];

  const onClickTimePeriod = () => {
    setView((prev) => !prev);
  };

  return (
    <Styled.HeaderTableWrapper>
      <Styled.SearchWrapper>
        <SearchComponent
          border="all"
          placeholder={t(translations.CustomKPI.SearchKPITitle)}
          value={searchValue}
          onChange={changeSearchValue}
        />
      </Styled.SearchWrapper>
      <Styled.TimePeriodButton>
        <SettingButton
          imgCalendar={calendar}
          imgArrow={arrowImg}
          text={timePeriodName[timePeriod - 1]}
          onClickSetting={isLoading ? undefined : onClickTimePeriod}
        />
        {view && (
          <TimePeriodSelect
            timePeriodName={timePeriodName}
            timePeriod={timePeriod}
            onClickTimePeriod={onClickTimePeriod}
          />
        )}
      </Styled.TimePeriodButton>
    </Styled.HeaderTableWrapper>
  );
};

export default HeaderTable;
