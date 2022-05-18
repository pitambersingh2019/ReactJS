/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  FieldsContainer,
  ButtonsWrapper,
  SecondaryButton,
  Button,
  OrDiv,
  NoAccountWrapper,
  NoAccountText,
  SignUpLink,
  ForgotPasswordLink,
  ErrorText,
  Wrapper,
} from "./styles";
import { translations } from "../../locales/translations";
import { useTranslation } from "react-i18next";
import TextInput from "../../Component/DesignSystem/InputText";
import PasswordInput from "../../Component/DesignSystem/PasswordInput";
import DropDown from "../../Component/DesignSystem/DropDown/SingleSelect";
import { PAGE } from "./index";
import useLogin from "./utils/index";
import { useSelector, useDispatch } from "react-redux";
import { selectLanguageItems, selectLanguage } from "./slice/selectors";
import { setLanguage } from "./slice";
import ReCAPTCHA from "react-google-recaptcha";
import { getService } from "../../utils/React2Ang/react-to-angular";
const Login = ({ SetPage, scope, setTheme }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttemps, setloginAttemps] = useState(0);
  const languageItems = useSelector(selectLanguageItems);
  const language = useSelector(selectLanguage);
  const [err, setErr] = useState({ value: false, text: "" });
  const { t } = useTranslation();

  const [changeLanguage, getDefaultLanguage, login, openAzurePopup] = useLogin(
    setErr,
    SetPage
  );
  const handleForgotPassLinkClick = () => {
    SetPage(PAGE.FORGOT_PASS);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
    // scope.loginctrl.credData.username = text;
    // scope.$apply();
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    // scope.loginctrl.credData.password = text;
    // scope.$apply();
  };

  const handleChangeLang = (item) => {
    if (item) {
      changeLanguage(item);
      dispatch(setLanguage(item));
      handleDirection(item);
    }
  };

  const handleSubmit = () => {
    // scope.$parent.login();
    if (!username) {
      setErr({ value: true, text: t(translations.LOGIN.FILL_USER) });
      return;
    }
    if (!password) {
      setErr({ value: true, text: t(translations.LOGIN.FILL_PASS) });
      return;
    }
    if (loginAttemps >= 3) {
      if (!recaptchaValue.current) {
        setErr({ value: true, text: t(translations.LOGIN.VALIDATE_RECAP) });
        return;
      }
    }
    setloginAttemps((prev) => prev + 1);
    login(username, password, language);
  };

  useEffect(() => {
    const defaultLang = getDefaultLanguage(languageItems);
    dispatch(setLanguage(defaultLang));
    handleDirection(defaultLang);
    changeLanguage(defaultLang);
  }, [
    changeLanguage,
    dispatch,
    getDefaultLanguage,
    handleDirection,
    languageItems,
  ]);

  const [keyRecaptcha, setKeyRecaptcha] = useState(0);
  const recaptchaValue = useRef(null);
  useEffect(() => {
    //get recaptcha key!
    const GLOBAL = getService("GLOBAL");
    setKeyRecaptcha(GLOBAL.recaptcha);
  }, []);

  const onChange = (value) => {
    recaptchaValue.current = value;
  };

  const handleDirection = useCallback(
    (lang) => {
      setTheme((prev) => ({ ...prev, dir: lang.LngRtl ? "rtl" : "ltr" }));
      document.body.dir = lang.LngRtl ? "rtl" : "ltr";
    },
    [setTheme]
  );

  return (
    <Wrapper>
      <FieldsContainer paddingBottom={err.value ? false : true}>
        <TextInput
          TitleText={t(translations.LOGIN.username)}
          placeholder={t(translations.LOGIN.FILL_MAIL_USER)}
          onChange={(text) => handleUsernameChange(text)}
          value={username}
        />
        <div style={{ width: "100%", position: "relative" }}>
          <ForgotPasswordLink onClick={handleForgotPassLinkClick} />
          <PasswordInput
            TitleText={t(translations.LOGIN.password)}
            placeholder={t(translations.LOGIN.ENTER_PASS)}
            value={password}
            onChange={(pass) => handlePasswordChange(pass)}
          />
        </div>
        <DropDown
          TitleText={t(translations.LOGIN.LANGUAGE)}
          placeholder={t(translations.LOGIN.SELECT_LANG)}
          selectedItem={language}
          items={languageItems}
          allowEmptySelect={false}
          onSelect={(item) => handleChangeLang(item)}
        />
        {keyRecaptcha && loginAttemps >= 2 && (
          <ReCAPTCHA sitekey={keyRecaptcha} onChange={onChange} size="normal" />
        )}
      </FieldsContainer>
      {err.value && <ErrorText>{err.text}</ErrorText>}
      <ButtonsWrapper>
        <Button onClick={handleSubmit}>{t(translations.LOGIN.LOGIN)}</Button>
        <OrDiv />
        <SecondaryButton onClick={openAzurePopup}>
          {t(translations.LOGIN.LOGIN_ACTIVE_DIR)}
        </SecondaryButton>
        <NoAccountWrapper>
          <NoAccountText text={t(translations.LOGIN.NOACCOUNT)} />
          <SignUpLink text={"Sign up"} onClick={() => SetPage(PAGE.SIGNUP)} />
        </NoAccountWrapper>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default Login;
