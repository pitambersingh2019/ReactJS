import * as Styled from "./style";
import buttonImg from "../assets/img/Create.svg";
import { useDispatch, useSelector } from "react-redux";
import { setIsCreate } from "../reducer";
import { selectLastFetch, selectMainKPIs } from "../reducer/selectors";
import { useEffect } from "react";
import refreshImg from "./../assets/img/Refresh.svg";
import { refreshMainKPIs } from "../reducer/actions/intex";
import { useTranslation } from "react-i18next";
import { translations } from "../../../locales/translations";
import ButtonComponent from "../../../Component/CustomComponent/Button";

const getMinutes = (data: Date) => {
  const min = data.getMinutes();
  if (min < 10) {
    return "0" + min;
  }
  return min;
};

const Header = () => {
  const dispatch = useDispatch();
  const mainKPIs = useSelector(selectMainKPIs);
  const lastFetch = new Date(useSelector(selectLastFetch));
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(refreshMainKPIs());
    }, 5 * 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const onClickCreate = () => {
    dispatch(setIsCreate());
  };

  const onClickRefresh = () => {
    if (mainKPIs.isLoading) return;
    dispatch(refreshMainKPIs());
  };

  const numberActive = mainKPIs.data.reduce(
    (lastValue, current) => lastValue + current.NumberOfKPIs,
    0
  );

  return (
    <Styled.Wrapper>
      <Styled.WrapperLogo>
        <Styled.Logo>
          <Styled.LogoText>
            {t(translations.CustomKPI.MainHeaderTitle)}
          </Styled.LogoText>
          <Styled.LogoTime>
            <Styled.LogoTimeImgWrapper onClick={onClickRefresh}>
              <img src={refreshImg} />
            </Styled.LogoTimeImgWrapper>
            <Styled.LogoTimeText>
              {"Update  at " +
                lastFetch.getHours() +
                ":" +
                getMinutes(lastFetch)}
            </Styled.LogoTimeText>
          </Styled.LogoTime>
        </Styled.Logo>
        <Styled.ActiveKPI>
          {t(translations.CustomKPI.MainHeaderActice)}: {numberActive || 0}
        </Styled.ActiveKPI>
      </Styled.WrapperLogo>
      <ButtonComponent
        size="l"
        buttonType="primary"
        text={t(translations.CustomKPI.MainHeaderButton)}
        img={buttonImg}
        isAble={true}
        onClick={onClickCreate}
      />
    </Styled.Wrapper>
  );
};

export default Header;
