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