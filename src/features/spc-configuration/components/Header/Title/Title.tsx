import { useSelector } from "react-redux";
import { selectSPCStep, selectAPICalling } from "../../../slice/selectors";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import {
  StyledTitle,
  StyledTitleWrapper,
  StyledStatueDesription,
  StyledStatueWrapper,
} from "./title.styles";
import CachedIcon from "@material-ui/icons/Cached";
import CheckIcon from "@material-ui/icons/Check";
import { selectIsRtl } from "../../../../../slice/selectors";

const Title: React.FC = () => {
  const { t } = useTranslation();
  const step = useSelector(selectSPCStep);
  const apiCallStatue = useSelector(selectAPICalling);
  const isRtl = useSelector(selectIsRtl);
  return (
    <StyledTitleWrapper step={step}>
      <StyledTitle>
        {t(translations.SPC.PREDICTION_SPC_CONFIGURATION)}
      </StyledTitle>
      {apiCallStatue === true && (
        <StyledStatueWrapper>
          <CheckIcon
            style={{
              fontSize: "16px",
              color: "#04c740",
              marginLeft: isRtl === "rtl" ? "0" : "8px",
              marginRight: isRtl === "rtl" ? "8px" : "0",
            }}
          />
          <StyledStatueDesription>
            {t(translations.SPC.CHANGES_SAVED)}
          </StyledStatueDesription>
        </StyledStatueWrapper>
      )}
      {apiCallStatue === false && (
        <StyledStatueWrapper>
          <CachedIcon
            style={{
              fontSize: "16px",
              color: "#797e8c",
              marginLeft: isRtl === "rtl" ? "0" : "8px",
              marginRight: isRtl === "rtl" ? "8px" : "0",
            }}
          />
          <StyledStatueDesription>
            {t(translations.SPC.SAVING_CHANGES)}
          </StyledStatueDesription>
        </StyledStatueWrapper>
      )}
    </StyledTitleWrapper>
  );
};

export default Title;
