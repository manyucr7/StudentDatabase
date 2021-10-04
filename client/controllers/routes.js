app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "../views/login.html",
      controller: 'loginUpData'
    })
    .when("/add", {
      resolve: {
        function($location) {
          if (document.cookie == '' || localStorage.getItem('roles') != "student") {
            $location.path('/showSchool');
          }
        }
      },
      templateUrl: "../views/form.html",
      controller: "bigData"
    })
    .when("/show", {
      resolve: {
        function($location) {
          if (document.cookie == '' || localStorage.getItem('roles') != "student") {
            $location.path('/showSchool');
          }
        }
      },
      templateUrl: "../views/show-data.html",
      controller: 'showData'
    })
    .when("/signup", {
      templateUrl: "../views/signup.html",
      controller: 'signUpData'
    })
    .when("/analytics", {
      resolve: {
        function($location) {
          if (document.cookie == '' || localStorage.getItem('roles') != "student") {
            $location.path('/showSchool');
          }
        }
      },
      templateUrl: "../views/analytics.html",
      controller: 'bigData'
    })
    .when("/adminlogin", {
      templateUrl: "../views/admin.html",
      controller: 'adminController'
    })
    .when("/adminsignup", {
      templateUrl: "../views/adminsignup.html",
      controller: 'adminController'
    })
    .when("/showSchool", {
      resolve: {
        function($location) {
          if (document.cookie == '' || localStorage.getItem('roles') != "admin") {
            $location.path('/show');
          }
        }
      },
      templateUrl: "../views/showSchoolData.html",
      controller: 'showSchoolData'
    })
    .otherwise({redirectTo:'/'})
});