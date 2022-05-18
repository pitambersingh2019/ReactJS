import React, { useEffect, useState, useRef, useCallback } from "react";
import store from "../../../../Redux/store";
import { Provider } from "react-redux";
import {
  FormContainer,
  InputsContainer,
  Footer,
  Body,
  FormWrapper,
  LoadingTitle,
  LoadingContainer,
  Container,
  Header,
  ExpandCollapseText,
} from "./styles";
import { selectLanguage, selectIsRtl } from "../../../../slice/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { isLocalLanguage } from "../../../CommonFunctions";
import { apiCall } from "../../../Network";
import { InputGeneric } from "../NgInputgenric";
import CollapseBox from "../../../../Component/DesignSystem/CollapseForm";
import PrimaryButton from "../../../../Component/DesignSystem/Buttons/index";
import SecondaryButton from "../../../../Component/DesignSystem/Buttons/index";
import {
  StyledToastContainer,
  notifySuccessToast,
} from "../../../../Component/Toast/ToastContainer";
import CircularProgress from "@mui/material/CircularProgress";
import PopUp from "../../../../Component/DesignSystem/PopUp";
import { customTheme } from "../../../../styles/theme";
import { LoadUserID } from "../../../../AppStart";
import { getService } from "../../react-to-angular_Input";
import { translations } from "../../../../locales/translations";
import LastUpdateBarStatus from "./UpdateStatus/UpdateStatus";
const Form = (props) => {
  const {
    leaderId,
    formId,
    skipSaveOperation,
    language,
    actionname,
    otherActionName,
    pairs,
    handleNextClick,
    handlePrevClick,
    stepIndex,
    request,
    $modal,
    $state,
    generalTab,
    add,
    cancelButton,
    showOtherButton,
    subMenuAppPartID,
    updateActionsParams,
    modalClose,
    targetAppObject,
    setFormIsChanges,
    formCallback,
    alwaysShowFooter,
    updateChanges,
  } = props;
  const { t } = useTranslation();
  const toastr = getService("toastr");
  const notify = getService("notify");
  const $filter = getService("$filter");
  const [response, setresponse] = useState({});
  let IsSaveButtonClick = false;
  const [FieldsError, setFieldsError] = useState({
    show: false,
    reason: "",
    Title: t(translations.FORMS.FIELDS_ERROR_TITLE),
    ButtonText: t(translations.FORMS.FIELDS_ERROR_BUTTON),
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingUpsert, setloadingUpsert] = useState(false);
  const [showFooter, setShowFooter] = useState(
    alwaysShowFooter ?? (modalClose || add || wizard) ? true : false
  );

  const handleShowFooter = useCallback(() => {
    setShowFooter(
      alwaysShowFooter ?? (modalClose || add || wizard) ? true : false
    );
  }, [add, alwaysShowFooter, modalClose, wizard]);
  useEffect(() => {
    handleShowFooter();
  }, [handleShowFooter]);
  const [status, setStatus] = useState({
    updatedby: "",
    date: "",
    SavingStatus: "init",
    show: false,
  });
  const Values = useRef([]);

  const wizard = props.wizard ?? false;
  const api = props.api ?? "DisplayFormResults";
  const fullSize = props.fullSize ?? false;
  //save input changes to Values state
  const SaveValues = useCallback(
    (value, systemChanges = false) => {
      const newChanges = [...Values.current];
      const index = Values.current.findIndex(
        (elem) => elem.FieldName === value.FieldName
      );
      if (index >= 0) {
        newChanges[index] = value;
      } else {
        newChanges.push(value);
      }

      Values.current = newChanges;
      console.log("newChanges", newChanges);
      if (updateChanges) {
        updateChanges(newChanges);
      }
      if (!systemChanges) {
        setShowFooter(true);
        setFormIsChanges && setFormIsChanges(true);
      }
    },
    [setFormIsChanges]
  );

  const BuildGroupsRecords = (data) => {
    const GroupHash = new Map([]);
    const InputNoGroup = [];

    if (data.groupData) {
      data.groupData.forEach((elem) => {
        GroupHash.set(elem.Key, { data: elem.Value, Records: [] });
      });
      data.recordValue
        .filter(
          (elem) => elem.Name !== "LastUpdate" && elem.Name !== "UpdatedBy"
        )
        .forEach((element) => {
          if (element.DisplayType !== 12) {
            if (GroupHash.has(element.GroupID)) {
              GroupHash.set(element.GroupID, {
                data: GroupHash.get(element.GroupID).data,
                Records: [...GroupHash.get(element.GroupID).Records, element],
              });
            } else {
              InputNoGroup.push(element);
            }
          }
        });
    }

    return [GroupHash, InputNoGroup];
  };

  const openNewTab = useCallback(
    (targetAppObject, targetLeaderID) => {
      if (targetAppObject !== "") {
        var url = $state.href("appObjectFullView", {
          appObjectName: targetAppObject,
          ID: targetLeaderID,
        });
        window.open(url, "_blank");
      }
    },
    [$state]
  );
  const handleSaveSubmit = useCallback((e) => {
    IsSaveButtonClick = true;
    handleSubmit(e);
  });
  const getForm_API = useCallback(() => {
    setloadingUpsert(true);
    Values.current = [];
    handleShowFooter();
    const RequestApi = { ...request, pairs: pairs ?? [] };
    apiCall(api, "POST", RequestApi)
      .then((response) => {
        if (add) {
          response.recordValue = response.recordValue.filter(
            (record) => record.ShowOnNew
          );
        }
        const lastUpdate = response.recordValue.find(
          (elem) => elem.Name === "LastUpdate"
        );
        const UpdatedBy = response.recordValue.find(
          (elem) => elem.Name === "UpdatedBy"
        );
        if (lastUpdate && UpdatedBy) {
          const username = UpdatedBy.comboValues.find(
            (elem) => elem.ComboValueField === +UpdatedBy.value
          );

          setStatus({
            updatedby: isLocalLanguage(language)
              ? username?.ComboQueryEField
              : username?.ComboQueryHField,
            date: lastUpdate.value,
            SavingStatus: "init",
            show: true,
          });
        }

        const BuildGroupsArray = BuildGroupsRecords(response);
        const GroupMap = BuildGroupsArray[0];
        const NoGroupInputs = BuildGroupsArray[1];

        response.GroupMap = GroupMap;
        response.NoGroupInputs = NoGroupInputs;

        setresponse(response);
        setloadingUpsert(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [add, api, language, pairs, request]);

  //on mount!
  useEffect(() => {
    getForm_API();
  }, [
    add,
    api,
    formId,
    generalTab,
    leaderId,
    pairs,
    request,
    updateActionsParams,
    getForm_API,
  ]);

  useEffect(() => {
    if (generalTab && (response.GroupMap || response.recordValue))
      updateActionsParams(response.GroupMap, response.recordValue);
  }, [updateActionsParams, generalTab, response]);
  // on save clicked!
  const handleSubmit = (e) => {
    e.preventDefault();

    //delete unecessry fields!
    // Values.current = Values.current.filter(
    //   (elem) => elem.checkOnSubmit === true || elem.Eq
    // );
    console.log(Values.current);
    let validation = true;
    let reason = t(translations.FORMS.REASON);
    let missMatchReason = t(translations.FORMS.REASON_MISS_MATCH);
    Values.current.forEach((elem) => {
      if (elem.checkOnSubmit) {
        // Object.values(elem).forEach((value) => {
        switch (elem.DataType) {
          case "text":
            if (elem.Eq === "") {
              validation = false;
              reason += elem.DisplayName + ", ";
            } else if (elem.passwordMissMatch) {
              validation = false;
              reason = "";
              reason +=
                missMatchReason +
                ": " +
                elem.DisplayName +
                ", " +
                t(translations.FORMS.CONFIRM_PASSWORD);
            }
            break;
          default:
            if (elem.Eq === null) {
              validation = false;
              reason += elem.DisplayName + ", ";
            }
        }
        // });
      }
    });
    if (validation) {
      reason = reason.substring(0, reason.length - 2);
    }
    let pairsToSend = Values.current.map((elem) => Object.assign({}, elem));
    pairsToSend = pairsToSend.map((Item) => {
      delete Item.checkOnSubmit;
      delete Item.DisplayName;
      return Item;
    });

    if (!validation) {
      setFieldsError((prev) => ({
        ...prev,
        Title: t(translations.FORMS.Error),
        show: true,
        reason: reason,
      }));
      return false;
    }

    const formID = response.CurrentFormID > 0 ? response.CurrentFormID : formId;
    const requestSave = {
      LeaderID: leaderId,
      formID: formID,
      skipSaveOperation: skipSaveOperation,
      pairs: pairsToSend,
    };
    //const Toast = SaveChangesToastDetails();

    setStatus((prev) => ({ ...prev, SavingStatus: "saving" }));
    if (add) {
      add(pairsToSend, formID);
    } else {
      apiCall("UpsertRecordByForm", "POST", requestSave)
        .then((response) => {
          let stringActions = "";
          let closeModalCheck = true;
          let targetLeaderID = 0;

          if (
            response.PreAction.length !== 0 ||
            response.PostAction.length !== 0
          ) {
            response.PreAction.forEach((elem) => {
              // stringActions += elem.Value + ", ";.
              notify({
                message: elem.Value,
                classes: "alert-danger",
                templateUrl: "views/common/notify.html",
              });
            });
            response.PostAction.forEach((elem) => {
              // stringActions += elem.Value + ", ";
              notify({
                message: elem.Value,
                classes: "alert-danger",
                templateUrl: "views/common/notify.html",
              });
            });
            setStatus((prev) => ({ ...prev, SavingStatus: "init" }));
            //show modal for actions:
            // setFieldsError((prev) => ({
            //   ...prev,
            //   Title: "Error!",
            //   show: true,
            //   reason: stringActions.substring(0, stringActions.length - 2),
            // }));

            closeModalCheck = false;
          } else if (response.error !== null) {
            stringActions =
              response.error.ErrorCode +
              " - " +
              response.error.ErrorDescription;
            //show modal for Errordesc:
            // setFieldsError((prev) => ({
            //   ...prev,
            //   Title: "Error!",
            //   show: true,
            //   reason: stringActions,
            // }));
            notify({
              message: stringActions,
              classes: "alert-danger",
              templateUrl: "views/common/notify.html",
            });
            closeModalCheck = false;
          } else if (wizard) {
            if (response.NewRecordID !== 0) {
              targetLeaderID = response.NewRecordID;
              openNewTab(targetAppObject, targetLeaderID);
            }
            if (actionname === "FINISH") {
              closeModalCheck = true;
              toastr.clear();
              toastr.success("", $filter("translate")("SAVED_SUCCESSFULLY"));
            } else {
              closeModalCheck = false;
            }
            //clear previous toastr to prevent multiple notifications
            // setShowFooter(false);
            // setFormIsChanges && setFormIsChanges(false);
            // setStatus((prev) => ({ ...prev, SavingStatus: "saved" }));
            // setTimeout(
            //   () => setStatus((prev) => ({ ...prev, SavingStatus: "init" })),
            //   1500
            // );
          } else {
            //clear previous toastr to prevent multiple notifications

            notifySuccessToast(
              t(translations.FORMS.SAVED_SUCCESSFULLY),
              "",
              3000
            );
            // setShowFooter(false);
            setFormIsChanges && setFormIsChanges(false);
            setStatus((prev) => ({ ...prev, SavingStatus: "saved" }));
            setTimeout(
              () => setStatus((prev) => ({ ...prev, SavingStatus: "init" })),
              1500
            );
          }

          if (modalClose && closeModalCheck) {
            modalClose();
          } else if (formCallback && closeModalCheck) {
            formCallback(Values.current, true, IsSaveButtonClick);
            IsSaveButtonClick = false;
          } else {
            //refresh
            setTimeout(
              () => response.error === null && !wizard && getForm_API(),
              1500
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });

      if (wizard) {
        handleNextClick(pairsToSend);
        // setShowFooter(true);
      }
    }
  };

  // ref.current = compile(
  //   ' <div ibox-tools="true" group-data="groupData"></div>'
  // )(newScope);

  //   const bindings = {
  //     message: "Toto, I've a feeling we're not in Kansas anymore",
  //     onLog: (message) => console.log(message, "angular"),
  //     onChange: () => console.log("Notified about a state change"),
  //   };

  //   const appName = "LeaderMESfe";
  //   const appTemplate = "<simple-directive></simple-directive>";

  //   const htmlToElement = (html) => {
  //     var template = document.createElement('template');
  //     html = html.trim(); // Never return a text node of whitespace as the result
  //     template.innerHTML = html;
  //     return template.content.firstChild;
  // }

  const onCollapseClickSaveStatus = (key, opened) => {
    const request = {
      subMenuAppPartID: subMenuAppPartID,
      formID: formId,
      userID: JSON.parse(LoadUserID()),
      userGroupValue: [
        {
          userID: JSON.parse(LoadUserID()),
          GroupID: key,
          UserGroupStateID: opened === true ? 2 : 1,
        },
      ],
    };
    apiCall("UpdateUserFormFieldGroups", "POST", request)
      .then((res) => {
        if (res.error === null) {
          const newGroupMap = new Map(response.GroupMap);
          const group = Object.assign({}, newGroupMap.get(key));
          group.data.UserGroupState = opened === true ? "close" : "open";
          newGroupMap.set(key, group);
          setresponse((prev) => ({ ...prev, GroupMap: newGroupMap }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [expandCollapse, setExpandCollapse] = useState(false); //0 show Expand, 1 show Collapse
  const ExpandCollapseHandler = () => {
    response.GroupMap.forEach((value, key) => {
      onCollapseClickSaveStatus(key, expandCollapse);
    });
    setExpandCollapse((prev) => !prev);
  };
  return (
    <Container>
      {/* {getAngularContainer()} */}
      {FieldsError.show && (
        <PopUp
          TitleText={FieldsError.Title}
          ContentText={FieldsError.reason}
          ButtonLabel={FieldsError.ButtonText}
          onClosePopUp={() =>
            setFieldsError((prev) => ({ ...prev, show: false }))
          }
        />
      )}
      <FormContainer>
        {response.GroupMap && !loadingUpsert ? (
          <React.Fragment>
            {response.GroupMap.size > 0 && (
              <Header>
                <ExpandCollapseText onClick={ExpandCollapseHandler}>
                  {expandCollapse ? "Collapse All" : "Expand All"}
                </ExpandCollapseText>
                {status.show && (
                  <LastUpdateBarStatus
                    SavingStatus={status.SavingStatus}
                    date={status.date}
                    updatedBy={status.updatedby}
                  />
                )}
              </Header>
            )}
            <FormWrapper wizard={wizard}>
              <Body>
                {Array.from(response.GroupMap, ([key, value, index]) => {
                  return !value.Records || value.Records.length == 0 ? null : (
                    <CollapseBox
                      onClickHeader={() =>
                        onCollapseClickSaveStatus(
                          key,
                          value.data.UserGroupState
                            ? value.data.UserGroupState === "open"
                              ? true
                              : false
                            : value.data.DefaultGroupState
                        )
                      }
                      key={index}
                      open={
                        response.GroupMap.get(key).data.UserGroupState
                          ? response.GroupMap.get(key).data.UserGroupState ===
                            "open"
                            ? true
                            : false
                          : response.GroupMap.get(key).data.DefaultGroupState
                      }
                      header={
                        isLocalLanguage(language)
                          ? value.data.GroupLName
                          : value.data.GroupEName
                      }
                    >
                      <InputsContainer>
                        {value.Records.map((field, index) => {
                          return (
                            // <InputWrapper
                            //   key={index}
                            //   order={field.DisplayOrder}
                            //   fullSize={fullSize}
                            //   doubleSize={isItPassword_OR_ComboBox(
                            //     field.DisplayType
                            //   )}
                            // >
                            <InputGeneric
                              key={index}
                              content={field}
                              SaveValues={SaveValues}
                              modal={$modal}
                              state={$state}
                              language={language}
                              add={add}
                              fullSize={fullSize}
                            />
                            // </InputWrapper>
                          );
                        })}
                      </InputsContainer>
                    </CollapseBox>
                  );
                })}

                <InputsContainer>
                  {response.NoGroupInputs &&
                    response.NoGroupInputs.map((field, index) => {
                      return (
                        // <InputWrapper
                        //   key={index}
                        //   order={field.DisplayOrder}
                        //   fullSize={fullSize}
                        //   doubleSize={isItPassword_OR_ComboBox(field.DisplayType)}
                        // >
                        <InputGeneric
                          key={index}
                          content={field}
                          SaveValues={SaveValues}
                          modal={$modal}
                          state={$state}
                          language={language}
                          add={add}
                          fullSize={fullSize}
                        />
                        // </InputWrapper>
                      );
                    })}
                </InputsContainer>
              </Body>
            </FormWrapper>
            {showFooter && (
              <Footer>
                {wizard && stepIndex !== 0 && (
                  <PrimaryButton
                    label={t(translations.FORMS.PREVIOUS)}
                    onClick={handlePrevClick}
                    variant="purple"
                    active={true}
                  />
                )}
                {cancelButton && (
                  <SecondaryButton
                    label={t(translations.FORMS.DISCARD)}
                    variant="purple-secondary"
                    onClick={() =>
                      (modalClose && modalClose()) || getForm_API()
                    }
                  ></SecondaryButton>
                )}

                {showOtherButton && (
                  <PrimaryButton
                    label={t(translations.FORMS[otherActionName])}
                    onClick={handleSaveSubmit}
                    variant="purple"
                    active={true}
                  />
                )}
                <PrimaryButton
                  label={t(translations.FORMS[actionname])}
                  onClick={handleSubmit}
                  variant="purple"
                  active={true}
                />
              </Footer>
            )}
            <StyledToastContainer />
          </React.Fragment>
        ) : (
          <LoadingContainer>
            <LoadingTitle>{t(translations.FORMS.LOADING)}</LoadingTitle>
            <CircularProgress />
          </LoadingContainer>
        )}
      </FormContainer>
    </Container>
  );
};

const Wrapper = (props) => {
  const { i18n } = useTranslation();
  const language = useSelector(selectLanguage);
  const isRtl = useSelector(selectIsRtl);

  const [theme, setTheme] = useState({
    ...customTheme,
    dir: isRtl,
    language: language,
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    setTheme((prev) => {
      return { ...prev, language: language };
    });
  }, [language, i18n]);

  return (
    <ThemeProvider theme={theme}>
      <Form language={language} {...props} />
    </ThemeProvider>
  );
};

const FormGenric = (props) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Wrapper {...props} />
      </Provider>
    </React.StrictMode>
  );
};

export default FormGenric;
export { Form };
