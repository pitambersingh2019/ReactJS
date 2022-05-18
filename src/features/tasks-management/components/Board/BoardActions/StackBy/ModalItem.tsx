import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";
import { StackByOption, useStackBy } from "../../../../context/useStackBy";
import { ModalItemContainer } from "./styles";

type ModalItemProps = {
  name: StackByOption["name"];
  isSelected: boolean;
};

export default function ModalItem({ name, isSelected }: ModalItemProps) {
  const { setStackBySelectedOption } = useStackBy();

  const onClick = () => {
    setStackBySelectedOption(name);
  };
  const { t } = useTranslation();

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  const translatedOption = t(translations.TasksManagement[capitalizedName]);

  return (
    <ModalItemContainer isSelected={isSelected} onClick={onClick}>
      {translatedOption}
    </ModalItemContainer>
  );
}
