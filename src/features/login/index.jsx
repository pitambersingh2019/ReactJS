import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  SidePanelContainer,
  MaticsGifStyled,
  Title,
  SubTitle,
  CopyRight,
} from "./styles";
import MaticsgifURL from "./utils/Matics.gif";
import Login from "./Login";
import ForgotPass from "./ForgotPass";
import SignUp from "./SignUp";
import { init } from "./slice";
import ValidatePage from "./Validate";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoading,
  selectImgLarge,
  selectImgMed,
  selectImgSmall,
} from "./slice/selectors";
import { StyledToastContainer } from "../../Component/Toast/ToastContainer";
export const PAGE = {
  LOGIN: "login",
  FORGOT_PASS: "forgot_pass",
  SIGNUP: "signup",
  VALIDATE: "validate",
};
import { translations } from "../../locales/translations";
import { useTranslation } from "react-i18next";

const Index = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [page, SetPage] = useState(PAGE.LOGIN);
  const { t } = useTranslation();
  const BackgroundLarge = useSelector(selectImgLarge);
  const BackgroundMed = useSelector(selectImgMed);
  const Backgroundsmall = useSelector(selectImgSmall);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const TitleText = useMemo(() => {
    if (page === PAGE.FORGOT_PASS) return t(translations.LOGIN.FORGOT_PASS);
    return t(translations.LOGIN.WELCOME_MATICS);
  }, [page, t]);

  const SubText = useMemo(() => {
    if (page === PAGE.FORGOT_PASS)
      return t(translations.LOGIN.ENTER_MAIL_SEND_PASS);
    return t(translations.LOGIN.SMART_DIGITAL);
  }, [page, t]);
  return (
    <Container
      page={page}
      BackgroundLarge={BackgroundLarge}
      BackgroundMed={BackgroundMed}
      Backgroundsmall={Backgroundsmall}
    >
      <StyledToastContainer />
      <SidePanelContainer pageLoading={loading} page={page}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: loading ? "center" : "start",
            alignItems: "center",
          }}
        >
          <MaticsGifStyled
            pageLoading={loading}
            src={MaticsgifURL}
            alt="Matics"
          />
        </div>
        {!loading && (
          <div style={{ width: "100%" }}>
            <Title>{TitleText}</Title>
            <SubTitle>{SubText}</SubTitle>
            {page === PAGE.LOGIN && (
              <Login
                SetPage={SetPage}
                scope={props.$scope}
                setTheme={props.setTheme}
              />
            )}
            {page === PAGE.FORGOT_PASS && <ForgotPass SetPage={SetPage} />}
            {page === PAGE.SIGNUP && <SignUp SetPage={SetPage} />}
            {page === PAGE.VALIDATE && <ValidatePage SetPage={SetPage} />}
            <CopyRight />
          </div>
        )}
      </SidePanelContainer>
    </Container>
  );
};

export default Index;
