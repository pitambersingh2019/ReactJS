import { FC } from "react";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../../../../Component/CustomComponent/Button";
import { translations } from "../../../../locales/translations";
import { TStep } from "../../reducer/types";
import * as Styled from "./style";

interface IProps {
  stepCreate: TStep;
  onClickClose: () => void;
  onClickApply: () => void;
  onClickBackNext: (stepNum: 1 | -1) => void;
  stepCheck: boolean[];
}

const ButtonCreate: FC<IProps> = ({
  stepCreate,
  onClickClose,
  onClickBackNext,
  stepCheck,
  onClickApply,
}) => {
  const { t } = useTranslation();

  const textPrimary =
    stepCreate !== 4
      ? t(translations.CustomKPI.CreateButtonNext)
      : t(translations.CustomKPI.CreateButtonApply);

  const textSecondary =
    stepCreate === 1
      ? t(translations.CustomKPI.CreateButtonClose)
      : t(translations.CustomKPI.CreateButtonBack);

  const onClickSecondary = () => {
    if (stepCreate === 1) {
      onClickClose();
      return;
    }
    onClickBackNext(-1);
  };

  const onClickPrimary = () => {
    if (stepCreate !== 4) {
      onClickBackNext(1);
      return;
    }
    onClickApply();
  };

  return (
    <Styled.Wrapper>
      <ButtonComponent
        isAble={true}
        size="l"
        buttonType="secondary"
        text={textSecondary}
        onClick={onClickSecondary}
      />

      <ButtonComponent
        isAble={stepCheck[stepCreate - 1]}
        size="l"
        buttonType="primary"
        text={textPrimary}
        onClick={onClickPrimary}
      />
    </Styled.Wrapper>
  );
};

export default ButtonCreate;
