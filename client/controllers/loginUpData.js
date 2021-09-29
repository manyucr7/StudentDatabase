app.controller("loginUpData", function ($scope, serviceX) {
    $scope.gname = "";
    $scope.pw = "";
    $scope.sendingTheData = serviceX.loginData;
});