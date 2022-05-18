import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  FieldsContainer,
  ButtonsWrapper,
  Button,
  NoAccountWrapper,
  NoAccountText,
  SignUpLink,
  TwoFieldsWrapper,
  ErrorText,
  Wrapper,
} from "./styles";
import { getService } from "../../utils/React2Ang/react-to-angular";
import TextInput from "../../Component/DesignSystem/InputText";
import PasswordInput from "../../Component/DesignSystem/PasswordInput";
import DropDown from "../../Component/DesignSystem/DropDown/SingleSelect";
import { PAGE } from "./index";
import usePositionRole from "./hooks/usePositionRole";
import { notifySuccessToast } from "../../Component/Toast/ToastContainer";
import { apiCall } from "../../utils/Network";
import ReCAPTCHA from "react-google-recaptcha";
import { translations } from "../../locales/translations";
import { useTranslation } from "react-i18next";

const SignUp = ({ SetPage }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState({ value: false, text: "" });
  const [positionItems, positionRole, setPositionRole] = usePositionRole();
  const isRegestring = useRef(false);
  const { t } = useTranslation();
  const CrateAccountDisabled = useMemo(
    () =>
      !email ||
      !Password ||
      !confirmPassword ||
      Password !== confirmPassword ||
      Password.length < 6,
    [Password, confirmPassword, email]
  );

  const handleCreateAccount = () => {
    if (isRegestring.current || CrateAccountDisabled) {
      return;
    }
    isRegestring.current = true;
    //no need for validates because the button is disabled
    // if (!email) {
    //   notifyErrorToast("Error", "Please fill email!", 3000);
    //   setErr({ value: true, text: "Please fill email!" });
    //   isRegestring.current = false;
    //   return;
    // }
    // if (!Password) {
    //   notifyErrorToast("Error", "Please fill password!", 3000);
    //   isRegestring.current = false;
    //   return;
    // }
    // if (Password.length < 6) {
    //   notifyErrorToast(
    //     "Error",
    //     "Password should have at least 6 characters!",
    //     3000
    //   );
    //   isRegestring.current = false;
    //   return;
    // }
    // if (!confirmPassword) {
    //   notifyErrorToast("Error", "Please fill confirm password!", 3000);
    //   isRegestring.current = false;
    //   return;
    // }
    // if (confirmPassword !== Password) {
    //   isRegestring.current = false;
    //   notifyErrorToast(
    //     "Error",
    //     "Password and confirm password does not match!",
    //     3000
    //   );
    //   return;
    // }
    if (!recaptchaValue.current) {
      isRegestring.current = false;
      setErr({ value: true, text: t(translations.LOGIN.VALIDATE_RECAP) });
      return;
    }
    const request = {
      baseUser: {
        ID: 0,
        Name: name,
        LastName: lastName,
        Email: email,
        Position: positionRole?.value ?? 1,
        Password: Password,
      },
    };

    apiCall("UpdateUserDetails", "POST", request)
      .then((res) => {
        console.log(res);
        if (!res.error) {
          notifySuccessToast(
            t(translations.LOGIN.SUCCESS),
            t(translations.LOGIN.USER_SENT_APPROVAL),
            6000
          );
          SetPage(PAGE.LOGIN);
        } else {
          setErr({ value: true, text: res.error.ErrorDescription });
        }
      })
      .catch((err) => {
        console.log(err);
        setErr({ value: true, text: "Network Error!" });
      });
    isRegestring.current = false;
  };

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

  return (
    <Wrapper>
      <FieldsContainer paddingBottom={false}>
        <TwoFieldsWrapper>
          <TextInput
            TitleText={t(translations.LOGIN.Name)}
            placeholder={t(translations.LOGIN.ADD_NAME)}
            onChange={(text) => setName(text)}
            value={name}
          />
          <TextInput
            TitleText={t(translations.LOGIN.LastName)}
            placeholder={t(translations.LOGIN.ADD_LASTNAME)}
            onChange={(text) => setLastName(text)}
            value={lastName}
          />
        </TwoFieldsWrapper>

        <TextInput
          TitleText={t(translations.LOGIN.username)}
          placeholder={t(translations.LOGIN.FILL_MAIL_USER)}
          onChange={(text) => setEmail(text)}
          value={email}
        />
        <DropDown
          TitleText={t(translations.LOGIN.POSITION)}
          placeholder={t(translations.LOGIN.SELECT_POSITION)}
          selectedItem={positionRole}
          items={positionItems}
          onSelect={(item) => setPositionRole(item)}
        />
        <TwoFieldsWrapper>
          <PasswordInput
            TitleText={t(translations.LOGIN.password)}
            placeholder={t(translations.LOGIN.ADD_YOUR_PASS)}
            value={Password}
            onChange={(pass) => setPassword(pass)}
          />
          <PasswordInput
            TitleText={t(translations.LOGIN.RETYPE_PASS)}
            placeholder={t(translations.LOGIN.ADD_YOUR_PASS)}
            value={confirmPassword}
            onChange={(pass) => setConfirmPassword(pass)}
          />
        </TwoFieldsWrapper>
      </FieldsContainer>
      {keyRecaptcha && (
        <div style={{ margin: "12px 0" }}>
          <ReCAPTCHA sitekey={keyRecaptcha} onChange={onChange} size="normal" />
        </div>
      )}
      {err.value && <ErrorText>{err.text}</ErrorText>}
      <ButtonsWrapper>
        <Button onClick={handleCreateAccount} disabled={CrateAccountDisabled}>
          {t(translations.LOGIN.CREATE_ACC)}
        </Button>
        <NoAccountWrapper>
          <NoAccountText text={t(translations.LOGIN.HAVE_ACCOUNT)} />
          <SignUpLink
            text={t(translations.LOGIN.LOGIN)}
            onClick={() => SetPage(PAGE.LOGIN)}
          />
        </NoAccountWrapper>
      </ButtonsWrapper>
    </Wrapper>
  );
};
export default SignUp;
