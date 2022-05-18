import ReactToAngularJS from "../react-to-angular";
import ReactToAngularJS_INPUT from "../react-to-angular_Input";
import store from "./../../../Redux/store";
import { Provider } from "react-redux";
import InputDatePicker from "./NgDatePicker";
import InputGenericField from "./NgInputgenric";
import SingleDropDownGeneric from "./NgDropDown";
import InputField from "./NGInputField";
import InputPasswordGenericField from "./NgPasswordInput";
import FormGenric from "./NgFormgenric";
import FormWizardGenric from "./NgFormgenric/wizardForm";
import TabappObject from "./NgTabappObject/index";
import TableSearchResult from "./SearchResults/SearchResultsWithFilters";
import SearchResultReturnValue from "./SearchResults/SearchResultsReturnValue";
import ProductionLinesTable from "./SearchResults/ProductionLinesTable";
import TableEditable from "./editableTable";
import PedningJobs from "./SearchResults/PendingJobsResults";
import EditableTableWithForm from "./continuousForm";
import useInitTheme from "../useInitTheme";
import { ThemeProvider } from "styled-components";
import React, { useEffect } from "react";
import QcTestSearchResult from "./SearchResults/QcTestQuality";
import UnAssignedJobs from "./SearchResults/UnassignedJobs";
import { checkMenuDOM } from "../../CommonFunctions";
import AzureGroupMapping from "./SearchResults/azureGrouping";
import StopEventMachines from "./SearchResults/StopEventMachines";
const TableComponent6 = (props) => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StopEventMachines {...props} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  TableComponent6,
  "reactSearchResultsStopEvent",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    content: "=",
  }
);

const TableComponent5 = (props) => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AzureGroupMapping {...props} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  TableComponent5,
  "reactSearchResultsAzureMapping",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    content: "=",
  }
);

const TableComponent4 = (props) => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <UnAssignedJobs {...props} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  TableComponent4,
  "reactSearchResultsUnassignedJobs",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    content: "=",
    close: "=",
  }
);

const TableComponent3 = (props) => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <QcTestSearchResult {...props} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  TableComponent3,
  "reactSearchResultsQcQuality",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    content: "=",
  }
);

const ProductionLinesTableComp = (props) => {
  const { theme } = useInitTheme();

  useEffect(() => {
    if (document.getElementById("page-wrapper")) {
      document.getElementById("page-wrapper").style.backgroundColor = "white";
    } else if (document.getElementById("wrapper")) {
      document.getElementById("wrapper").style.backgroundColor = "white";
    }
  }, []);
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ProductionLinesTable {...props} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  ProductionLinesTableComp,
  "reactSearchResultsProductionLines",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    content: "=",
  }
);

const TableComponent2 = (props) => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SearchResultReturnValue {...props} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  TableComponent2,
  "reactSearchResultsReturnValue",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    content: "=",
  }
);

const TableComponent = (props) => {
  const { theme } = useInitTheme();

  useEffect(() => {
    if (document.querySelector(".wrapper-content")) {
      document.querySelector(".wrapper-content").style.backgroundColor =
        "white";
      document.querySelector(".wrapper-content").style.padding = "0px";
    }
    if (document.querySelector(".wrapper")) {
      document.querySelector(".wrapper").style.padding = "0px";
    }
  }, []);
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TableSearchResult {...props} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  TableComponent,
  "reactSearchResults",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    content: "=",
  }
);

const TableComponentEditable = (props) => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TableEditable {...props} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

ReactToAngularJS(
  TableComponentEditable,
  "reactEditableTable",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    content: "=",
  }
);

const TablePendingJobsComp = (props) => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PedningJobs {...props} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

ReactToAngularJS(
  TablePendingJobsComp,
  "reactPendingJobsTable",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    content: "=",
  }
);

const EditableTableFormComp = (props) => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <EditableTableWithForm {...props} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

ReactToAngularJS(
  EditableTableFormComp,
  "reactMultiForm",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    data: "=",
  }
);

