import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import store from "../../../../Redux/store";
import { Provider } from "react-redux";
import { Container, TabWrapper } from "./styles";
import { selectLanguage, selectIsRtl } from "../../../../slice/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { isLocalLanguage } from "../../../CommonFunctions";
import SideTabs from "../../../../Component/DesignSystem/SideTabs";
import Form from "../NgFormgenric/index";
import jsonLogic from "json-logic-js";
import SearchResult from "../SearchResults/SearchResultsNoFilters";
import MultiformEditableTable from "../editableTable";
import ContinuousForm from "../continuousForm";
import FormNotifyModal from "./Components/FormModal/NotifyModalForm";
import JobRecipe from "../../../../features/job-recipe";

const Tabs = (props) => {
  const {
    compile,
    language,
    content,
    $modal,
    $state,
    customServices,
    LeaderMESservice,
    $scope,
    height,
  } = props;

  const [ScopeState, setScopeState] = useState(undefined);
  const [SelectedIndex, setSelectedIndex] = useState(0);

  //FORM change SECTION
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);
  const [formIsChanges, setFormIsChanges] = useState(false);
  const nextIndexRef = useRef(0);
  //END

  const TabTitleKey = isLocalLanguage(language)
    ? "SubMenuLName"
    : "SubMenuEName";

  // const ContainerRef = useRef(null);
  // const [height, setheight] = useState(0);
  // useEffect(() => {
  //   if (ContainerRef.current) {
  //     const fullHeight = ContainerRef.current.getBoundingClientRect().height;
  //     setheight(fullHeight);
  //   }
  // }, []);

  useEffect(() => {
    //change style of body
    document.body.style.height = "100%";
    document.body.style.overflowY = "hidden";

    const ScopeStateUpdated = $scope.$new(true);
    ScopeStateUpdated.content = content;
    ScopeStateUpdated.tabTemplate = [];
    ScopeStateUpdated.actionsData = {};
    ScopeStateUpdated.actionParams = {};
    ScopeStateUpdated.showActions = false;

    if (content.ID) {
      ScopeStateUpdated.content.ID = parseInt(content.ID);
    }
    if (ScopeStateUpdated.content.id === 0) {
      ScopeStateUpdated.newObject = true;
      ScopeStateUpdated.tabs = LeaderMESservice.getTabsByID(
        content.objectTopMenuID
      );
    } else {
      ScopeStateUpdated.newObject = false;
      ScopeStateUpdated.tabs = LeaderMESservice.getTabsByAppName(
        content.linkItem
      );
    }

    var addActions = function (i) {
      // $scope.tabs.Actions[i].ActionCriteria = JSON.parse($scope.tabs.Actions[i].ActionCriteria);
      if (
        typeof ScopeStateUpdated.tabs.Actions[i].ActionCriteria == "string" &&
        ScopeStateUpdated.tabs.Actions[i].ActionCriteria !== "" &&
        ScopeStateUpdated.tabs.Actions[i].ActionCriteria !== null
      ) {
        ScopeStateUpdated.tabs.Actions[i].ActionCriteria = JSON.parse(
          ScopeStateUpdated.tabs.Actions[i].ActionCriteria
        );
      }
      if (
        ScopeStateUpdated.tabs.Actions[i].ActionCriteria &&
        ScopeStateUpdated.tabs.Actions[i].ActionCriteria.criteria
      ) {
        for (
          var j = 0;
          j <
          ScopeStateUpdated.tabs.Actions[i].ActionCriteria.criteria.params
            .length;
          j++
        ) {
          if (
            ScopeStateUpdated.content.targetParameters &&
            ScopeStateUpdated.content.targetParameters[
              ScopeStateUpdated.tabs.Actions[i].ActionCriteria.criteria.params[
                j
              ]
            ]
          ) {
            ScopeStateUpdated.actionParams[
              ScopeStateUpdated.tabs.Actions[i].ActionCriteria.criteria.params[
                j
              ]
            ] =
              ScopeStateUpdated.content.targetParameters[
                ScopeStateUpdated.tabs.Actions[
                  i
                ].ActionCriteria.criteria.params[j]
              ];
          } else {
            ScopeStateUpdated.actionParams[
              ScopeStateUpdated.tabs.Actions[i].ActionCriteria.criteria.params[
                j
              ]
            ] = "";
          }
        }
      }
      if (ScopeStateUpdated.tabs.Actions[i].SubMenuTargetTYpe === "appObject") {
        ScopeStateUpdated.tabs.Actions[i].template =
          "views/common/actionAppObject.html";
        //functionPagesReference.push(DisplayFormResultsTab);
        return ScopeStateUpdated.tabs.Actions[i];
      } else {
        //it's custom view - in modal dialogue
        ScopeStateUpdated.tabs.Actions[i].template =
          "views/common/actions/customActionModal.html";
        return ScopeStateUpdated.tabs.Actions[i];
      }
    };
    var actions = [];
    for (var i = 0; i < ScopeStateUpdated.tabs.Actions.length; i++) {
      if (ScopeStateUpdated.newObject === true) {
        if (ScopeStateUpdated.tabs.Actions[i].SubMenuEnableOnNew === true) {
          actions.push(addActions(i));
        }
      } else {
        actions.push(addActions(i));
      }
    }

    ScopeStateUpdated.actionsData = {
      actions: actions,
      parentScope: ScopeStateUpdated,
      params: ScopeStateUpdated.actionParams,
      ID: ScopeStateUpdated.content.ID,
      targetParameters: ScopeStateUpdated.content.targetParameters,
      rowClicked: ScopeStateUpdated.content.rowClicked,
      linkItem: ScopeStateUpdated.content.linkItem,
    };

    ScopeStateUpdated.objectTypeID =
      ScopeStateUpdated.tabs.TopMenuFileObjectRelation;

    ScopeStateUpdated.tabs.Actions.forEach((action) => {
      if (action.ActionCriteria && action.ActionCriteria !== "") {
        let criteria = null;
        try {
          criteria = JSON.parse(action.ActionCriteria);
        } catch {
          criteria = action.ActionCriteria;
        }

        action.enabled = jsonLogic.apply(
          criteria.criteria.condition,
          ScopeStateUpdated.actionParams
        );
      } else {
        action.enabled = true;
      }
    });

    setScopeState(ScopeStateUpdated);

    document.title =
      ScopeStateUpdated.content.linkItem +
      " " +
      ScopeStateUpdated.content.ID +
      " | " +
      (isLocalLanguage(language)
        ? ScopeStateUpdated.tabs.subMenu[SelectedIndex]?.SubMenuLName
        : ScopeStateUpdated.tabs.subMenu[SelectedIndex]?.SubMenuEName);
  }, [$scope, LeaderMESservice, SelectedIndex, content, language]);

  const updateActionsParams = useCallback(
    (groups, recordValue) => {
      const ActionDataUpdated = { ...ScopeState.actionsData };
      for (var key in ActionDataUpdated.params) {
        if (key === "UserID") {
          ActionDataUpdated.params[key] = LeaderMESservice.getUserID();
          continue;
        }
        // var field = _.find($scope.recordValue, { Name: key });
        var field = recordValue.find((elem) => elem.Name === key);
        if (field) {
          ActionDataUpdated.params[key] = field.value;
          if (typeof ActionDataUpdated.params[key] == "number") {
            ActionDataUpdated.params[key] = parseInt(
              ActionDataUpdated.params[key]
            );
          }
          continue;
        }
        // for (var i = 0; i < $scope.groups.length; i++) {
        for (var i = 0; i < groups.length; i++) {
          // var group = groups[i];
          var group = groups[i].value.Records;

          field = group.recordValue.find((elem) => elem.Name === key);
          if (field) {
            ActionDataUpdated.params[key] = field.value;
            if (typeof ActionDataUpdated.params[key] == "number") {
              ActionDataUpdated.params[key] = parseInt(
                ActionDataUpdated.params[key]
              );
            }
            break;
          }
        }
      }

      const tabs = { ...ScopeState.tabs };
      tabs.subMenu.forEach((tab) => {
        if (tab.ActionCriteria && tab.ActionCriteria !== "") {
          let criteria = null;
          try {
            criteria = JSON.parse(tab.ActionCriteria);
          } catch {
            criteria = tab.ActionCriteria;
          }

          tab.enabled = jsonLogic.apply(
            criteria.criteria.condition,
            ActionDataUpdated.params
          );
        } else {
          tab.enabled = true;
        }
      });
      //ScopeState.actionsData = ActionDataUpdated;
      setScopeState((prev) => ({
        ...prev,
        actionsData: ActionDataUpdated,
        tabs: tabs,
      }));
    },
    [LeaderMESservice, ScopeState]
  );

  const getFormLeaderID = (index) => {
    const targetParameters =
      ScopeState.tabs.subMenu[index].SubMenuTargetParameters.split("=");
    if (content.targetParameters) {
      targetParameters[1] = targetParameters[1].slice(1, -1);
      return content.targetParameters[targetParameters[1]];
    } else {
      return content.ID;
    }
  };

  const getTargetParameters = (tabIndex) => {
    if (ScopeState.tabs.subMenu[tabIndex].SubMenuTargetParameters == "") {
      return null;
    }
    const targetParameters =
      ScopeState.tabs.subMenu[tabIndex].SubMenuTargetParameters.split("=");
    if (content.targetParameters) {
      targetParameters[1] = targetParameters[1].slice(1, -1);
      const result = {
        FieldName: targetParameters[0],
        DataType: "num",
        Eq: content.targetParameters[targetParameters[1]] ?? content.ID,
      };
      return result;
    } else {
      return {
        FieldName: targetParameters[0],
        Eq: content.ID,
        DataType: "num",
      };
    }
  };

  const DisplayCustomTab = function (tabIndex) {
    let general = false;
    if (tabIndex === 0) {
      const template = customServices.customGetTemplate(
        ScopeState.tabs.subMenu[tabIndex].SubMenuTargetTYpe
      );
      if (template === "views/common/customTemplate.html") {
        general = false;
      } else {
        general = true;
      }
    }

    const targetParameters = getTargetParameters(tabIndex);
    if (tabIndex === 0 && general === true) {
      const newContent = {
        ...ScopeState.content,
        SubMenuAppPartID: ScopeState.tabs.subMenu[tabIndex].SubMenuAppPartID,
      };
      const params = {
        ID: content.ID,
        subMenu: ScopeState.tabs.subMenu[tabIndex],
        pageDisplay: tabIndex + 1,
        content: newContent,
        targetParameters: targetParameters,
        SubMenuAppPartID: ScopeState.tabs.subMenu[tabIndex].SubMenuAppPartID,
        generalTab: general,
        tabs: ScopeState.tabs.subMenu,
        form: true,
        continuousForm: false,
      };
      customServices.customGetCode(
        params,
        ScopeState.tabs.subMenu[tabIndex].SubMenuTargetTYpe
      );
      return params;
    } else {
      const customContent = {
        ID: content.ID,
        subMenu: ScopeState.tabs.subMenu[tabIndex],
        targetParameters: targetParameters,
        actionsData: [],
        objectTypeID: ScopeState.objectTypeID,
        linkItem: content.linkItem,
        form: false,
        generalTab: general,
        continuousForm: false,
      };
      return customContent;
    }
  };

  const getTargetParametersSearchResult = (tabIndex) => {
    if (ScopeState.tabs.subMenu[tabIndex].SubMenuTargetParameters == "") {
      return [];
    } else if (
      ScopeState.tabs.subMenu[tabIndex].SubMenuTargetParameters.indexOf(",") < 0
    ) {
      return [getTargetParameters(tabIndex)];
    }
    let targetParameters =
      ScopeState.tabs.subMenu[tabIndex].SubMenuTargetParameters.split(",");
    let firstParameter = targetParameters[0].split("=");
    if (content.targetParameters) {
      firstParameter[1] = firstParameter[1].slice(1, -1);
      firstParameter = {
        FieldName: firstParameter[0],
        DataType: "num",
        Eq: content.targetParameters[firstParameter[1]]
          ? content.targetParameters[firstParameter[1]]
          : content.ID,
      };
    } else {
      firstParameter = {
        FieldName: firstParameter[0],
        Eq: content.ID,
        DataType: "num",
      };
    }
    const secondParameter = targetParameters[1].split("=");

    return [
      firstParameter,
      {
        FieldName: secondParameter[0],
        Eq: parseInt(secondParameter[1]),
        DataType: "num",
      },
    ];
  };

  const GetResultSearchFieldsTab = (tabIndex) => {
    const targetParameters = getTargetParametersSearchResult(tabIndex);
    return {
      data: {
        functionCallBack: "rowClicked",
        onlyNewTab: true,
        returnValue: false,
        openSearchInNewTab: true,
        reportTitle: ScopeState.tabs.subMenu[tabIndex].SubMenuEName,
      },
      request: {
        reportID: ScopeState.tabs.subMenu[tabIndex].SubMenuExtID,
        sfCriteria: targetParameters,
      },
      api: "GetResultSearchFields",
    };
  };

  const getTargetParametersLeader = (tabIndex) => {
    if (ScopeState.tabs.subMenu[tabIndex].SubMenuTargetParameters == "") {
      return 0;
    }
    var targetParameters =
      ScopeState.tabs.subMenu[tabIndex].SubMenuTargetParameters.split("=");
    if (content.targetParameters) {
      targetParameters[1] = targetParameters[1].slice(1, -1);
      return content.targetParameters[targetParameters[1]];
    }
    if (targetParameters !== "") {
      return $scope.content.ID;
    }
  };

  const editableListTab = (tabIndex) => {
    const targetParameters = getTargetParameters(tabIndex);
    var request = {
      LeaderID: getTargetParametersLeader(tabIndex),
      formID: ScopeState.tabs.subMenu[tabIndex].SubMenuExtID,
    };
    request.pairs = content.ID && targetParameters ? [targetParameters] : [];

    return {
      data: {
        functionCallBack: "rowClicked",
        openNewAppObject: ScopeState.content.rowClicked,
        selectedDepartmentIds: ScopeState.selectedDepartmentIds,
        onlyNewTab: true,
        hasCheckbox: false,
      },
      request: request,
    };
  };

  //const customTemplateRef = useRef();
  const loadRefCustomTemplate = (c, index) => {
    if (c) {
      // c.innerHTML = "";
      const newScope = $scope.$new(true);
      newScope.content = DisplayCustomTab(index);
      for (const [key, value] of Object.entries(ScopeState)) {
        if (!key.includes("$")) newScope.content[key] = value;
      }

      //customTemplateRef.current = c;
      if (newScope.content) {
        if (c.childNodes.length >= 1) return;
        c.insertAdjacentElement(
          "afterbegin",
          compile(`
            <custom-directive content="content"> </custom-directive>`)(
            newScope
          )[0]
        );
      }
    }
  };

  const getcustomTemplate = (index) => {
    const data = DisplayCustomTab(index);
    if (data.form) {
      return (
        <Form
          leaderId={data.LeaderId}
          formId={data.formId}
          skipSaveOperation={data.SkipSaveOperation}
          request={data.request}
          actionname={data.actionName}
          api={data.api}
          $modal={$modal}
          $state={$state}
          cancelButton={true}
          subMenuAppPartID={data.subMenuAppPartID}
          updateActionsParams={updateActionsParams}
          generalTab={data.generalTab}
          setFormIsChanges={setFormIsChanges}
        />
      );
    }
    return (
      <div
        style={{ height: "100%", width: "100%" }}
        ref={(c) => loadRefCustomTemplate(c, index)}
      ></div>
    );
  };

  const getReportTemplate = (index) => {
    const content = GetResultSearchFieldsTab(index);
    return <SearchResult content={content} SelectedFooterInHeader={true} />;
  };

  const getmultiFormTemplate = (index) => {
    const content = editableListTab(index);
    const data = ScopeState.tabs.subMenu[index];
    const pairs = getTargetParameters(index);
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <MultiformEditableTable
          content={content}
          data={data}
          targetPairs={pairs}
          paddingSide={8}
          SelectedFooterInHeader={true}
        />
      </div>
    );
  };

  // const continuousForm = (formID, FieldNameParent, pairs, _LeaderID, skipSaveOperation) => {
  //   const data = {};
  //   LeaderMESservice.getDisplayFormResults({ LeaderID: 0, formID: formID }).then(function (response) {
  //     if (response.error === null && response.AllrecordValue.length > 0) {
  //       for (var i = 0; i < response.AllrecordValue[0].length; i++) {
  //         if (response.AllrecordValue[0][i].ShowInCriteria === true) {
  //           $scope.searchBoxFields.push(response.AllrecordValue[0][i]);
  //           response.AllrecordValue[0][i].AllowEntry = true;
  //           response.AllrecordValue[0][i].MandatoryField = false;
  //           if (response.AllrecordValue[0][i].value !== null && response.AllrecordValue[0][i].value !== "") {
  //             $scope.changes.push({
  //               FieldName: response.AllrecordValue[0][i].Name,
  //               Eq: response.AllrecordValue[0][i].value.toString(),
  //               DataType: response.AllrecordValue[0][i].DisplayTypeName,
  //             });
  //           }
  //         }
  //       }
  //     }
  //   });

  //   $scope.searchMultiForm = function () {
  //     $scope.dataLoaded = false;
  //     $timeout(function () {
  //       var newPairs = pairs.concat($scope.changes);
  //       editableTable($scope, formID, FieldNameParent, newPairs, 0, skipSaveOperation);
  //       $scope.dataLoaded = true;
  //     }, 100);
  //   };
  // };

  // const continuousFormTab = (tabIndex, newScope) => {
  //   const targetParameters = getTargetParameters(tabIndex);
  //   // const params = {
  //   //   continuousForm : true
  //   // }
  //   commonFunctions.continuousForm(
  //     newScope,
  //     ScopeState.tabs.subMenu[tabIndex].SubMenuExtID,
  //     targetParameters.FieldName,
  //     [targetParameters],
  //     getTargetParametersLeader(tabIndex),
  //     ScopeState.tabs.subMenu[tabIndex].SkipSaveOperation
  //   );
  // };

  // const loadRefcontinuousFormTemplate = (c, index) => {
  //   if (c) {
  //     const newScope = $scope.$new();
  //     for (const [key, value] of Object.entries(ScopeState)) {
  //       if (!key.includes("$")) newScope[key] = value;
  //     }
  //     newScope.content = ScopeState.content;
  //     continuousFormTab(index, newScope);
  //     console.log(newScope);
  //     newScope.changes = [];
  //     newScope.emptyPage = () => {
  //       console.log("saved");
  //     };
  //     // MultiFormTemplateRef.current = c;
  //     if (c.childNodes.length >= 1) return;
  //     c.insertAdjacentElement(
  //       "afterbegin",
  //       compile(`<div class="panel-body" style="background: #fff;">
  //       <div class="row">
  //           <div class="form-group col-sm-3 pull-left" ng-repeat="field in searchBoxFields">
  //               <input-directive content="field" multiform="true"></input-directive>
  //           </div>
  //       </div>
  //       <div class="row">
  //           <div class="col-lg-2 pull-right">
  //               <button class="btn btn-sm btn-primary pull-right m-t-n-xs" ng-disabled="requestInProgress" ng-click="searchMultiForm()">{{ "SEARCH" | translate}}</button>
  //           </div>
  //       </div>
  //       <div class="row" ng-if="dataLoaded == true">
  //           <div ng-if="editableTableData" ng-include="'views/common/multiFormTemplate.html'"></div>
  //       </div>
  //   </div>
  // `)(newScope)[0]
  //     );
  //   }
  // };

  // const getcontinuousFormTemplate = (index) => {
  //   return (
  //     <div
  //       style={{ height: "100%", width: "calc(100% - 50px)" }}
  //       ref={(c) => loadRefcontinuousFormTemplate(c, index)}
  //     ></div>
  //   );
  // };

  const getTypeString = (type) => {
    if (type.includes("custom")) return "custom";
    return type;
  };

  const getJobRecipe = () => {
    const jobID =
      content.linkItem === "MachineScreenEditor"
        ? content.targetParameters.JobID
        : content.ID;
    return <JobRecipe jobID={jobID} setFormIsChanges={setFormIsChanges} />;
  };

  const getTemplate = (typeOfTemplate, index) => {
    const type = getTypeString(typeOfTemplate);
    const pairs = getTargetParameters(index);
    console.log("paaairssss", pairs);
    switch (type) {
      case "form":
        const LeaderID = getFormLeaderID(index);
        const actionName = "SAVE_CHANGES";
        const formId = ScopeState.tabs.subMenu[index].SubMenuExtID;
        const SkipSaveOperation =
          ScopeState.tabs.subMenu[index].SkipSaveOperation;
        const api = "DisplayFormResults";
        const subMenuAppPartID =
          ScopeState.tabs.subMenu[index].SubMenuAppPartID;

        const request = {
          LeaderID: LeaderID,
          formID: formId,
        };
        return (
          <Form
            generalTab={index === 0}
            key={subMenuAppPartID}
            leaderId={LeaderID}
            formId={formId}
            skipSaveOperation={SkipSaveOperation}
            request={request}
            actionname={actionName}
            api={api}
            $modal={$modal}
            $state={$state}
            cancelButton={true}
            subMenuAppPartID={subMenuAppPartID}
            updateActionsParams={updateActionsParams}
            setFormIsChanges={setFormIsChanges}
          />
        );

      case "custom":
        return index === 1 && getTargetParameters(1)?.FieldName === "JobID"
          ? getJobRecipe()
          : getcustomTemplate(index);

      case "report":
        return getReportTemplate(index);
      case "multiforms":
        return getmultiFormTemplate(index);

      case "continuousform":
        const data = ScopeState.tabs.subMenu[index];
        const pairs = getTargetParameters(index);
        return <ContinuousForm data={data} targetPairs={pairs} />;
      default:
        return <div>Error Page not found {typeOfTemplate}</div>;
    }
  };

  const loadRefActionMenuTemplate = (c) => {
    if (c) {
      let newScope = $scope.$new();
      newScope.actionsData = ScopeState.actionsData;
      const showActions =
        newScope.actionsData.actions.length > 0 ? true : false;
      if (!showActions) return;
      c.innerHTML = "";
      setTimeout(
        () =>
          c.insertAdjacentElement(
            "afterbegin",
            compile(
              `<div style="zindex:10;"><app-object-config-directive content="actionsData"></app-object-config-directive></div>`
            )(newScope)[0]
          ),
        50
      );
    }
  };

  const getActionMenu = () => {
    return <div ref={(c) => loadRefActionMenuTemplate(c)}></div>;
  };

  const template = useMemo(
    () =>
      ScopeState?.tabs.subMenu.map((tab, index) => (
        <TabWrapper key={index}>
          {index === SelectedIndex
            ? getTemplate(tab.SubMenuTargetTYpe, index)
            : null}
        </TabWrapper>
      )),
    [ScopeState?.tabs.subMenu, SelectedIndex]
  );

  const TabClicked = (index) => {
    document.title =
      ScopeState.content.linkItem +
      " " +
      ScopeState.content.ID +
      " | " +
      (isLocalLanguage(language)
        ? ScopeState.tabs.subMenu[index]?.SubMenuLName
        : ScopeState.tabs.subMenu[index]?.SubMenuEName);

    if (index !== SelectedIndex) {
      if (formIsChanges) {
        setIsOpenFormModal(true);
        nextIndexRef.current = index;
      } else setSelectedIndex(index);
    }
  };

  //FORM changes section
  const handleDiscardChanges = useCallback(() => {
    setFormIsChanges(false);
    setSelectedIndex(nextIndexRef.current);
    setIsOpenFormModal(false);
  }, []);
  //END FORM CHANGE SECTION
  return (
    <>
      <Container height={height}>
        {ScopeState && getActionMenu()}
        <FormNotifyModal
          isOpen={isOpenFormModal}
          handleClose={() => setIsOpenFormModal(false)}
          handleDiscard={handleDiscardChanges}
        />
        {ScopeState ? (
          <SideTabs
            selectedIndex={SelectedIndex}
            Titles={[...ScopeState.tabs.subMenu.map((tab) => tab[TabTitleKey])]}
            onClickIndex={TabClicked}
            EnabledTabs={ScopeState.tabs.subMenu.map((tab) => tab.enabled)}
          >
            {template}
          </SideTabs>
        ) : (
          <div>loading</div>
        )}
      </Container>
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
      return { ...prev, language: language };
    });
  }, [language, i18n]);

  useEffect(() => {
    document.body.dir = isRtl;
  }, [isRtl]);

  return (
    <ThemeProvider theme={theme}>
      <Tabs language={language} {...props} />
    </ThemeProvider>
  );
};

const TabsGenric = (props) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Wrapper {...props} />
      </Provider>
    </React.StrictMode>
  );
};

export default TabsGenric;
