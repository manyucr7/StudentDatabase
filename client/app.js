var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngResource']);
app.controller('myCtrl', function ($scope, $http, $location) {
    $scope.logout = function () {
        $http.get("http://localhost:3000/logout").then(function (response) {
            console.log(response);
        });
        $location.path("/");
    };
    $scope.currentPath = $location.path();

})
app.directive('myDirective', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attributes, control) {
            control.$validators.myDirective = function (modelValue, viewValue) {

                if (control.$isEmpty(modelValue)) // if empty, correct value
                {
                    return true;
                }

                var field = String(viewValue);

                if (field.length > 4) // correct value
                {
                    return true;
                }
                return false; // wrong value
            };
        }
    };
});
app.directive('adult', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attributes, control) {
            control.$validators.adult = function (modelValue, viewValue) {

                if (control.$isEmpty(modelValue)) // if empty, correct value
                {
                    return true;
                }

                var marks = Number(viewValue);

                if (marks >= 0 && marks <= 100) // correct value
                {
                    return true;
                }
                return false; // wrong value
            };
        }
    };
});
app.directive('field', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attributes, control) {
            control.$validators.field = function (modelValue, viewValue) {

                if (control.$isEmpty(modelValue)) // if empty, correct value
                {
                    return true;
                }

                var field = String(viewValue);

                if (field.length > 2) // correct value
                {
                    return true;
                }
                return false; // wrong value
            };
        }
    };
});
app.service('serviceX', function ($http, $location) {
    this.loginData = function () {
        let url = "http://localhost:3000/login";
        let data = {
            gname: gname.value,
            pw: pw.value,
        }
        $http.post(url, data).then(res => {
            console.log(res);
            if (res.data.user) {
                console.log(res.data.user);
                $location.path('/show');
            }
        })

    };
    this.signUp = function () {
        let url = "http://localhost:3000/signup";
        let data = {
            gname: gname.value,
            pw: pw.value,
        }
        $http.post(url, data).then(res => {
            console.log(res);
            if (res.data.usr) {
                console.log(res.data.usr);
                $location.path('/');
            }
        })

    };

});
// app.factory('Posts', function ($resource) {
//     return $resource('http://localhost:3000/posts',null,
// 	{
// 	    'save':  {method:'POST', isArray:true} 
// 	});
// });
// app.factory('totalPages', function ($resource) {
//     return $resource('http://localhost:3000/totalpages');
// });