import * as Styled from "./style";
import flagDefaultImg from "../../../../assets/img/Bookmark_default.svg";
import flagSelectImg from "../../../../assets/img/Bookmark_selected.svg";
import MySwitch from "../../../../../../Component/CustomComponent/MySwitch";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { translations } from "../../../../../../locales/translations";

interface IProps {
  onClickPrimary: () => void;
  onClickActive: () => void;
  isPrimary: boolean;
  isActive: boolean;
}

const RowActiveCK: FC<IProps> = ({
  isPrimary,
  isActive,
  onClickActive,
  onClickPrimary,
}) => {
  const { t } = useTranslation();
  return (
    <Styled.Wrapepr>
      <Styled.WrapperPrimaryKPI>
        <div>{t(translations.CustomKPI.FourthStepPrimary)}</div>
        <Styled.WrapperPrimaryKPIImg
          onClick={onClickPrimary}
          isActiveKPI={isActive}
        >
          <img
            src={isPrimary && isActive ? flagSelectImg : flagDefaultImg}
            alt=""
          />
        </Styled.WrapperPrimaryKPIImg>
      </Styled.WrapperPrimaryKPI>
      <Styled.WrapperActiveLine>
        <Styled.Title>
          {t(translations.CustomKPI.FourthStepActive)}
        </Styled.Title>
        <MySwitch checked={isActive} onChange={onClickActive} />
      </Styled.WrapperActiveLine>
    </Styled.Wrapepr>
  );
};

export default RowActiveCK;
