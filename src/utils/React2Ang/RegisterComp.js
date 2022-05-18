import React from "react";
import store from "./../../Redux/store";
import { Provider } from "react-redux";

import ReactToAngularJS from "./react-to-angular";
import RuleContainer from "../../Containers/RuleContainer/RuleContainer";
import TargetsManagementContainer from "../../features/targets-management/index";

import { ThemeProvider } from "styled-components";
import TasksManagementContainer from "../../features/tasks-management";
import SpcConfiguration from "../../features/spc-configuration";
import ProductRecipe from "../../features/product-recipe";
import useInitTheme from "./useInitTheme";
import MaterialsRecipes from "../../Component/MaterialsRecipes/MaterialsRecipes";
// import Table from "./designSystem/SearchResults/SearchResultsWithFilters";
import MyTasksPanelContainer from "../../features/tasks-management/components/MyTasksPanel";
import KPIWrapper from "../../features/kpi";
import ProcessControlDashboardContainer from "../../features/process-control-dashboard";
import TaskFormModal from "../../features/tasks-management/components/TaskForm/TaskFormModal/TaskFormModal";
import TasksContextProviders from "../../features/tasks-management/context/TasksContextProviders";
import FileManager from "../../features/fileManager";
import Login from "../../features/login";
import QuantityTargetsManagementContainer from "../../features/quantity-targets-management";
import JobRecipe from "../../features/job-recipe";
import { customTheme } from "../../styles/theme";

//RuleContainer Component
const RuleContainerPP = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <RuleContainer1 />
      </Provider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  RuleContainerPP,
  "reactRules",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {}
);

const RuleContainer1 = () => {
  const { theme } = useInitTheme();

  return (
    <ThemeProvider theme={theme}>
      <RuleContainer />
    </ThemeProvider>
  );
};

// TargetsManagement Component
const TargetsManagement = () => {
  const { theme } = useInitTheme();

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <TargetsManagementContainer />
      </ThemeProvider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  TargetsManagement,
  "reactTargets",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {}
);

// TasksManagement Component
const TasksManagement = () => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <TasksManagementContainer />
      </ThemeProvider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  TasksManagement,
  "reactTasks",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {}
);

// MaterialsManagement Component
const MaterialsManagement = () => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <MaterialsRecipes />
      </ThemeProvider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  MaterialsManagement,
  "reactMaterials",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {}
);

// MyTasksPanel Component
const MyTasksPanel = (props) => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <MyTasksPanelContainer onUpdate={props.onUpdate} />
      </ThemeProvider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  MyTasksPanel,
  "reactPanel",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  { onUpdate: "=" }
);

// KPICustomization Component
const KPICustomization = () => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <KPIWrapper />
      </ThemeProvider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  KPICustomization,
  "reactKpiCustomization",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {}
);

//SPC Component
const SPCManagement = () => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SpcConfiguration />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  SPCManagement,
  "reactSpc",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {}
);

//Product Recipe Component
const ProductRecipeComp = (props) => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ProductRecipe {...props} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  ProductRecipeComp,
  "reactProductRecipe",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    content: "=",
  }
);

// Process Control Dashboard Component
const ProcessControlDashboard = () => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <ProcessControlDashboardContainer />
      </ThemeProvider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  ProcessControlDashboard,
  "reactPcd",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {}
);

// TaskFormModal Component
const TaskFormModalComponent = (props) => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <TasksContextProviders>
          <TaskFormModal onUpdate={props.onUpdate} open={props.open} />
        </TasksContextProviders>
      </ThemeProvider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  TaskFormModalComponent,
  "taskFormModal",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  { onUpdate: "=", open: "=" }
);

// FileManager Component
const FileManagerToAngular = () => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <FileManager />
      </ThemeProvider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  FileManagerToAngular,
  "reactFileManager",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {}
);

// Login Component
const LoginToAngular = (props) => {
  const [theme, setTheme] = React.useState({ ...customTheme, dir: "ltr" });
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Login {...props} setTheme={setTheme} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  LoginToAngular,
  "reactLogin",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    loginctrl: "=",
  }
);

// Quanitity Targets Management Component
const QuantityTargetsManagement = () => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <QuantityTargetsManagementContainer />
      </ThemeProvider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  QuantityTargetsManagement,
  "reactQtm",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {}
);

// Job recipe Component
const JobRecipeComponent = (props) => {
  const { theme } = useInitTheme();
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <JobRecipe {...props} />
      </ThemeProvider>
    </React.StrictMode>
  );
};
ReactToAngularJS(
  JobRecipeComponent,
  "reactJobRecipe",
  // eslint-disable-next-line no-undef
  angular.module("LeaderMESfe"),
  {
    content: "=",
  }
);
