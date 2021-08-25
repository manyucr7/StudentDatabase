app.controller("signUpData", function ($scope, $http, $location) {
    $scope.gname = "";
    $scope.pw = "";
    //password
    console.log(gname.value, pw.value)
    //show
    $scope.sendTheData = function () {
        let data = {
            gname: gname.value,
            pw: pw.value,
        };
        //post data on signup
        $http.post("http://localhost:3000/signup", data).then(res => {
            if (res.data.usr) {
                console.log(res.data.usr);
                $location.path('/login');
            }
        })

    };
});