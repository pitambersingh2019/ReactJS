import React from "react";
import { TextCellWrapper, SettingIcon, ContentText } from "./text-cell.styled";
import CalculatedIcon from "../../../../../../assets/icons/recipe/calculated.svg";
import ToolTip from "../../../Tooltip";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";

const TextCell = ({ cell }) => {
  const { required, calcFunction, value, toolTip } = cell.value;
  const { t } = useTranslation();

  return (
    <TextCellWrapper>
      <ToolTip
        title={<div>{toolTip ? toolTip : ""}</div>}
        placement="top"
        disableHoverListener={toolTip ? false : true}
      >
        <ContentText required={required}>
          {value}
          {required ? "*" : ""}
        </ContentText>
      </ToolTip>
      {calcFunction && (
        <ToolTip
          title={<div>{t(translations.ProductRecipe.CALCULATED)}</div>}
          placement="right"
        >
          <SettingIcon src={CalculatedIcon} />
        </ToolTip>
      )}
    </TextCellWrapper>
  );
};

export default TextCell;
