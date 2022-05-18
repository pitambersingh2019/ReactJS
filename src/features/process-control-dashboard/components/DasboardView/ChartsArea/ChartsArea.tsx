import { useCallback, useEffect, useRef, useState } from "react";
import { getCurrentUserId } from "../../../../tasks-management/utils";
import { ChartsContextProvider } from "../../../context/useCharts";
import { useDashboardView } from "../../../context/useDashboardView";
import { JobActivationContextProvider } from "../../../context/useJobActivation";
import { ShowParamLimitsContextProvider } from "../../../context/useParamLimits";
import { ZoomAllContextProvider } from "../../../context/useZoomAll";
import { ZoomedContextProvider } from "../../../context/useZoomed";
import usePCDisplayGraphData from "../../../hooks/usePCDisplayGraphData";
import { exportMultipleChartsToPdf } from "../../../utils/export-utils";
import Actions from "../Actions/Actions";
import LineChartWrapper from "../Charts/LineChartWrapper";
import ChartsLoader from "../ChartsLoader/ChartsLoader";
import PCChartWrapper from "../ChartsWrapper/PCChartWrapper";
import { ChartsContent } from "../dashboard-view.styles";

export default function ChartsArea() {
  const [showSpinner, setShowSpinner] = useState(false);

  const { activeDashboard } = useDashboardView();
  const isMyDashboard =
    activeDashboard?.DashboardCreatorID === getCurrentUserId();

  const { fetchPCGraphData, pcGraphsData, status, updatedAt } =
    usePCDisplayGraphData();

  const renderCounter = useRef(0);

  const onFetchGraphData = useCallback(() => {
    if (activeDashboard) {
      activeDashboard.PCDisplays.length > 0 &&
        fetchPCGraphData(activeDashboard.PCDisplays);
    }
  }, [activeDashboard, fetchPCGraphData]);

  useEffect(() => {
    onFetchGraphData();
    const timer = setInterval(() => onFetchGraphData(), 5 * 60 * 1000); //fetch graph data every 5 mins
    return () => clearInterval(timer);
  }, [onFetchGraphData]);

  useEffect(() => {
    renderCounter.current = renderCounter.current + 1;
    status === "loading" && renderCounter.current < 4
      ? setShowSpinner(true)
      : setShowSpinner(false);
  }, [status]);

  const isProductionFloor = document.getElementById("production-pcd") !== null;

  return (
    <JobActivationContextProvider>
      <ShowParamLimitsContextProvider>
        <ZoomAllContextProvider>
          <Actions
            isMyDashboard={isMyDashboard}
            onExportToPDF={exportMultipleChartsToPdf}
            updatedAt={updatedAt}
            onRefetch={onFetchGraphData}
            isLoading={status === "loading"}
          />
          {showSpinner ? (
            activeDashboard?.PCDisplays.map(({ DisplayID }) => (
              <ChartsLoader key={DisplayID} />
            ))
          ) : (
            <ChartsContextProvider>
              <ZoomedContextProvider>
                <ChartsContent isProductionFloor={isProductionFloor}>
                  {pcGraphsData?.map((graph, idx) => (
                    <PCChartWrapper key={idx} isLoading={status === "loading"}>
                      <LineChartWrapper chartData={graph} />
                    </PCChartWrapper>
                  ))}
                </ChartsContent>
              </ZoomedContextProvider>
            </ChartsContextProvider>
          )}
        </ZoomAllContextProvider>
      </ShowParamLimitsContextProvider>
    </JobActivationContextProvider>
  );
}
