app.controller('bigData', function ($scope,logoutService, $http, $location, rolex) {
    $scope.fname = '';
    $scope.maths = undefined;
    $scope.english = undefined;
    $scope.hindi = undefined;
    $scope.science = undefined;
    $scope.french = undefined;
    $scope.cgpa = undefined;
    $scope.school = '';
    $scope.val = '';
    $scope.array = '';
    $scope.array2 = '';
    $scope.city = '';
    $scope.isCollapsed = false;
    rolex.getRole();
    $scope.logout = function () {
        logoutService.logout();
    }
    $http.get('http://localhost:3000/getSchool')
        .then(response => {
            $scope.school = response.data;
        }).catch(function (err) {
            console.log(err)
        });
    $http.get('http://localhost:3000/city')
        .then(response => {
            $scope.city = response.data;
        }).catch(function (err) {
            console.log(err)
        });
    $scope.schoolfunc = function () {
        if (school.value) {
            let queryy = { name: school.value }
            $http.post('http://localhost:3000/myposts', queryy).then(function (response) {
                $scope.val = response.data;
            }).catch(err => {
                console.log(err);
            })
        }
    }
    $scope.top3india = function () {
        $http.post('http://localhost:3000/topindia').then(function (response) {
            $scope.array = response.data;
        }).catch(err => {
            console.log(err);
        })
    }
    $scope.top3city = function () {
        let queryy = { name: city.value };
        $http.post('http://localhost:3000/topcity', queryy).then(function (response) {
            $scope.array2 = response.data;
        }).catch(err => {
            console.log(err);
        })
    }
    $scope.val2 = '';
    $scope.calc=function(){
        $scope.sum= ((Number(maths.value)+Number(english.value)+Number(hindi.value)+Number(science.value)+Number(french.value))/50);
        $scope.cgpa=$scope.sum;
    }
    $scope.consoleData = function () {
        $scope.info = [];
        var data = {
            school: school.value
        }
        $http.post('/info', { data }).then(function (data) {
            $scope.info.push(data);
        }).catch(function (err) {
            console.log(err)
        })

        let qwerty = {
            name: fname.value,
            maths: maths.value,
            english: english.value,
            hindi: hindi.value,
            science: science.value,
            french: french.value,
            school: school.value,
            cgpa: cgpa.value
        }
        if (fname.value.length >= 3 && Number(maths.value)<=100 && Number(maths.value) >= 0 && Number(english.value)<=100 && Number(english.value) >= 0 && Number(hindi.value)<=100 && Number(hindi.value) >= 0 && Number(french.value)<=100 && Number(french.value) >= 0 && Number(science.value)<=100 && Number(science.value)>= 0) {
            console.log(qwerty);
            $http.post('http://localhost:3000/create', qwerty).then(function (response) {
                console.log(response)
                $location.path('/show');
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            alert("Invalid Data")
            console.log('Invalid Data')
            return;
        }

    }
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.options = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.options.minDate = $scope.options.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
})