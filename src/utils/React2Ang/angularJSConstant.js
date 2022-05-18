let BASE_URL = "";

// eslint-disable-next-line no-undef
angular.element(document).ready(function () {
  console.log("page loading completed");
  var inj = window.angular.element(document.body).injector();
  var constant = inj.get("BASE_URL");
  BASE_URL = constant.url;
});

export { BASE_URL };