const TabappObjectComp = (props) => {
  const { theme } = useInitTheme();

  useEffect(() => {
    if (!checkMenuDOM()) {
      if (document.querySelector(".wrapper")) {
        document.querySelector(".wrapper").style.padding = "0px";
        document.querySelector(".wrapper").style.margin = "86px 0 0 0";
      }
    } else {
      if (document.querySelector(".wrapper")) {
        document.querySelector(".wrapper").style.padding = "0px";
        document.querySelector(".wrapper").style.margin = "125px 0 0 0";
      }
    }
    if (document.querySelector("#page-wrapper")) {
      document.querySelector("#page-wrapper").style.backgroundColor = "white";
    }
    if (document.getElementById("appObjectTemplate")) {
      document.getElementById("appObjectTemplate").style.backgroundColor =
        "white";
      document.getElementById("appObjectTemplate").style.overflow = "hidden";
    }
  }, []);

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <TabappObject
          height={checkMenuDOM() ? "calc(100vh - 170px)" : "calc(100vh - 86px)"}
          {...props}
        />
      </ThemeProvider>
    </React.StrictMode>
  );
};

ReactToAngularJS_INPUT(
  TabappObjectComp,
  "reactAppObjectGeneric",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    content: "=",
    tabs: "=",
    tabsControl: "=",
  }
);

// ReactToAngularJS_INPUT(
//   TabappObject,
//   "reactAppObjectGeneric",
//   // eslint-disable-next-line no-undef
//   angular.module("LeaderMESfe"),
//   {
//     tabs: "=",
//     leaderId: "=",
//     formId: "=",
//     skipSaveOperation: "=",
//     api: "=",
//     actionname: "=",
//     generalTab: "=",
//     pairs: "=",
//     wizard: "=",
//     request: "=",
//     actionsData: "=",
//     fullSize: "=",
//     add: "=",
//     tabClicked: "=",
//     customContent: "=",
//     pageDisplay: "=",
//     editableTableData: "=",
//     continousMultiForm: "=",
//     save: "=",
//     searchResultsRequest: "=",
//     searchBoxFields: "=",
//     requestInProgress: "=",
//     searchMultiForm: "=",
//     dataLoaded: "=",
//   }
// );

ReactToAngularJS_INPUT(
  FormGenric,
  "reactFormGeneric",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    leaderId: "=",
    formId: "=",
    skipSaveOperation: "=",
    api: "=",
    actionname: "=",
    generalTab: "=",
    pairs: "=",
    wizard: "=",
    request: "=",
    actionsData: "=",
    fullSize: "=",
    add: "=",
    updateActionsParams: "=",
    formCallback: "=",
    customButton: "=",
    alwaysShowFooter: "=",
    showOtherButton: "=",
    otherActionName: "=",
    cancelButton: "=",
    modalClose: "=",
    updateChanges: "=",
  }
);

ReactToAngularJS_INPUT(
  FormWizardGenric,
  "reactFormWizardGeneric",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    wizardid: "=",
    leaderId: "=",
    skipSaveOperation: "=",
    pairs: "=",
    modalClose: "=",
    funcAction: "=",
    content: "=",
    actionModalInstanceCtrl: "=",
  }
);

ReactToAngularJS(
  InputDatePicker,
  "reactDatePicker",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    onupdate: "=",
    onupdatedate: "=",
    oninit: "=",
    value: "=",
    disabled: "=",
    contentname: "=",
  }
);

ReactToAngularJS_INPUT(
  InputGenericField,
  "reactInputGeneric",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    content: "=",
    search: "=",
    formobject: "=",
    multiform: "=",
    add: "=",
    commonFunctions: "=?",
  }
);

ReactToAngularJS(
  SingleDropDownGeneric,
  "reactSingleDropDownGeneric",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    items: "=",
    placeholder: "=",
    required: "=",
    inputvalue: "=",
    disabled: "=",
  }
);

ReactToAngularJS(
  InputField,
  "reactInputGenericText",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    textvalue: "=",
    placeholder: "=",
    onupdate: "=",
    content: "=",
    oninit: "=",
    title: "=",
    required: "=",
    type: "=",
  }
);

ReactToAngularJS(
  InputPasswordGenericField,
  "reactInputPasswordGenericText",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    textvalue: "=",
    placeholder: "=",
    title: "=",
  }
);
