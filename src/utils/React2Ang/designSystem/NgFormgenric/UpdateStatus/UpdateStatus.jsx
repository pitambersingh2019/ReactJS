import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import useFormattedTimestamp from "../hooks/useFormattedTime";
import SavingIcon from "../../../../../assets/icons/saving.svg";
import SavedIcon from "../../../../../assets/icons/saved-tick.svg";
import {
  ContentWrapper,
  RequiredText,
  UpdatedInfoText,
  UpdatedIcon,
  UpdateWrapper,
  SpinningIcon,
} from "./update-status.styles";

const UpdateStatus = ({ SavingStatus = "init", date, updatedBy }) => {
  const { t } = useTranslation();
  const timeStamp = useFormattedTimestamp(date);

  const updatedInfo = `${t(
    translations.ProductRecipe.LAST_UPDATED
  )} ${timeStamp} ${t(translations.ProductRecipe.BY)} ${updatedBy}`;

  return (
    <ContentWrapper>
      {SavingStatus === "init" && (
        <UpdateWrapper>
          <UpdatedIcon src={SavingIcon} alt="saving" />
          <UpdatedInfoText>{updatedInfo}</UpdatedInfoText>
        </UpdateWrapper>
      )}
      {SavingStatus === "saving" && (
        <UpdateWrapper>
          <SpinningIcon src={SavingIcon} alt="saving" />
          <UpdatedInfoText>
            {t(translations.ProductRecipe.SAVING_CHANGES)}
          </UpdatedInfoText>
        </UpdateWrapper>
      )}
      {SavingStatus === "saved" && (
        <UpdateWrapper>
          <UpdatedIcon src={SavedIcon} alt="saved" />
          <UpdatedInfoText>
            {t(translations.ProductRecipe.CHANGES_SAVED)}
          </UpdatedInfoText>
        </UpdateWrapper>
      )}
    </ContentWrapper>
  );
};

export default UpdateStatus;
