import { useEffect, useState } from "react";
import { DisplayTypeContextProvider } from "../../context/useDisplayType";
import { useDisplayForm } from "../../context/useDisplayForm";
import Accordion from "../shared/Accordion";
import { DashboardFormContainer } from "./dashboard-form.styles";
import FormContent from "./FormContent/FormContent";
import FormSummary from "./FormSummary/FormSummary";
import { PCDisplay } from "../../ts";

type DashboardFormProps = {
  initExpanded: boolean;
  display?: PCDisplay;
  onDoneEditing?: () => void;
};

export default function DashboardForm({
  initExpanded,
  display,
  onDoneEditing,
}: DashboardFormProps) {
  const [expanded, setExpanded] = useState(initExpanded);

  const { setInitialPCDisplayValues, pcDisplay } = useDisplayForm();

  const onClose = () => {
    setExpanded((prev) => !prev);
    onDoneEditing && onDoneEditing();
  };

  const onSummaryClick = () => {
    if (!display) {
      if (Object.keys(pcDisplay).length > 0 && pcDisplay.PCParams.length > 0) {
        return;
      }
    }
    onClose();
  };

  useEffect(() => {
    setInitialPCDisplayValues(display);
  }, [display, setInitialPCDisplayValues]);

  return (
    <DashboardFormContainer>
      <DisplayTypeContextProvider>
        <Accordion
          summaryComponent={<FormSummary expanded={expanded} />}
          contentComponent={<FormContent onDoneEditing={onClose} />}
          expanded={expanded}
          arrowCentered
          variant="form"
          updateExpanded={onSummaryClick}
        />
      </DisplayTypeContextProvider>
    </DashboardFormContainer>
  );
}
