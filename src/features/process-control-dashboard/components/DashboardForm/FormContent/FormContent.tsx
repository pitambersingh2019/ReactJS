import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../../../Component/DesignSystem/Buttons";
import { translations } from "../../../../../locales/translations";
import { useDisplayType } from "../../../context/useDisplayType";
import { EditingContextProvider } from "../../../context/useEditing";
import { useScrollIntoView } from "../../../context/useScrollIntoView";
import { ShowComboContextProvider } from "../../../context/useShowCombo";
import useOnScreen from "../../../hooks/useOnScreen";
import DoneButton from "../DoneButton/DoneButton";
import OptionsRow from "../OptionsRow/OptionsRow";
import PCDisplayComponent from "../PCDisplay/PCDisplay";
import SPCDisplay from "../SPCDisplay/SPCDisplay";
import Subtitle from "../Subtitle/Subtitle";
import { ButtonsContainer, FormContentContainer } from "./form-content.styles";

type FormContentProps = {
  onDoneEditing: () => void;
};

export default function FormContent({ onDoneEditing }: FormContentProps) {
  const { t } = useTranslation();
  const { selectedDisplayType } = useDisplayType();

  const isPC = selectedDisplayType?.name === "PC";

  const ref = useRef<HTMLDivElement>(null);

  const { scrollToRef, onScroll: wrapperScroll } = useScrollIntoView();
  const { isIntersecting } = useOnScreen(scrollToRef);

  const onScroll = useCallback(() => {
    // const domNode = ref.current;
    // if (domNode) {
    //   setTimeout(() => {
    //     domNode.scrollTo({ top: domNode.scrollHeight, behavior: "smooth" });
    //   }, 100);
    // }
    // !isIntersecting && wrapperScroll();
  }, []);

  const scrollWrapper = () => {
    !isIntersecting && wrapperScroll();
  };

  return (
    <ShowComboContextProvider>
      <EditingContextProvider>
        <FormContentContainer ref={ref} onScroll={scrollWrapper}>
          <Subtitle
            text={t(translations.ProcessControlDashboard.SelectTypeOfDisplay)}
          />
          <OptionsRow />
          <Subtitle
            text={t(
              translations.ProcessControlDashboard.SelectMachineParameterCombo
            )}
          />
          {isPC ? <PCDisplayComponent onScroll={onScroll} /> : <SPCDisplay />}
        </FormContentContainer>
        <ButtonsContainer ref={scrollToRef}>
          <Button
            label={t(translations.ProcessControlDashboard.Close)}
            onClick={onDoneEditing}
            width="88px"
            variant="purple-secondary"
          />
          <DoneButton onDoneEditing={onDoneEditing} />
        </ButtonsContainer>
      </EditingContextProvider>
    </ShowComboContextProvider>
  );
}
