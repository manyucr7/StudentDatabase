app.controller("loginUpData", function ($scope,serviceX) {
    $scope.gname = "";
    $scope.pw = "";
    console.log(gname.value, pw.value);
    $scope.sendingTheData =serviceX.loginData;
});