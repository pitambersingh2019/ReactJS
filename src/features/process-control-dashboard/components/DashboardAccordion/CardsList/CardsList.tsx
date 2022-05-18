import { Dashboard } from "../../../ts";
import DashboardCard from "../DashboardCard/DashboardCard";
import { CardsListContainer } from "./cards-list.styles";

type CardsListProps = {
  isCreatedByOthers?: boolean;
  dashboards: Dashboard[];
};

export default function CardsList({
  dashboards,
  isCreatedByOthers,
}: CardsListProps) {
  const reversed = [...dashboards].reverse();

  return (
    <CardsListContainer>
      {reversed.map((dashboard) => (
        <DashboardCard
          key={dashboard.DashboardID}
          dashboard={dashboard}
          isCreatedByOthers={isCreatedByOthers}
        />
      ))}
    </CardsListContainer>
  );
}
