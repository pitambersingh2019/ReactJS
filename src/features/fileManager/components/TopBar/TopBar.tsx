import Header from "../Header";
import PeriodSelector from "../PeriodSelector/PeriodSelector";
import { TopBarContainer } from "./top-bar.styles";

export default function TopBar() {
  return (
    <TopBarContainer>
      <Header />
      <PeriodSelector />
    </TopBarContainer>
  );
}
