import {
  Label,
  LastUpdatedContainer,
  RefreshIcon,
} from "./last-updated.styles";
import refreshIcon from "../../../../../../assets/icons/saving.svg";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { useTimeFrame } from "../../../../context/useTimeFrame";
import { useCustomTimeFrame } from "../../../../context/useCustomTimeFrame";
import moment from "moment";

type LastUpdatedProps = {
  updatedAt: Date | undefined;
  onRefetch: () => void;
  isLoading: boolean;
};

export default function LastUpdated({
  updatedAt,
  onRefetch,
  isLoading,
}: LastUpdatedProps) {
  const { t } = useTranslation();

  const {
    dates: { customEndDate },
  } = useCustomTimeFrame();

  const {
    timeFrameSelectedOption: { value },
  } = useTimeFrame();

  const hide =
    value === "Custom" && !moment(customEndDate).isSame(moment(), "day");

  const formattedUpdated = moment(updatedAt).format("HH:mm");

  return !hide ? (
    <LastUpdatedContainer>
      <RefreshIcon
        src={refreshIcon}
        alt="refresh icon"
        onClick={onRefetch}
        isLoading={isLoading}
      />
      <Label>
        {t(translations.ProcessControlDashboard.LastUpdatedAt)}{" "}
        {formattedUpdated}
      </Label>
    </LastUpdatedContainer>
  ) : null;
}
