import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { translations } from "../../../../../../../locales/translations";
import { CreateKPIContext } from "../../../..";
import editImg from "./../../../../../assets/img/edit_big.svg";
import editDisableImg from "./../../../../../assets/img/edit_big_disable.svg";
import infoImg from "./../../../../../assets/img/info.svg";
import HtmlTooltip from "../../../../../../../Component/ToolTip/TooltipSelect";
import * as Styled from "./style";

const HeaderPreview = () => {
  const contextCreate = useContext(CreateKPIContext);
  const { t } = useTranslation();

  if (contextCreate === null) return <div></div>;

  const { firstStepSetting, setFirstStepSetting } = contextCreate;

  const onClickEdit = () => {
    setFirstStepSetting((prev) => ({
      ...prev,
      saveFormula: "",
    }));
  };

  return (
    <Styled.PreviewFormulaHeader>
      <Styled.TitleWrapper>
        <Styled.Title>
          {t(translations.CustomKPI.FirstStepFormulaTitle)}
        </Styled.Title>
        <HtmlTooltip
          title={<div>{t(translations.CustomKPI.FirstStepFormulaTooltip)}</div>}
        >
          <Styled.TitleImgWrapper>
            <img src={infoImg} alt="" />
          </Styled.TitleImgWrapper>
        </HtmlTooltip>
      </Styled.TitleWrapper>
      {!firstStepSetting.isFirstTime && (
        <Styled.PreviewFormulaHeaderButtonWrapper
          activeText={firstStepSetting.saveFormula !== ""}
        >
          <Styled.PreviewFormulaImgWrapper>
            <img src={editImg} alt="" />
          </Styled.PreviewFormulaImgWrapper>
          <Styled.PreviewFormulaImgWrapper>
            <img src={editDisableImg} alt="" />
          </Styled.PreviewFormulaImgWrapper>
          <Styled.PreviewFormulaHeaderButton
            onClick={
              firstStepSetting.saveFormula !== "" ? onClickEdit : undefined
            }
          >
            {t(translations.CustomKPI.FirstStepEditFormula)}
          </Styled.PreviewFormulaHeaderButton>
        </Styled.PreviewFormulaHeaderButtonWrapper>
      )}
    </Styled.PreviewFormulaHeader>
  );
};

export default HeaderPreview;
