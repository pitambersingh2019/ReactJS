import { useTranslation } from "react-i18next";
import EditableInput from "../../../../../Component/DesignSystem/EditableInput";
import { translations } from "../../../../../locales/translations";
import { useEditMode } from "../../../context/useEditMode";
import {
  HeaderContainer,
  Mode,
  RowContainer,
  VerticalDivider,
} from "./header.styles";

export default function Header() {
  const { activeDashboard, setActiveDashboard } = useEditMode();

  const { t } = useTranslation();

  const setDashboardName = (value: string) => {
    setActiveDashboard((prev) => ({
      ...prev,
      DashboardName: value,
    }));
  };

  return (
    <HeaderContainer>
      <EditableInput
        value={activeDashboard?.DashboardName || ""}
        onChangeValue={setDashboardName}
        variant="lg"
        placeholder={t(translations.ProcessControlDashboard.DashboardName)}
        maxCharacters={40}
        showEditPencil
        maxLength={40}
      />
      <RowContainer>
        <VerticalDivider />
        <Mode>{t(translations.ProcessControlDashboard.EditMode)}</Mode>
      </RowContainer>
    </HeaderContainer>
  );
}
