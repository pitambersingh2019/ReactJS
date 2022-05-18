import { ClickAwayListener } from "@mui/material";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { Divider, ExportModalContainer } from "./export-chart.styles";
import ExportOption from "./ExportOption";
import { MutableRefObject } from "react";
import HighchartsReact from "highcharts-react-official";
import { ExportingMimeTypeValue } from "highcharts";
import downloadIcon from "../../../../../../assets/icons/download.svg";
import printIcon from "../../../../../../assets/icons/Print.svg";
import fullScreenIcon from "../../../../../../assets/icons/full-screen.svg";

type ExportModalProps = {
  onCloseModal: () => void;
  chartRef: MutableRefObject<HighchartsReact.RefObject>;
};

export default function ExportModal({
  onCloseModal,
  chartRef,
}: ExportModalProps) {
  const { t } = useTranslation();

  const onFullScreen = () => {
    chartRef.current.chart.fullscreen.toggle();
  };

  const onPrintChart = () => {
    chartRef.current.chart.print();
  };

  const onCSVDownload = () => {
    chartRef.current.chart.downloadCSV();
  };

  const onDownload = (type?: ExportingMimeTypeValue) => {
    type
      ? chartRef.current.chart.exportChart({ type }, {})
      : chartRef.current.chart.exportChart({}, {});
  };

  return (
    <ClickAwayListener onClickAway={onCloseModal}>
      <ExportModalContainer onClick={onCloseModal}>
        <ExportOption
          label={t(translations.ProcessControlDashboard.ViewInFullScreen)}
          icon={fullScreenIcon}
          onClick={onFullScreen}
        />
        <ExportOption
          label={t(translations.ProcessControlDashboard.PrintChart)}
          icon={printIcon}
          onClick={onPrintChart}
        />
        <Divider />
        <ExportOption
          label={t(translations.ProcessControlDashboard.DownloadCSV)}
          icon={downloadIcon}
          onClick={onCSVDownload}
        />
        <ExportOption
          label={t(translations.ProcessControlDashboard.DownloadJPGimage)}
          icon={downloadIcon}
          onClick={() => onDownload("image/jpeg")}
        />
        <ExportOption
          label={t(translations.ProcessControlDashboard.DownloadPDFdocument)}
          icon={downloadIcon}
          onClick={() => onDownload("application/pdf")}
        />
        <ExportOption
          label={t(translations.ProcessControlDashboard.DownloadSVGvectorImage)}
          icon={downloadIcon}
          onClick={() => onDownload("image/svg+xml")}
        />
      </ExportModalContainer>
    </ClickAwayListener>
  );
}
