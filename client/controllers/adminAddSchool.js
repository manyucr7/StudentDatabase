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