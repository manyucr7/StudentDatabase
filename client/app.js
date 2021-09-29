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
                console.log('ERROR 401')
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
app.controller('adminAddSchool', function ($http, $scope, $location, $uibModalInstance, $rootScope) {
    $scope.removeDuplicate = function (arr) {
        $scope.uniqueNames = [];
        arr.forEach((val, i, arr) => {
            if (!$scope.uniqueNames.includes(val)) {
                $scope.uniqueNames.push(val);
            }
        });
        return $scope.uniqueNames
    }
    $scope.getregionname = function () {
        $scope.regionarray = [];
        var data = {
            my: "my"
        }
        $http.post('/getRegion', { data }).then(function (data) {
            for (let i = 0; i < data.data.length; i++) {
                $scope.regionarray.push(data.data[i].region)
            }
            $scope.regionarray = $scope.removeDuplicate($scope.regionarray)
        }).catch(function (err) {
            console.log(err)
        })
    }
    $scope.getregionname();
    $scope.getCity = function (region) {
        $scope.cityarray = [];
        var data = {
            region: region
        }
        $http.post('/getCity', { data }).then(function (data) {

            for (let i = 0; i < data.data.length; i++) {
                $scope.cityarray.push(data.data[i].city)
            }
            $scope.cityarray = $scope.removeDuplicate($scope.cityarray)
        }).catch(function (err) {
            console.log(err)
        })
    };
    $scope.getArea = function (city) {

        $scope.areaarray = [];
        var data = {
            city: city
        }
        $http.post('/getarea', { data }).then(function (data) {

            for (let i = 0; i < data.data.length; i++) {
                $scope.areaarray.push(data.data[i].area)
            }
            $scope.areaarray = $scope.removeDuplicate($scope.areaarray)
        }).catch(function (err) {
            console.log(err)
        })
    }
    $scope.myfunc = function () {
        let qwerty = {
            school: school.value,
            city: city.value,
            region: region.value,
            area: area.value
        }
        if (school.value.length >= 1 && city.value.length >= 1) {
            console.log(qwerty);
            $http.post('http://localhost:3000/sendSchool', qwerty).then(function (response) {
                console.log(response);
                $rootScope.update();
            }).catch(err => {
                console.log(err);
            })
        }

        $uibModalInstance.close('save');
    };
    $scope.close = function () {
        console.log("cancel");
        $uibModalInstance.result.catch(function () { $uibModalInstance.close(); });
        $uibModalInstance.dismiss('close');
    }
});
app.controller('showSchoolData', function ($scope, rolex, $http, $location, $uibModal, $rootScope) {
    if (!document.cookie) {
        $location.path('/');
        console.log('Unauthorized User');
    }
    rolex.getRole();
    $scope.isCollapsed = false;
    $scope.showPopup = function () {
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "../views/addData.html",
            controller: 'adminAddData',
            controllerAs: '$ctrl',
            size: 'lg'
        });
    }
    $scope.addschool = function () {
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: "../views/addSchool.html",
            controller: 'adminAddSchool',
            controllerAs: '$ctrl',
            size: 'lg'
        });

    };
    $scope.schools = [];
    $rootScope.update = function () {
        $scope.schools = [];
        $http.get('http://localhost:3000/showSchool').then(function (response) {
            $scope.schools = response.data;
        }).catch(err => {
            console.log(err);
        });
    };
    $rootScope.update();
});
app.controller('myCtrl', function ($scope, $http, $location) {

    $scope.logout = function () {

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

                if (marks >= 4.0 && marks <= 10.0) // correct value
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
app.controller('adminController', function ($scope, $http, $location, rolex) {
    $scope.gname = "";
    $scope.pw = "";
    localStorage.setItem('roles', "admin");
    rolex.getRole();
    console.log(gname.value, pw.value)
    $scope.sendingTheData = function () {
        let url = "http://localhost:3000/adminlogin";
        let data = {
            gname: gname.value,
            pw: pw.value,
        }
        $http.post(url, data).then(res => {
            if (res.data.user) {
                console.log(res.data.user);
                $location.path('/showSchool');
            }
        }).catch(err => {
            if (err.data.message == "invalid") {
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
        })
    }
    $scope.sendTheData = function () {
        console.log("signup")
        let url = "http://localhost:3000/adminsignup";
        let data = {
            gname: gname.value,
            pw: pw.value,
        }
        $http.post(url, data).then(res => {
            console.log(res);
            if (res.data.usr) {
                console.log(res.data.usr);
                $location.path('/adminlogin');
            }
        }).catch(err => {
            console.log(err);
        })
    };
});
app.controller('adminAddData', function ($scope, $rootScope, $http, $location, $uibModalInstance) {
    if (!document.cookie) {
        $location.path('/');
        console.log('Unauthorized User')
    }

    $scope.myfunc = function () {
        let qwerty = {
            city: city.value,
            region: region.value,
            area: area.value
        }
        if (city.value.length >= 1) {
            console.log(qwerty);
            $http.post('http://localhost:3000/send', qwerty).then(function (response) {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
        }
        $rootScope.update();
        $uibModalInstance.close('save');
    };
    $scope.close = function () {
        console.log("cancel");
        $uibModalInstance.result.catch(function () { $uibModalInstance.close(); });
        $uibModalInstance.dismiss('close');
    }
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
            if (err.data.message == "invalid") {
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