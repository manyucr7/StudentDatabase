app.controller('bigData', function ($scope, $http,$location) {
    $scope.fname = '';
    $scope.branch = '';
    $scope.marks = 0;
    $scope.school = '';
    $scope.place = '';
    $scope.val = '';
    if(!document.cookie){
        $location.path('/');
        console.log('Unauthorized User')
    }
    $scope.branchfunc = function () {
        if (query.value) {
            let queryy = { name: query.value }

            $http.post('http://localhost:3000/myposts', queryy).then(function (response) {
                $scope.val = response.data;
            }).catch(err => {
                console.log(err);
            })
        }
    }
    $scope.val2 = '';
    $scope.placefunc = function () {
        if (query2.value) {
            let quer = { name: query2.value }
            $http.post('http://localhost:3000/place', quer).then(function (response) {
                $scope.val2 = response.data;
            }).catch(err => {
                console.log(err);
            })
        }

    }
    $scope.seed = function () {
        for (let loop = query3.value; loop > 0; loop--) {
            let n = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let charactersLength = characters.length;
            let x = Math.floor(Math.random() * 6 + 5);
            for (let i = 0; i < x; i++) {
                n += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            let rnd = Math.floor(Math.random() * 3);
            let rnd2 = Math.floor(Math.random() * 5);
            let rnd3 = Math.floor(Math.random() * 4);
            let m = Math.floor(Math.random() * 100) + 1;
            let b = ["cse", "ece", "csd"];
            let s = ["DPS RK Puram", "DPS Nangloi", "DPS Krishna Nagar", "Sr, Sec GOVT. School", "The Doon School"];
            let p = ["north", "south", "east", "west"];
            let query = {
                name: n,
                branch: b[rnd],
                marks: m,
                school: s[rnd2],
                place: p[rnd3]
            };
            console.log(query);
            $http.post('http://localhost:3000/seed', query).then(function (response) {
                console.log(response)
            }).catch(err => {
                console.log(err);
            })
        }

    }
    $scope.consoleData = function () {
        let qwerty = {
            name: fname.value,
            branch: branch.value,
            marks: marks.value,
            school: school.value,
            place: place.value
        }
        if (fname.value.length >= 1 && branch.value.length >= 1) {

            console.log(qwerty);
            $http.post('http://localhost:3000/create', qwerty).then(function (response) {
                console.log(response)
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            return;
        }

    }
})