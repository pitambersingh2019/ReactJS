import { UpdatedContainer, UpdatedIcon, UpdatedInfo } from "./styles";
import icon from "../../../../assets/icons/saving.svg";
import { useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import useFormattedTimestamp from "../../hooks/useFormattedTimestamp";
import SavingChanges from "./SavingChanges";
import { SAVING_STATE } from "../../ts";
import ChangesSaved from "./ChangesSaved";

export default function Updated() {
  const { lastUpdatedRecipeJob, isUpdating } = useAppSelector(
    (state) => state.jobRecipe
  );

  const date = lastUpdatedRecipeJob.date;
  const updatedBy = lastUpdatedRecipeJob.updatedBy;

  const { t } = useTranslation();

  const timeStamp = useFormattedTimestamp(date);

  const updatedInfo = `${t(
    translations.JobRecipe.LastUpdated
  )} ${timeStamp?.toLowerCase()} ${t(translations.JobRecipe.By)} ${updatedBy}`;

  return timeStamp ? (
    <UpdatedContainer>
      {isUpdating === SAVING_STATE.SAVING && <SavingChanges />}
      {isUpdating === SAVING_STATE.SAVED && <ChangesSaved />}
      {isUpdating === SAVING_STATE.IDLE && (
        <>
          <UpdatedIcon src={icon} alt="saving icon" />
          <UpdatedInfo>{updatedInfo}</UpdatedInfo>
        </>
      )}
    </UpdatedContainer>
  ) : null;
}
