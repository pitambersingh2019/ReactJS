import { FC } from "react";
import InputDefault from "../../../../../../../../Component/CustomComponent/InputDefault";
import { translations } from "../../../../../../../../locales/translations";
import { useTranslation } from "react-i18next";
import * as Styled from "./style";

interface IProps {
  status: boolean;
  onChange: () => void;
  title: string;
}

const HeaderSetting: FC<IProps> = ({ status, onChange, title }) => {
  const { t } = useTranslation();
  return (
    <Styled.Header>
      <Styled.HeaderTitle>{title}</Styled.HeaderTitle>
      <InputDefault
        text={t(translations.QuantityTargetsManagement.SelectAll)}
        type="checkbox"
        color="#6d6dc5"
        isActive={status}
        onClick={onChange}
      />
    </Styled.Header>
  );
};

export default HeaderSetting;
