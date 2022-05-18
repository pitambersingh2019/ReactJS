import { getService } from "../../../utils/React2Ang/react-to-angular";
import i18next from "i18next";
import { useCallback } from "react";
import { selectAzureClientId } from "../slice/selectors";
import { useSelector, useDispatch } from "react-redux";
import { setSession } from "../slice";
import { PAGE } from "../index";
const useLogin = (setErr, SetPage) => {
  const dispatch = useDispatch();
  const AzureClientID = useSelector(selectAzureClientId);
  const changeLanguage = useCallback((language) => {
    //change lang in agularjs!
    if (language) {
      const LeaderMESservice = getService("LeaderMESservice");
      LeaderMESservice.setLanguage(language);
      //change lang in Reactjs!
      i18next.changeLanguage(language.ShortName);
    }
  }, []);

  const getDefaultLanguage = useCallback((languageItems) => {
    // const ngStoragelanguage =
    //   window.sessionStorage.getItem("ngStorage-language");
    // const ngStoragelanguageobj = ngStoragelanguage
    //   ? JSON.parse(ngStoragelanguage)
    //   : null;
    // console.log("ngStoragelanguageobj", ngStoragelanguageobj);
    // const defaultLang = ngStoragelanguageobj ?? "eng";
    const LeaderMESservice = getService("LeaderMESservice");
    const defaultLang = LeaderMESservice.getDefaultLanguage();
    if (defaultLang) {
      return languageItems.find(
        (elem) => elem.value === defaultLang?.ShortName
      );
    }
    return languageItems.find((elem) => elem.value === "eng");
  }, []);

  const topMenuBySubMenuId = function (mainMenu, SubMenuAppPartID) {
    for (var i = 0; i < mainMenu.length; i++) {
      var foundSubMenu = mainMenu[i].subMenu.find(
        (elem) => elem.SubMenuAppPartID === SubMenuAppPartID
      );
      if (foundSubMenu) {
        return {
          topMenu: mainMenu[i],
          subMenu: foundSubMenu,
        };
      }
    }
    return null;
  };
  const successfullLogin = function (response) {
    const LeaderMESservice = getService("LeaderMESservice");
    const $rootScope = getService("$rootScope");
    const AUTH_EVENTS = getService("AUTH_EVENTS");
    const $filter = getService("$filter");
    const BASE_URL = getService("BASE_URL");
    const $sessionStorage = getService("$sessionStorage");
    const COGNOS = getService("COGNOS");
    const $state = getService("$state");
    const AuthService = getService("AuthService");
    const PRODUCTION_FLOOR = getService("PRODUCTION_FLOOR");
    const configuration = getService("configuration");

    let defaultHomePage = null;
    let logoUrl = null;
    let bigImageUrl = null;
    configuration.getSection("login").then(function (data) {
      logoUrl = data.logoUrl;
      bigImageUrl = data.bigImageUrl;
      defaultHomePage = data.defaultHomePage;
    });

    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    LeaderMESservice.setMainMenu(function (mainMenu) {
      LeaderMESservice.getProductionProgressColorDefinition();
      // var sortedSubMenus = [11215, 300, 30000, 1500];
      // var rtl = LeaderMESservice.isLanguageRTL();

      var allMachines = {
        ActionCriteria: "",
        ActionIcon: "",
        ActionOpenInNewTab: true,
        LeaderIDTargetParameter: "",
        PreActionFunction: "",
        PreActionParameters: "",
        SkipSaveOperation: false,
        SubMenuAccessLevel: 15,
        SubMenuAppPartID: -1,
        SubMenuDisplayOrder: 0,
        SubMenuEName: $filter("translate")("ALL_MACHINES"),
        SubMenuEnableOnNew: false,
        SubMenuExtID: 0,
        SubMenuFileObjectRelation: null,
        SubMenuHasImageFile: false,
        SubMenuIsHomePage: false,
        SubMenuLName: $filter("translate")("ALL_MACHINES"),
        SubMenuMenuType: "submenu",
        SubMenuNewObjectLinkID: 0,
        SubMenuObjectInformation: null,
        SubMenuObjectInformationLink: 0,
        SubMenuObjectKey: "",
        SubMenuObjectPrintLevel: null,
        SubMenuTargetParameters: "DepartmentID=[SubMenuExtID]",
        SubMenuTargetTYpe: "custom:GetMachineCubeData",
        fullView: "customFullView",
        state: "index.custom",
        allMachines: true,
      };
      var targets = {
        ActionCriteria: "",
        ActionIcon: "",
        ActionOpenInNewTab: true,
        LeaderIDTargetParameter: "",
        PreActionFunction: "",
        PreActionParameters: "",
        SkipSaveOperation: false,
        SubMenuAccessLevel: 15,
        SubMenuAppPartID: -2,
        SubMenuDisplayOrder: 0,
        SubMenuEName: $filter("translate")("FACTORY_VIEW_TARGETS"),
        SubMenuEnableOnNew: false,
        SubMenuExtID: 0,
        SubMenuFileObjectRelation: null,
        SubMenuHasImageFile: false,
        SubMenuIsHomePage: false,
        SubMenuLName: $filter("translate")("FACTORY_VIEW_TARGETS"),
        SubMenuMenuType: "submenu",
        SubMenuNewObjectLinkID: 0,
        SubMenuObjectInformation: null,
        SubMenuObjectInformationLink: 0,
        SubMenuObjectKey: "",
        SubMenuObjectPrintLevel: null,
        SubMenuTargetParameters: "DepartmentID=[SubMenuExtID]",
        SubMenuTargetTYpe: "custom:GetMachineCubeData",
        fullView: "customFullView",
        state: "index.custom",
        targets: true,
      };
      var productionFloorMenu = mainMenu.find(
        (elem) => elem.TopMenuAppPartID === 500
      );
      if (productionFloorMenu) {
        productionFloorMenu.subMenu.splice(1, 0, targets);
        productionFloorMenu.subMenu.splice(2, 0, allMachines);
      }

      if (COGNOS.enable == true) {
        // $scope.enableCognos = true;
        // const cognosUrl = COGNOS.url;
        $("#cookieIframe").attr(
          "src",
          BASE_URL.url + "GetKeyForCognos/" + AuthService.getAccessToken()
        );
      }
      var homePage = defaultHomePage || 540;
      if (
        response &&
        response.JGetUserSessionIDResult &&
        response.JGetUserSessionIDResult.session &&
        response.JGetUserSessionIDResult.session.length > 0 &&
        response.JGetUserSessionIDResult.session[0].HomePageSubObject !== ""
      ) {
        if ($sessionStorage.produtionFloorTab) {
          $sessionStorage.produtionFloorTab.selectedTab =
            response.JGetUserSessionIDResult.session[0].HomePageSubObject;
        }
      }
      if (
        response.JGetUserSessionIDResult.session[0].HomePage !== undefined &&
        response.JGetUserSessionIDResult.session[0].HomePage !== null
      ) {
        homePage = response.JGetUserSessionIDResult.session[0].HomePage || 540;
        var homePageMenu = topMenuBySubMenuId(mainMenu, homePage);
        if (homePageMenu) {
          $state.go(homePageMenu.subMenu.state, {
            menuContent: {
              subMenu: homePageMenu.subMenu,
              topMenu: homePageMenu.topMenu,
            },
          });
          return;
        }
        homePage = defaultHomePage || 540;
      }
      // LeaderMESservice.customAPI('SaveUserHomePage', {
      //     HomePage: homePage
      // });
      homePageMenu = topMenuBySubMenuId(mainMenu, homePage);
      if (homePageMenu) {
        $state.go(homePageMenu.subMenu.state, {
          menuContent: {
            subMenu: homePageMenu.subMenu,
            topMenu: homePageMenu.topMenu,
          },
        });
        return;
      }
      $sessionStorage.productionFloor = null;
      if (PRODUCTION_FLOOR.FIRST_PAGE == true) {
        var departmentId = PRODUCTION_FLOOR.FIRST_DEPARTMENT ? 1 : 0;
        for (var i = 0; i < mainMenu.length; i++) {
          for (var j = 0; j < mainMenu[i].subMenu.length; j++) {
            if (
              mainMenu[i].subMenu[j].SubMenuExtID == departmentId &&
              mainMenu[i].subMenu[j].SubMenuTargetTYpe ==
                "custom:GetMachineCubeData"
            ) {
              $sessionStorage.productionFloor = {
                subMenu: mainMenu[i].subMenu[j],
                topMenu: mainMenu[i],
              };
              $state.go("index.custom", {
                menuContent: {
                  subMenu: mainMenu[i].subMenu[j],
                  topMenu: mainMenu[i],
                },
              });
              return;
            }
          }
        }
      }

      $state.go("index.main");
    });
  };

  const login = (username, password, language) => {
    const AuthService = getService("AuthService");
    const $sessionStorage = getService("$sessionStorage");
    const $rootScope = getService("$rootScope");
    const AUTH_EVENTS = getService("AUTH_EVENTS");

    var encryptedPass = AuthService.getEncryptedPassword({
      token: password,
    });
    encryptedPass.then(function (resp) {
      var userCredentials = {
        Username: username,
        EncryptedPassword: resp.token,
        Lang: language ? language.value : "eng",
        Platform: "web",
      };
      var userResponse = AuthService.login(
        "JGetUserSessionID",
        userCredentials
      );
      userResponse.then(function (response) {
        if (response) {
          if (response.JGetUserSessionIDResult.error == null) {
            if ($sessionStorage.HasEmail && $sessionStorage.ValidatedEmail) {
              successfullLogin(response);
            } else {
              dispatch(setSession(response?.JGetUserSessionIDResult?.session));
              SetPage(PAGE.VALIDATE);
            }
          } else {
            const errorMessage =
              response.JGetUserSessionIDResult.error.ErrorDescription;
            setErr({ value: true, text: errorMessage });
          }
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          setErr({ value: true, text: "Login Failed" });
        }
      });
    });
  };

  const openAzurePopup = () => {
    const $rootScope = getService("$rootScope");
    const $sessionStorage = getService("$sessionStorage");
    const AuthService = getService("AuthService");

    window.config = {
      clientId: AzureClientID,
    };
    var authContext = new AuthenticationContext(config);
    if (authContext && authContext.config) {
      if (authContext.config.postLogoutRedirectUri) {
        authContext.config.postLogoutRedirectUri =
          authContext.config.postLogoutRedirectUri.toLowerCase();
      }
      if (authContext.config.redirectUri) {
        authContext.config.redirectUri =
          authContext.config.redirectUri.toLowerCase();
      }
    }
    authContext.clearCache();
    authContext.clearCacheForResource(AzureClientID);
    authContext.popUp = true;
    authContext.callback = function (a, id_token, c) {
      var user = authContext.getCachedUser();
      if (user) {
        if (id_token) {
          $sessionStorage.azureUser = user && user.profile && user.profile.oid;
          AuthService.login("LoginWithAzureWeb", {
            token: id_token,
            Lang: "eng",
            platform: "web",
            userName: user.userName,
          }).then(function (response) {
            if (response.error == null) {
              $rootScope.$broadcast("azureUserLogIn", true);
              var data = {
                JGetUserSessionIDResult: {
                  session: response.session,
                },
              };
              const response = data;
              if ($sessionStorage.HasEmail && $sessionStorage.ValidatedEmail) {
                successfullLogin(response);
              } else {
                dispatch(
                  setSession(response?.JGetUserSessionIDResult?.session)
                );
                SetPage(PAGE.VALIDATE);
              }
            } else {
              // $scope.errorMessage = response.error.ErrorDescription;
              // $scope.loginInProgress = false;
            }
          });
        } else {
        }
      } else {
      }
    };
    authContext.login();
  };
  return [changeLanguage, getDefaultLanguage, login, openAzurePopup];
};
export default useLogin;
