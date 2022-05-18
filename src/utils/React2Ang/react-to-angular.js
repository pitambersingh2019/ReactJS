const React = require("react");
const ReactDOM = require("react-dom");

function ReactToAngularJS(Component, directiveName, angularApp, bindings) {
  bindings = bindings || {};
  if (typeof window === "undefined" || typeof angularApp === "undefined")
    return;

  angularApp.directive(directiveName, function () {
    return {
      scope: bindings,
      replace: true,
      link: function (scope, element) {
        // Add $scope
        scope.$scope = scope;
        // First render - needed?
        ReactDOM.render(React.createElement(Component, scope), element[0]);

        // Watch for any changes in bindings, then rerender
        const keys = [];
        for (let bindingKey of Object.keys(bindings)) {
          if (bindings[bindingKey] !== "&") {
            keys.push(bindingKey);
          }
        }
        //debugger;
        scope.$watchGroup(keys, () => {
          ReactDOM.render(React.createElement(Component, scope), element[0]);
          // Component(scope);
          // debugger;
        });
      },
    };
  });
}

function getService(serviceName) {
  if (typeof window === "undefined" || typeof window.angular === "undefined")
    return {};
  return window.angular.element(document.body).injector().get(serviceName);
}

export { getService };
export default ReactToAngularJS;
