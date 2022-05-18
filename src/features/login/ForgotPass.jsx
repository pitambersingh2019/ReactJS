import React, { useCallback, useState } from "react";
import {
  FieldsContainer,
  ButtonsWrapper,
  SecondaryButton,
  Button,
} from "./styles";
import { translations } from "../../locales/translations";
import { useTranslation } from "react-i18next";
import TextInput from "../../Component/DesignSystem/InputText";
import { PAGE } from "./index";
import { apiCall } from "../../utils/Network";
import {
  notifyErrorToast,
  notifySuccessToast,
} from "../../Component/Toast/ToastContainer";
const ForgotPass = ({ SetPage }) => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const handleClickPassForgotButton = useCallback(() => {
    if (!email) {
      notifyErrorToast("Error", t(translations.LOGIN.FILL_EMAIL), 3000);
      return;
    }
    apiCall("SendResetPassword", "POST", {
      userEmail: email,
    })
      .then((res) => {
        console.log(res);
        if (res.error !== null) {
          notifyErrorToast(
            "Error",
            res.error.ErrorCode + " - " + res.error.ErrorDescription,
            3000
          );
          // setErr({ value: true, text: res.error.ErrorDescription });
        } else {
          //success
          // setErr({ value: false, text: "" });
          notifySuccessToast(
            "Success",
            t(translations.LOGIN.RESET_PASS_DONE),
            6000
          );
          SetPage(PAGE.LOGIN);
        }
      })
      .catch((err) => {
        notifyErrorToast("Error", "Network Error", 3000);
        // setErr({ value: true, text: "Network Error" });
        console.log(err);
      });
  }, [SetPage, email, t]);
  return (
    <>
      <FieldsContainer paddingBottom={true}>
        <TextInput
          TitleText={t(translations.LOGIN.EMAIL)}
          placeholder={t(translations.LOGIN.ENTER_MAIL)}
          onChange={(text) => setEmail(text)}
          value={email}
        />
      </FieldsContainer>
      <ButtonsWrapper>
        <Button onClick={handleClickPassForgotButton}>
          {t(translations.LOGIN.SEND_PASS)}
        </Button>
        <SecondaryButton onClick={() => SetPage(PAGE.LOGIN)}>
          {t(translations.LOGIN.CANCEL)}
        </SecondaryButton>
      </ButtonsWrapper>
    </>
  );
};

export default ForgotPass;
