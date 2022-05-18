import React, { useEffect, useState, useMemo } from "react";
import store from "../../../../Redux/store";
import { Provider } from "react-redux";
// import { InputWrapper, FormContainer, InputsContainer, Footer, Body, FormWrapper, LoadingTitle, LoadingContainer } from './styles'
import { selectLanguage, selectIsRtl } from "../../../../slice/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { isLocalLanguage } from "../../../CommonFunctions";
import { apiCall } from "../../../Network";
import { customTheme } from "../../../../styles/theme";
import { Form } from "./index";

const Wizard = (props) => {
  const {
    modalClose,
    wizardid,
    leaderId,
    skipSaveOperation,
    pairs,
    language,
    funcAction,
    $modal,
    $state,
    content,
    actionModalInstanceCtrl,
  } = props;
  if (funcAction) {
    funcAction();
  }
  const [Response, setResponse] = useState(null); //{title, formSteps[{NextFormID, PrevFormID, isLastStep}],targetAppObject}
  const [stepIndex, setstepIndex] = useState(0);
  const [Pairs, setPairs] = useState(pairs);
  const actionname = Response?.formSteps[stepIndex].isLastStep
    ? "FINISH"
    : "NEXT";

  const request = useMemo(
    () => ({
      LeaderID: leaderId,
      formID: Response ? Response.formSteps[stepIndex].NextFormID : 0,
    }),
    [Response, leaderId, stepIndex]
  );
  //on mount!
  useEffect(() => {
    const request = {
      WizardID: wizardid,
    };
    apiCall("GetWizardDetails", "POST", request)
      .then((response) => {
        const title = isLocalLanguage(language)
          ? response.LName
          : response.EName;
        const formSteps = response.steps;
        const targetAppObject = response.TargetAppObject;
        setResponse({ title, formSteps, targetAppObject });
        actionModalInstanceCtrl.title = title;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [actionModalInstanceCtrl, language, wizardid]);

  const handlePrevClick = () => {
    setstepIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNextClick = (newPairs) => {
    setPairs(newPairs);
    const next = stepIndex + 1;
    if (next !== Response.formSteps.length) {
      setstepIndex(next);
    }
  };

  return (
    <>
      {Response && (
        <Form
          leaderId={leaderId}
          formId={Response.formSteps[stepIndex].NextFormID}
          api={"DisplayFormResults"}
          skipSaveOperation={skipSaveOperation}
          actionname={actionname}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
          wizard={true}
          stepIndex={stepIndex}
          isLastStep={Response.formSteps[stepIndex].isLastStep}
          pairs={Pairs}
          request={request}
          $modal={$modal}
          $state={$state}
          subMenuAppPartID={content.SubMenuAppPartID}
          targetAppObject={Response.targetAppObject}
          modalClose={modalClose}
          actionCtrl={actionModalInstanceCtrl}
        ></Form>
      )}
    </>
  );
};

const Wrapper = (props) => {
  const { i18n } = useTranslation();
  const language = useSelector(selectLanguage);
  const isRtl = useSelector(selectIsRtl);

  const [theme, setTheme] = useState({ dir: isRtl, language: language });

  useEffect(() => {
    i18n.changeLanguage(language);
    setTheme((prev) => {
      return { ...prev, ...customTheme, language: language };
    });
  }, [language, i18n]);

  useEffect(() => {
    document.body.dir = isRtl;
  }, [isRtl]);

  return (
    <ThemeProvider theme={theme}>
      <Wizard language={language} {...props} />
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
