app.controller('showSchoolData', function ($scope,logoutService,rolex, $http, $location, $uibModal, $rootScope) {
    if (!document.cookie) {
        $location.path('/');
        console.log('Unauthorized User');
    }
    $scope.logout = function () {
        logoutService.logout();
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