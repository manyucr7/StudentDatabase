app.controller("signUpData", function ($scope,serviceX) {
    $scope.gname = "";
    $scope.pw = "";
    console.log(gname.value, pw.value)
    $scope.sendTheData = serviceX.signUp;
});