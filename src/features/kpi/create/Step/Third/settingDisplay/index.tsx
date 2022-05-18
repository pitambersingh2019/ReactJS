import React, { FC, useContext } from "react";
import CheckGaugeType from "./checkSetting";
import RowSetting from "./rowSetting";
import * as Styled from "./style";
import { TMainTitle } from "../types";
import { TDigists, TGuageType } from "../../../types";
import infoImg from "./../../../../assets/img/info.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { CreateKPIContext } from "../../..";
import HtmlTooltip from "../../../../../../Component/ToolTip/TooltipSelect";
import SelectComponent, {
  IDataSelectComponent,
} from "../../../../../../Component/CustomComponent/Select";

interface IProps {
  isGauge: boolean;
  gaugeType: TGuageType;
  onClickGaugeType: (value: "single" | "3 ranges") => void;
}

const selectDigits = [
  { id: 0, value: "0 digits" },
  { id: 1, value: "1 digits" },
  { id: 2, value: "2 digits" },
];

const rowPeriods: TMainTitle[] = ["Shift", "Day", "Week", "Month"];

const Setting: FC<IProps> = ({ isGauge, gaugeType, onClickGaugeType }) => {
  const createContext = useContext(CreateKPIContext);
  const { t } = useTranslation();

  if (createContext === null) return <div></div>;

  const { thirdStepSetting, setThirdStepSetting } = createContext;
  const { digists } = thirdStepSetting;

  const onChangeSelectDigits = (item: IDataSelectComponent) => {
    if (item.id === digists) return;
    setThirdStepSetting((prev) => ({
      ...prev,
      digists: parseInt(item.value) as TDigists,
    }));
  };

  return (
    <Styled.Setting>
      {isGauge && (
        <CheckGaugeType
          gaugeType={gaugeType}
          onClickGaugeType={onClickGaugeType}
        />
      )}

      <SelectComponent
        width={424}
        mode="single"
        selectValue={[{ id: digists, value: digists + " digits" }]}
        placeholder="Select level"
        onSelect={onChangeSelectDigits}
        data={selectDigits}
        isRequired={true}
        title="Numeric Units - Digits Post Decimal Point"
      />

      <Styled.SettingRangeTitle>
        <Styled.SettingRangeTitleText>
          {t(translations.CustomKPI.ThirdStepTarget)}
        </Styled.SettingRangeTitleText>
        <HtmlTooltip
          title={<div>{t(translations.CustomKPI.ThirdStepTargetsTooltip)}</div>}
        >
          <Styled.SettingRangeTitleImg>
            <img src={infoImg} />
          </Styled.SettingRangeTitleImg>
        </HtmlTooltip>
      </Styled.SettingRangeTitle>
      {rowPeriods.map((period) => (
        <RowSetting key={period} setBorder={true} mainTitle={period} />
      ))}
    </Styled.Setting>
  );
};

export default Setting;
