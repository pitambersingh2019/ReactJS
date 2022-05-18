import React, { useState, useEffect } from "react";
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
import TextInput from "../../Component/DesignSystem/InputText";
import DropDown from "../../Component/DesignSystem/DropDown/SingleSelect";
import { PAGE } from "./index";
import usePositionRole from "./hooks/usePositionRole";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectSession } from "./slice/selectors";
import { getBaseUrl, apiCall } from "../../utils/Network";
import { notifySuccessToast } from "../../Component/Toast/ToastContainer";
import { translations } from "../../locales/translations";
import { useTranslation } from "react-i18next";
const SignUp = ({ SetPage }) => {
  const session = useSelector(selectSession);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [err, setErr] = useState({ value: false, text: "" });
  const [positionItems, positionRole, setPositionRole] = usePositionRole();
  const [userDetails, setUserDetails] = useState({});
  const { t } = useTranslation();
  useEffect(() => {
    if (session[0]) setEmail(session[0].Email);
  }, [session]);
  //
  useEffect(() => {
    if (session[0].UserID) {
      const headerParams = {
        "content-type": "application/json;charset=UTF-8",
        "x-access-token": session[0].session,
      };
      const baseurl = getBaseUrl();
      axios
        .post(
          baseurl + "GetUserDetails",
          { UserID: session[0].UserID },
          { headers: headerParams }
        )
        .then((response) => {
          const user = Object.assign(
            { reTypePassword: null, Password: null },
            response.data.BaseUser
          );
          setUserDetails(user);
          setName(response.data.BaseUser?.Name ?? "");
          setLastName(response.data.BaseUser?.LastName ?? "");
        });
    }
  }, [session]);

  useEffect(() => {
    const positionSelected = positionItems.find(
      (elem) => elem.value === userDetails?.Position
    );
    setPositionRole(positionSelected);
  }, [positionItems, setPositionRole, userDetails?.Position]);

  const handleValidateAccount = () => {
    const user = Object.assign({}, userDetails);
    user.Email = email;
    user.Name = name;
    user.LastName = lastName;
    user.Position = positionRole ? positionRole.value : null;
    const request = { baseUser: user };
    apiCall("UpdateUserDetails", "POST", request)
      .then((res) => {
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
  };

  //reCaptcha~!
  // const [keyRecaptcha, setKeyRecaptcha] = useState(0);
  // const recaptchaValue = useRef(null);
  // useEffect(() => {
  //   //get recaptcha key!
  //   const GLOBAL = getService("GLOBAL");
  //   setKeyRecaptcha(GLOBAL.recaptcha);
  // }, []);

  // const onChange = (value) => {
  //   recaptchaValue.current = value;
  // };

  return (
    <Wrapper>
      <FieldsContainer paddingBottom={true}>
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
      </FieldsContainer>
      {/* {keyRecaptcha && (
        <div style={{ margin: "12px 0" }}>
          <ReCAPTCHA sitekey={keyRecaptcha} onChange={onChange} size="normal" />
        </div>
      )} */}
      {err.value && <ErrorText>{err.text}</ErrorText>}
      <ButtonsWrapper>
        <Button onClick={handleValidateAccount} disabled={false}>
          {t(translations.LOGIN.UPDATE_ACC)}
        </Button>
        <NoAccountWrapper>
          <NoAccountText text={t(translations.LOGIN.NOACCOUNT)} />
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
