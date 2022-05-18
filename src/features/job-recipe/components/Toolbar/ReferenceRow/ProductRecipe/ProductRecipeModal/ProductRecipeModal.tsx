import { ClickAwayListener } from "@mui/material";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../../locales/translations";
import { useAppDispatch } from "../../../../../redux/hooks";
import { setSelectedRecipeRefType } from "../../../../../redux/slice";
import { ReferenceRecipeOption } from "../../../../../ts";
import {
  AlternativeRecipe,
  ModalItem,
  ModalItemContainer,
  ProductRecipeModalContainer,
} from "./product-recipe-modal.styles";

type ProductRecipeModalProps = {
  onCloseModal: () => void;
  onSelectOption: (option: ReferenceRecipeOption | undefined) => void;
  options: ReferenceRecipeOption[];
  selectedOption: ReferenceRecipeOption | undefined;
};

export default function ProductRecipeModal({
  onCloseModal,
  onSelectOption,
  options,
  selectedOption,
}: ProductRecipeModalProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onOptionClick = (option: ReferenceRecipeOption) => {
    onSelectOption(option);
    onCloseModal();
    dispatch(
      setSelectedRecipeRefType({
        refType: option.recipeRefType,
        standardID: option.recipeRefType === 6 ? option.id : 0,
      })
    );
  };

  return (
    <ClickAwayListener onClickAway={onCloseModal}>
      <ProductRecipeModalContainer>
        {options.map((option, idx) => (
          <ModalItemContainer
            key={idx}
            onClick={() => onOptionClick(option)}
            isSelected={option.id === selectedOption?.id}
          >
            {option.recipeRefType === 6 && (
              <AlternativeRecipe>
                {t(translations.JobRecipe.AlternativeRecipe)}:
              </AlternativeRecipe>
            )}
            <ModalItem isAlternativeRecipe={option.recipeRefType === 6}>
              {option.label}
            </ModalItem>
          </ModalItemContainer>
        ))}
      </ProductRecipeModalContainer>
    </ClickAwayListener>
  );
}
