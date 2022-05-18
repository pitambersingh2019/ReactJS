import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useSelector } from "react-redux";
import {
  selectUpdatedData,
  selectSavingStatus,
} from "../../../slice/selectors";
import useFormattedTimestamp from "../../../utils/hooks/useFormattedTimestamp";
import SavingIcon from "../../../../../assets/icons/saving.svg";
import SavedIcon from "../../../../../assets/icons/saved-tick.svg";
import {
  ContentWrapper,
  UpdatedInfoText,
  UpdatedIcon,
  UpdateWrapper,
  SpinningIcon,
} from "./update-status.styles";

const UpdateStatus: React.FC = () => {
  const { t } = useTranslation();
  const UpdatedData = useSelector(selectUpdatedData);
  const SavingStatus = useSelector(selectSavingStatus);

  const date = UpdatedData.lastUpdated;
  const updatedBy = UpdatedData.updatedBy;

  const timeStamp = useFormattedTimestamp(date);

  const updatedInfo = `${t(
    translations.ProductRecipe.LAST_UPDATED
  )} ${timeStamp} ${t(translations.ProductRecipe.BY)} ${updatedBy}`;

  return (
    <ContentWrapper>
      {SavingStatus === "init" && date && updatedBy && (
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
