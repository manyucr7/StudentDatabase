var app = angular.module('myApp',  ['ngRoute','ui.bootstrap']);
app.controller('myCtrl', function ($scope, $http,$location) {
    $scope.logout = function () {
        $http.get("http://localhost:3000/logout").then(function (response) {
            console.log(response);
        });
        $location.path("/");
    };
    $scope.currentPath = $location.path();
    console.log($scope.currentPath);
    
})
app.directive('myDirective', function () {
    return {
        require: 'ngModel',
        link: function (control) {
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
        link: function (control) {
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
        link: function (control) {
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

