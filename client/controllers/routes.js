app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "../views/login.html",
      controller: 'loginUpData'
    })
    .when("/add", {
      templateUrl: "../views/form.html",
      controller: "bigData"
    })
    .when("/show", {
      templateUrl: "../views/show-data.html",
      controller: 'showData'
    })
    .when("/signup", {
      templateUrl: "../views/signup.html",
      controller: 'signUpData'
    })
    .when("/analytics", {
      templateUrl: "../views/analytics.html",
      controller: 'bigData'
    })
});