import { ExportChartContainer, MenuIcon } from "./export-chart.styles";
import menuIcon from "../../../../../../assets/icons/3_dots_menu.svg";
import { MutableRefObject, useState } from "react";
import ExportModal from "./ExportModal";
import HighchartsReact from "highcharts-react-official";

type ExportChartProps = {
  chartRef: MutableRefObject<HighchartsReact.RefObject>;
};

export default function ExportChart({ chartRef }: ExportChartProps) {
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  return (
    <ExportChartContainer>
      <MenuIcon src={menuIcon} alt="menu icon" onClick={onShowModal} />
      {showModal && (
        <ExportModal onCloseModal={onCloseModal} chartRef={chartRef} />
      )}
    </ExportChartContainer>
  );
}
