
app.controller("loginUpData", function ($scope, $http, $location) {
    $scope.gname = "";
    $scope.pw = "";
    console.log(gname.value, pw.value);
    $scope.sendingTheData = function () {
        let data = {
            gname: gname.value,
            pw: pw.value,
        }
        $http.post("http://localhost:3000/login", data).then(res => {
            console.log(res);
            if (res.data.user) {
                console.log(res.data.user);
                $location.path('/show');
            }
        })

    };
});