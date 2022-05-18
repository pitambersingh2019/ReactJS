import { useTranslation } from "react-i18next";
import { translations } from "../../../../../locales/translations";
import { StackByOption, useStackBy } from "../../../context/useStackBy";
import { StackByModalItemContainer } from "./styles";

type StackByModalItemProps = {
  name: StackByOption["name"];
  isSelected: boolean;
};

export default function StackByModalItem({
  name,
  isSelected,
}: StackByModalItemProps) {
  const { setStackBySelectedOption } = useStackBy();

  const onClick = () => {
    setStackBySelectedOption(name);
  };

  const { t } = useTranslation();

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  const translatedOption = t(translations.TasksManagement[capitalizedName]);

  return (
    <StackByModalItemContainer isSelected={isSelected} onClick={onClick}>
      {translatedOption}
    </StackByModalItemContainer>
  );
}
