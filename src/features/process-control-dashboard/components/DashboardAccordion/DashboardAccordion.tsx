import { useTranslation } from "react-i18next";
import Accordion from "../shared/Accordion";
import { translations } from "../../../../locales/translations";
import CardsList from "./CardsList/CardsList";
import Summary from "./Summary/Summary";
import { AccordionContainer } from "./styles";
import { Dashboard } from "../../ts";

type DashboardAccordionProps = {
  isCreatedByOthers?: boolean;
  dashboards: Dashboard[];
};

export default function DashboardAccordion({
  isCreatedByOthers = false,
  dashboards,
}: DashboardAccordionProps) {
  const { t } = useTranslation();

  const title = isCreatedByOthers
    ? t(translations.ProcessControlDashboard.CreatedByOthers)
    : t(translations.ProcessControlDashboard.CreatedByMe);

  const count = dashboards.length;

  const subtitle =
    count === 1
      ? t(translations.ProcessControlDashboard.Dashboard)
      : t(translations.ProcessControlDashboard.Dashboards);

  return (
    <AccordionContainer>
      <Accordion
        summaryComponent={
          <Summary title={title} subtitle={`${count} ${subtitle}`} />
        }
        contentComponent={
          <CardsList
            dashboards={dashboards}
            isCreatedByOthers={isCreatedByOthers}
          />
        }
        expanded
      />
    </AccordionContainer>
  );
}
