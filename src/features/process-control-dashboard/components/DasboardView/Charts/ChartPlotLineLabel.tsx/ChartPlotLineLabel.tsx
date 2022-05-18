import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { JobDetails } from "../../../../ts";
import {
  ChartPlotLineLabelContainer,
  Title,
  Value,
} from "./chart-plot-line-label.styles";

type ChartPlotLineLabelProps = {
  jobDetails: JobDetails | undefined;
  timeStamp: string;
};

export default function ChartPlotLineLabel({
  jobDetails,
  timeStamp,
}: ChartPlotLineLabelProps) {
  const { t } = useTranslation();
  return (
    <ChartPlotLineLabelContainer>
      <Item
        title={t(translations.ProcessControlDashboard.ERPJobID)}
        value={jobDetails?.ERPJobID || ""}
      />
      <Item
        title={t(translations.ProcessControlDashboard.ProductName)}
        value={jobDetails?.ProductName || ""}
      />
      <Item
        title={t(translations.ProcessControlDashboard.CatalogNo)}
        value={jobDetails?.ProductCatalogID || ""}
      />
      <Item
        title={t(translations.ProcessControlDashboard.Timestamp)}
        value={timeStamp}
      />
    </ChartPlotLineLabelContainer>
  );
}

function Item({ title, value }: { title: string; value: string | number }) {
  return (
    <>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </>
  );
}
