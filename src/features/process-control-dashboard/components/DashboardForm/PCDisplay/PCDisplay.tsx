import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { useDisplayForm } from "../../../context/useDisplayForm";
import { useShowCombo } from "../../../context/useShowCombo";
import AddDisplay from "../../EditMode/AddDisplay/AddDisplay";
import Combo from "../Combo/Combo";
import PCDisplaysList from "../PCDisplaysList/PCDisplaysList";
import { Container } from "./pc-display.styles";

type PCDisplayComponentProps = {
  onScroll: () => void;
};

export default function PCDisplayComponent({
  onScroll,
}: PCDisplayComponentProps) {
  const { showCombo, setShowCombo } = useShowCombo();

  const { t } = useTranslation();

  const { pcDisplay } = useDisplayForm();

  const { PCParams: displays } = pcDisplay;

  const onShowCombo = () => {
    setShowCombo(true);
    onScroll();
  };

  const onHideCombo = () => {
    setShowCombo(false);
  };

  return (
    <Container>
      {displays?.length > 0 && (
        <PCDisplaysList pcDisplays={displays} onScroll={onScroll} />
      )}
      {showCombo || displays?.length < 1 ? (
        <Combo hideCombo={onHideCombo} onScroll={onScroll} />
      ) : (
        <AddDisplay
          onAddDisplay={onShowCombo}
          label={t(translations.ProcessControlDashboard.AddParameter)}
        />
      )}
    </Container>
  );
}
