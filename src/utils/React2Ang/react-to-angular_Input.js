const React = require("react");
const ReactDOM = require("react-dom");

function ReactToAngularJS(
  Component,
  directiveName,
  angularApp,
  bindings,
  Comp2
) {
  bindings = bindings || {};
  if (typeof window === "undefined" || typeof angularApp === "undefined")
    return;

  angularApp.directive(directiveName, [
    "commonFunctions",
    "$rootScope",
    "$compile",
    "$modal",
    "$state",
    "customServices",
    "LeaderMESservice",
    function (
      commonFunctions,
      $rootScope,
      $compile,
      $modal,
      $state,
      customServices,
      LeaderMESservice
    ) {
      return {
        scope: bindings,
        replace: true,
        link: function (scope, element) {
          // Add $scope
          scope.$scope = scope;
          scope.$scope.commonFunctions = commonFunctions;
          scope.$scope.rootScope = $rootScope;
          scope.$scope.compile = $compile;

          scope.$scope.$modal = $modal;
          scope.$scope.$state = $state;
          scope.$scope.customServices = customServices;
          scope.$scope.LeaderMESservice = LeaderMESservice;

          // First render - needed?
          const comp = ReactDOM.render(
            React.createElement(Component, scope),
            element[0]
          );

          // Watch for any changes in bindings, then rerender
          const keys = [];
          for (let bindingKey of Object.keys(bindings)) {
            if (bindings[bindingKey] !== "&") {
              keys.push(bindingKey);
            }
          }

          scope.$watchGroup(keys, (newValue, oldValue) => {
            console.log(newValue);
            console.log(oldValue);
            // Component(scope);
            ReactDOM.render(React.createElement(Component, scope), element[0]);
            //comp.forceUpdate();
            // if (Comp2) {
            //   Comp2(scope);
            // }
          });
        },
      };
    },
  ]);
}

function getService(serviceName) {
  if (typeof window === "undefined" || typeof window.angular === "undefined")
    return {};
  return window.angular.element(document.body).injector().get(serviceName);
}

export { getService };
export default ReactToAngularJS;
