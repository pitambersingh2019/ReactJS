import {
  CloseIcon,
  DashboardTitle,
  DashboardViewContainer,
  SideContainer,
  TopRow,
  Wrapper,
} from "./dashboard-view.styles";
import closeIcon from "../../../../assets/icons/closeIcon.svg";
import { useDashboardView } from "../../context/useDashboardView";
import {
  SAVING_STATE,
  useSavingChangesContext,
} from "../../context/useSavingChanges";
import SavingChanges from "../shared/SavingChanges";
import ChangesSaved from "../shared/ChangesSaved";
import ChartsArea from "./ChartsArea/ChartsArea";

export default function DashboardView() {
  const { onCloseDashboardView, activeDashboard } = useDashboardView();
  const { saving } = useSavingChangesContext();

  return (
    <DashboardViewContainer>
      <TopRow>
        <SideContainer>
          <DashboardTitle>{activeDashboard?.DashboardName}</DashboardTitle>
          {saving === SAVING_STATE.SAVING && <SavingChanges />}
          {saving === SAVING_STATE.SAVED && <ChangesSaved />}
        </SideContainer>
        <CloseIcon
          src={closeIcon}
          alt="Close icon"
          onClick={onCloseDashboardView}
        />
      </TopRow>
      <Wrapper>
        <ChartsArea />
      </Wrapper>
    </DashboardViewContainer>
  );
}
