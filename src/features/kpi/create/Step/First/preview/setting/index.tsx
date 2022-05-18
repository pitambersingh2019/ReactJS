import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CreateKPIContext } from "../../../..";
import ButtonComponent from "../../../../../../../Component/CustomComponent/Button";
import { translations } from "../../../../../../../locales/translations";
import { initialFirstStep } from "../../../../initialValueStep";
import * as Styled from "./style";

const SettingPreview = () => {
  const contextCreate = useContext(CreateKPIContext);
  const [ableSave, setAbleSave] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (contextCreate !== null) {
      let status = true;
      let isHaveFunc = false;
      const formula = contextCreate.firstStepSetting.formula;
      const formulaComponent = contextCreate.firstStepSetting.formulaComponent;

      if (formula === "") status = false;

      formulaComponent.forEach((item, index, arr) => {
        if (item.component === "FuncComponent") {
          isHaveFunc = true;
        }
        if (
          item.component === "CalComponent" &&
          isNaN(parseInt(item.props.name)) &&
          (index + 1 === arr.length ||
            arr[index + 1]?.component === "PlusComponent")
        ) {
          status = false;
        }
        if (
          item.component === "PlusComponent" &&
          index + 1 !== arr.length &&
          arr[index - 1].props.name === "(" &&
          arr[index + 1].props.name === ")"
        ) {
          status = false;
        }
      });
      setAbleSave(status && isHaveFunc);
    }
  }, [contextCreate?.firstStepSetting.formula]);

  if (contextCreate === null) return <div></div>;

  const { setFirstStepSetting } = contextCreate;

  const onClickClear = () => {
    setFirstStepSetting((prev) => ({
      ...initialFirstStep,
      formulaID: prev.formulaID,
      KPIName: prev.KPIName,
      isFirstTime: false,
    }));
  };

  const onClickSave = () => {
    setFirstStepSetting((prev) => ({
      ...prev,
      saveFormula: prev.formula,
    }));
  };

  return (
    <Styled.PreviewSetting>
      <Styled.PreviewFormulaHeaderButton onClick={onClickClear}>
        {t(translations.CustomKPI.FirstStepClearFormula)}
      </Styled.PreviewFormulaHeaderButton>
      <ButtonComponent
        size="m"
        text={t(translations.CustomKPI.FirstStepSave)}
        buttonType="primary"
        isAble={ableSave}
        onClick={onClickSave}
      />
    </Styled.PreviewSetting>
  );
};

export default SettingPreview;
