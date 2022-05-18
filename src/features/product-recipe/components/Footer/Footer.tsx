import { useTranslation } from "react-i18next";
import { translations } from "../../../../locales/translations";
import { useDispatch, useSelector } from "react-redux";
import { SaveAllChanges, SetEditing } from "../../slice";
import { selectChangedValues, selectEditMode } from "../../slice/selectors";
import { FooterContainer, FooterButton, RequiredText } from "./footer.styles";

interface FooterProps {
  onScrollToTop: () => void;
}

const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const changedValues = useSelector(selectChangedValues);
  const editMode = useSelector(selectEditMode);

  const saveAllChanges = () => {
    onScrollToTop();
    dispatch(SaveAllChanges(changedValues));
  };

  const CancelSave = () => {
    dispatch(SetEditing(false));
  };

  return (
    <FooterContainer show={editMode}>
      <RequiredText>{t(translations.ProductRecipe.REQUIRED)}</RequiredText>
      <FooterButton onClick={CancelSave} variant="secondary">
        {t(translations.ProductRecipe.DISCARD)}
      </FooterButton>
      <FooterButton
        onClick={saveAllChanges}
        variant="primary"
        disabled={changedValues.length > 0 ? false : true}
      >
        {t(translations.ProductRecipe.SAVE_CHANGES)}
      </FooterButton>
    </FooterContainer>
  );
};

export default Footer;
