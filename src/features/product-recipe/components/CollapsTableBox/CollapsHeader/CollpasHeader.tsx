import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useDispatch, useSelector } from "react-redux";
import { SetIndividualCollapsStatus } from "../../../slice/index";
import { selectIsRtl } from "../../../../../slice/selectors";
import { Channel } from "../../../slice/types";
import { loadStateLang } from "../../../../../AppStart";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import CheckBox from "../../../../../Component/DesignSystem/CheckBox";
import {
  HeaderWrapper,
  CollapsHeaderLeft,
  CollpasHeaderRight,
  Percentage,
} from "./collpas-header.styles";

interface CollpaseHeaderProps {
  channelData?: Channel;
  expanded: boolean;
  index: number;
  onHideEmpty: () => void;
  hideEmptyLines: boolean;
}

const CollpasBoxHeader: React.FC<CollpaseHeaderProps> = ({
  channelData,
  expanded,
  index,
  onHideEmpty,
  hideEmptyLines,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isRtl = useSelector(selectIsRtl);
  const lang = JSON.parse(loadStateLang());

  const [percentageValue, setPercentageValue] = useState(0);
  const handleCollapsIndividual = () => {
    dispatch(SetIndividualCollapsStatus({ index: index, value: !expanded }));
  };

  useEffect(() => {
    let valueSplit = channelData?.channelSplit.find(
      (ele) => ele.SplitNumber === 0
    );
    let percentageSplit = valueSplit?.splits.find(
      (ele) => ele.PropertyName === "ChannelPC"
    );
    let value = percentageSplit
      ? percentageSplit.FValue
        ? percentageSplit.FValue
        : 0
      : 0;
    setPercentageValue(value);
  }, [channelData]);

  return (
    <HeaderWrapper onClick={handleCollapsIndividual}>
      <CollapsHeaderLeft>
        {expanded ? (
          <KeyboardArrowDownIcon
            style={{
              color: "#707070",
              marginLeft: isRtl === "rtl" ? "4px" : "0",
              marginRight: isRtl === "rtl" ? "0" : "4px",
              fontSize: "16px",
            }}
          />
        ) : isRtl === "rtl" ? (
          <KeyboardArrowLeftIcon
            style={{ color: "#707070", marginLeft: "4px", fontSize: "16px" }}
          />
        ) : (
          <KeyboardArrowRightIcon
            style={{ color: "#707070", marginRight: "4px", fontSize: "16px" }}
          />
        )}
        {channelData?.ChannelNumber === 0
          ? t(translations.ProductRecipe.PRODUCTION_PARAMETERS)
          : lang === "eng"
          ? channelData?.ChannelEname
          : channelData?.ChannelLname}
      </CollapsHeaderLeft>
      {channelData?.ChannelNumber != 0 && (
        <CollpasHeaderRight onClick={(e) => e.stopPropagation()}>
          <CheckBox
            onChange={onHideEmpty}
            checked={hideEmptyLines}
            TitleText={t(translations.ProductRecipe.HIDE_EMPTY_LINES)}
            height={16}
          />
          <Percentage>{percentageValue}%</Percentage>
        </CollpasHeaderRight>
      )}
    </HeaderWrapper>
  );
};

export default CollpasBoxHeader;
