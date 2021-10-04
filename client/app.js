var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngResource']).config(function ($httpProvider,) {
    $httpProvider.interceptors.push(Interceptor);
    //growlProvider.globalTimeToLive(5000);
});
var Interceptor = function () {
    return {
        request: function (config) {
            console.log("request has started")
            return config;
        }
        // ,requestError: function (rejection) {
        //     console.log(rejection)
        //     return $q.reject(rejection);
        // },
        // response: function (result) {   
        //     console.log('request completed');
        //     return result;
        // }
        , responseError: function (response) {
            if (response.status === 400) {
                console.log('ERROR 400')
            }
            if (response.status === 401) {
                console.log('ERROR 401');
                $.bootstrapGrowl("Wrong Password", {
                    ele: 'body',
                    type: 'danger',
                    offset: { from: 'top', amount: 20 },
                    align: 'right',
                    width: 250,
                    delay: 3000,
                    allow_dismiss: true,
                    stackup_spacing: 10
                });
            }
            if (response.status === 500) {
                console.log('ERROR 500')
            }
            if (response.status === 404) {
                console.log('ERROR 404')
            }
            return response;
        }
    }
}
app.service('logoutService', function ($rootScope, $location, $http) {
    this.logout = function () {

        //growl.addSuccessMessage("SUCCESS_MESSAGE");
        $.bootstrapGrowl("logged out succesfully", {
            ele: 'body',
            type: 'danger',
            offset: { from: 'top', amount: 20 },
            align: 'right',
            width: 250,
            delay: 3000,
            allow_dismiss: true,
            stackup_spacing: 10
        });
        $http.get("http://localhost:3000/logout").then(function (response) {
        }).catch(function (err) {
            console.log(err)
        })
        $location.path("/");
    };
    $rootScope.currentPath = $location.path();
})
app.controller('myCtrl', function ($scope,$location) {
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

                if (field.length >= 3) // correct value
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
app.directive('total', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attributes, control) {
            control.$validators.total = function (modelValue, viewValue) {

                if (control.$isEmpty(modelValue)) // if empty, correct value
                {
                    return true;
                }

                var marks = Number(viewValue);

                if (marks >= 0.0 && marks <= 10.0) // correct value
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
app.service('serviceX', function ($http, $location, rolex) {
    this.loginData = function () {
        localStorage.setItem('roles', "student");
        rolex.getRole();
        let url = "http://localhost:3000/login";
        let data = {
            gname: gname.value,
            pw: pw.value,
        }
        $http.post(url, data).then(res => {
            if (res.data.user) {
                console.log(res.data.user);
                $location.path('/show');
            }
        }).catch(err => {
            console.log(err);
            
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
app.service('rolex', function ($http, $location) {
    this.getRole = function () {
        var data = {
            myrole: localStorage.getItem('roles')
        }
        $http.post('/getRoleValue', { data }).then(function (data) {
        }).catch(function (err) {
            console.log(err)
        })
    }
})
// app.factory('Posts', function ($resource) {
//     return $resource('http://localhost:3000/posts',null,
// 	{
// 	    'save':  {method:'POST', isArray:true} 
// 	});
// });
// app.factory('totalPages', function ($resource) {
//     return $resource('http://localhost:3000/totalpages');
// });