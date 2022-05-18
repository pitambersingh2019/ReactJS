import { ReactNode } from "react";
import ChartsSpinner from "../Charts/ChartsSpinner/ChartsSpinner";
import { Container, PCChartWrapperContainer } from "./pc-chart-wrapper.styles";

type PCChartWrapperProps = {
  isLoading: boolean;
  children: ReactNode;
};

export default function PCChartWrapper({
  isLoading,
  children,
}: PCChartWrapperProps) {
  return (
    <Container>
      <PCChartWrapperContainer isLoading={isLoading}>
        {children}
      </PCChartWrapperContainer>
      {isLoading && <ChartsSpinner />}
    </Container>
  );
}
