import { getCurrentUserId } from "../../../tasks-management/utils";
import useSearch from "../../context/useSearch";
import { Dashboard } from "../../ts";
import DashboardAccordion from "../DashboardAccordion/DashboardAccordion";
import SearchBar from "../SearchBar/SearchBar";
import { ContentContainer, DashboardsContainer } from "./dashboards.styles";

type DashboardsProps = {
  dashboards: {
    CurrentUserDashboards: Dashboard[];
    OtherUsersDashboards: Dashboard[];
  };
};

export default function Dashboards({ dashboards }: DashboardsProps) {
  const { CurrentUserDashboards, OtherUsersDashboards } = dashboards;
  const { foundDashboards } = useSearch([
    ...CurrentUserDashboards,
    ...OtherUsersDashboards,
  ]);

  const { currentUser, otherUsers } = foundDashboards.reduce(
    (result, dashboard) => {
      dashboard.DashboardCreatorID === getCurrentUserId()
        ? result.currentUser.push(dashboard)
        : result.otherUsers.push(dashboard);
      return result;
    },
    { currentUser: [], otherUsers: [] } as {
      currentUser: Dashboard[];
      otherUsers: Dashboard[];
    }
  );

  const isProductionFloor = document.getElementById("production-pcd") !== null;

  return (
    <DashboardsContainer>
      <SearchBar />
      <ContentContainer isProductionFloor={isProductionFloor}>
        <DashboardAccordion dashboards={currentUser} />
        <DashboardAccordion isCreatedByOthers dashboards={otherUsers} />
      </ContentContainer>
    </DashboardsContainer>
  );
}
