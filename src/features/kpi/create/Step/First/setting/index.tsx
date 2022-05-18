import CalComponent from "./calComponent";
import FuncComponent from "./funcComponent";
import * as Styled from "./style";
import WrapperSetting from "./wrapperSetting";
import ParamComponent from "./paramComponent";
import { TActiveType } from "../../../types";
import { FC, useEffect, useState } from "react";
import {
  arrCalComponent,
  arrFuncComponent,
  arrParamComponent,
} from "./stateSetting";
import { KPIApi } from "../../../../api";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";

interface IProps {
  ActiveType: TActiveType[];
}

const SettingFormula: FC<IProps> = ({ ActiveType }) => {
  const [params, setParams] = useState<string[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    KPIApi.getCustomKPIsColumns().then((response) =>
      setParams(
        response.data.ResponseDictionary.Data.map((item) => item.ColumnName)
      )
    );
  }, []);

  return (
    <Styled.Wrapper>
      <WrapperSetting
        gap={12}
        isActive={!!ActiveType.find((item) => item === "Functions")}
        title={t(translations.CustomKPI.FirstStepTitleFunctions)}
      >
        {arrFuncComponent(ActiveType).map((props) => (
          <FuncComponent key={props.name} {...props} />
        ))}
      </WrapperSetting>
      <WrapperSetting
        gap={8}
        isActive={!!ActiveType.length}
        title={t(translations.CustomKPI.FirstStepTitleCalculator)}
      >
        {arrCalComponent(ActiveType).map((props) => (
          <CalComponent key={props.name} {...props} />
        ))}
      </WrapperSetting>
      <WrapperSetting
        gap={8}
        isActive={!!ActiveType.find((item) => item === "Params")}
        title={t(translations.CustomKPI.FirstStepTitleParameters)}
      >
        {arrParamComponent(ActiveType, params).map((props: any) => (
          <ParamComponent key={props.name} params={params} {...props} />
        ))}
      </WrapperSetting>
    </Styled.Wrapper>
  );
};

export default SettingFormula;
