import {
  ArrowIcon,
  DropdownContainer,
  Icon,
  ProductRecipeContainer,
} from "./product-recipe.styles";
import referenceIcon from "../../../../../../assets/icons/Reference_recipe.svg";
import arrowIcon from "../../../../../../assets/icons/Arowdropdown.svg";
import { useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { ReferenceRecipeOption } from "../../../../ts";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import ProductRecipeModal from "./ProductRecipeModal/ProductRecipeModal";
import ProductRecipeLabel from "./ProductRecipeLabel/ProductRecipeLabel";

export default function ProductRecipe() {
  const [showModal, setShowModal] = useState(false);

  const recipeRef = useAppSelector((state) => state.jobRecipe.recipeRef);

  const { t } = useTranslation();

  const makeOptions = () => {
    const topOptions: ReferenceRecipeOption[] = [
      {
        label: t(translations.JobRecipe.ProductRecipe),
        recipeRefType: 1,
        id: -1,
      },
      {
        label: t(translations.JobRecipe.LastMEJ),
        recipeRefType: 2,
        id: -2,
      },
    ];
    const alternativeOptions: ReferenceRecipeOption[] =
      recipeRef
        .find((ref) => ref.RecipeRefType === 6)
        ?.StandardRecipe.map(({ LName, standardID, Checked }) => ({
          label: LName,
          id: standardID,
          checked: Checked,
          recipeRefType: 6,
        })) || [];
    return [...topOptions, ...alternativeOptions];
  };

  const options = makeOptions();

  const [selectedOption, setSelectedOption] = useState<
    ReferenceRecipeOption | undefined
  >(options.find((option) => option.recipeRefType === 1));

  const onShowModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <ProductRecipeContainer>
      <Icon src={referenceIcon} alt="reference icon" />
      <DropdownContainer>
        <ProductRecipeLabel
          onShowModal={onShowModal}
          selectedOption={selectedOption}
        />
        <ArrowIcon src={arrowIcon} onClick={onShowModal} alt="arrow icon" />
        {showModal && (
          <ProductRecipeModal
            onCloseModal={onCloseModal}
            onSelectOption={setSelectedOption}
            options={options}
            selectedOption={selectedOption}
          />
        )}
      </DropdownContainer>
    </ProductRecipeContainer>
  );
}
