import { useTranslation } from "react-i18next";
import Toggle from "../../../../../../Component/DesignSystem/Toggle";
import { translations } from "../../../../../../locales/translations";
import { useZoomAll } from "../../../../context/useZoomAll";
import { ZoomContainer, Label, ToggleContainer } from "./zoom.styles";

export default function Zoom() {
  const { zoomAll, setZoomAll } = useZoomAll();
  const { t } = useTranslation();

  const handleToggle = () => {
    setZoomAll((prev) => !prev);
  };
  return (
    <ZoomContainer>
      <Label>{t(translations.ProcessControlDashboard.ZoomIn)}</Label>
      <ToggleContainer>
        <Toggle isOn={zoomAll} onToggleOnOff={handleToggle} variant="purple" />
      </ToggleContainer>
    </ZoomContainer>
  );
}
