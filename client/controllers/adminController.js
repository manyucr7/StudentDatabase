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
})