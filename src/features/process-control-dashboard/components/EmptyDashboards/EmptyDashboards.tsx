import {
  BoxesRow,
  Content,
  ContentContainer,
  EmptyDashboardsContainer,
  EmptyIcon,
} from "./empty-dashboards.styles";
import Skeleton from "@mui/material/Skeleton";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import emptyIcon from "../../../../assets/icons/Dahsboard_empty_state.svg";

export default function EmptyDashboards() {
  const boxes = [1, 2, 3, 4];
  const { t } = useTranslation();
  return (
    <EmptyDashboardsContainer>
      <BoxesRow>
        {boxes.map((box) => (
          <Skeleton
            variant="rectangular"
            width={178}
            height={168}
            key={box}
            sx={{ bgcolor: "#f6f7fc", borderRadius: "4px" }}
          />
        ))}
      </BoxesRow>
      <ContentContainer>
        <EmptyIcon src={emptyIcon} alt="Empty icon" />
        <Content>
          {t(translations.ProcessControlDashboard.EmptyDashboardContent1)}
        </Content>
        <Content>
          {t(translations.ProcessControlDashboard.EmptyDashboardContent2)}
        </Content>
      </ContentContainer>
    </EmptyDashboardsContainer>
  );
}
