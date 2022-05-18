import { useTranslation } from "react-i18next";
import Toggle from "../../../../../Component/DesignSystem/Toggle";
import { translations } from "../../../../../locales/translations";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleShowReference } from "../../../redux/slice";
import CopyFromReference from "./CopyFromReference/CopyFromReference";
import ProductRecipe from "./ProductRecipe/ProductRecipe";
import {
  Label,
  ReferenceRowContainer,
  SideContainer,
  ToggleContainer,
} from "./reference-row.styles";

export default function ReferenceRow() {
  const dispatch = useAppDispatch();
  const showReference = useAppSelector(
    (state) => state.jobRecipe.showReference
  );
  const { t } = useTranslation();

  const onSwitchToggle = () => {
    dispatch(toggleShowReference());
  };
  return (
    <ReferenceRowContainer showReference={showReference}>
      <SideContainer>
        <Label>{t(translations.JobRecipe.ReferenceRecipe)}</Label>
        <ToggleContainer>
          <Toggle
            isOn={showReference}
            onToggleOnOff={onSwitchToggle}
            variant="purple"
          />
        </ToggleContainer>
      </SideContainer>
      {showReference && (
        <SideContainer>
          <ProductRecipe />
          <CopyFromReference />
        </SideContainer>
      )}
    </ReferenceRowContainer>
  );
}
