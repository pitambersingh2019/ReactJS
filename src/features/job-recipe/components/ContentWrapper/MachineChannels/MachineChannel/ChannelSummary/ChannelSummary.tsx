import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../locales/translations";
import Checkbox from "../../../../shared/Checkbox";
import {
  ChannelPC,
  ChannelSummaryContainer,
  SideContainer,
  Title,
} from "./channel-summary.styles";

type ChannelSummaryProps = {
  title: string;
  channelPC: string;
  hideEmptyLines: boolean;
  onCheckboxToggle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function ChannelSummary({
  title,
  channelPC,
  hideEmptyLines,
  onCheckboxToggle,
}: ChannelSummaryProps) {
  const { t } = useTranslation();
  return (
    <ChannelSummaryContainer>
      <SideContainer>
        <Title>{title}</Title>
      </SideContainer>
      <SideContainer>
        <Checkbox
          checked={hideEmptyLines}
          onToggle={(e) => onCheckboxToggle(e)}
          label={t(translations.JobRecipe.HideEmptyLines)}
        />
        {channelPC && <ChannelPC>{channelPC}</ChannelPC>}
      </SideContainer>
    </ChannelSummaryContainer>
  );
}
