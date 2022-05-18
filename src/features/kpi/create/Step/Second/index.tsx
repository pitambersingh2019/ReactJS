import { useContext, useState } from "react";
import { CreateKPIContext } from "../..";
import * as Styled from "./style";

import { KPIApi } from "../../../api";
import SettingModal from "./SettingModal";
import { TDisplay } from "../../types";

import ChangeType from "./changeType";
import LayoutStep from "../Layout";
import { IFilterLabels } from "../../../api/types";
import { initialFilter } from "../../initialValueStep";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import SelectComponent, {
  IDataSelectComponent,
} from "../../../../../Component/CustomComponent/Select";
import FilterSSCK from "./Filter";

type TNameFilterId = keyof IFilterLabels;

const SecondStep = () => {
  const createContext = useContext(CreateKPIContext);
  const [isSetting, setIsSetting] = useState(false);
  const { t } = useTranslation();

  if (createContext === null) return <div></div>;

  const { secondStepSetting, setSecondStepSetting } = createContext;
  const { departmets, level, filterData, filter, departmentID } =
    secondStepSetting;

  const onClickSetting = () => {
    if (departmentID === -1) return;
    setIsSetting((prev) => !prev);
  };

  const onChangeLevel = async (item: IDataSelectComponent) => {
    if (departmentID === item.id) return;
    const { data } = await KPIApi.getInsightFilters(item.id);
    setSecondStepSetting((prev) => ({
      ...prev,
      level: item.value,
      departmentID: item.id,
      filterData: data.ResponseDictionary,
      filter: initialFilter,
    }));
  };

  const onClickDisplayButton = (value: TDisplay) => {
    setSecondStepSetting((prev) => ({
      ...prev,
      displayType: value,
    }));
  };

  const clearFilterID = (name: TNameFilterId) => {
    setSecondStepSetting((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        [name]: [],
      },
    }));
  };

  const mainTitle = () => {
    return <div>{t(translations.CustomKPI.SecondStepTitle)}</div>;
  };

  return (
    <LayoutStep mainTitle={mainTitle()} subTitle={null}>
      <Styled.DisplayTitle>Display Type</Styled.DisplayTitle>
      <ChangeType
        onClickDisplayButton={onClickDisplayButton}
        activeType={secondStepSetting.displayType}
      />
      <Styled.WrapperLevelFilter>
        <Styled.LevelWrapper>
          <SelectComponent
            width={344}
            mode="single"
            selectValue={[{ id: departmentID, value: level }]}
            placeholder="Select level"
            onSelect={onChangeLevel}
            isRequired={false}
            title="Level*"
            data={departmets.map((item) => ({
              id: item.Id,
              value: item.EName,
            }))}
          />
        </Styled.LevelWrapper>
        <FilterSSCK
          text={t(translations.CustomKPI.SecondStepFilterSetting)}
          onClick={onClickSetting}
          onClickTabs={clearFilterID}
          filter={filter}
          disable={departmentID === -1}
        />
      </Styled.WrapperLevelFilter>
      {isSetting && (
        <SettingModal
          onClose={onClickSetting}
          filterData={filterData}
          filter={filter}
          clearFilter={clearFilterID}
        />
      )}
    </LayoutStep>
  );
};

export default SecondStep;
