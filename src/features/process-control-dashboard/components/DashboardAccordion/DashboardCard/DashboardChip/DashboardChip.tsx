import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { useDashboardId } from "../../../../context/useDashboardId";
import { ChipContainer, Text } from "./dashboard-chip.styles";

type DashboardChipProps = {
  dashboardId: number;
};

export default function DashboardChip({ dashboardId }: DashboardChipProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const {
    setNewDashboardId,
    newDashboardId,
    updatedDashboardId,
    setUpdatedDashboardId,
  } = useDashboardId();

  const text =
    newDashboardId === dashboardId
      ? t(translations.ProcessControlDashboard.New)
      : updatedDashboardId === dashboardId
      ? t(translations.ProcessControlDashboard.Updated)
      : null;

  useEffect(() => {
    const timeId = setTimeout(() => {
      setNewDashboardId(-1);
      setUpdatedDashboardId(undefined);
    }, 10000);

    return () => {
      clearTimeout(timeId);
    };
  }, [setNewDashboardId, setUpdatedDashboardId]);

  return (
    <ChipContainer ref={scrollRef}>
      <Text>{text}</Text>
    </ChipContainer>
  );
}
