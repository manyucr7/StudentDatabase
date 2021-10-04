app.controller('showData', function ($scope, $http, $location,logoutService,rolex,) {
    $scope.isCollapsed = false;
    $.bootstrapGrowl("logged in :)", {
        ele: 'body',
        type: 'success',
        offset: { from: 'top', amount: 20 },
        align: 'right',
        width: 250,
        delay: 2500,
        allow_dismiss: true,
        stackup_spacing: 10
    });
    $scope.logout = function () {
        logoutService.logout();
    }
    rolex.getRole();
    $scope.posts = [];
    $scope.p = [];
    let data = {};
    data.page = 0;
    data.limit = 10;
    $scope.currentPage = 1;
    $scope.itemPerPage = 10;
    $scope.totalItems = 0;
    $http.get('http://localhost:3000/totalpages', data).then(function (response) {
        $scope.p = response.data;
        $scope.totalItems = $scope.p.length;
    }).catch(function (err) {
        console.log(err)
    });
    $http.post('http://localhost:3000/posts', data).then(function (response) {
        $scope.posts = response.data;
    }).catch(function (err) {
        console.log(err)
    });
    $scope.numPages = Math.ceil($scope.totalItems / $scope.itemPerPage);

    $scope.pagenation = function () {
        data.page = $scope.currentPage - 1;
        $http.post('http://localhost:3000/posts', data).then(function (response) {
            $scope.posts = response.data;
        }).catch(function (err) {
            console.log(err)
        })
    }
    $scope.pagenation();
    $scope.pageChange = function () {
        $scope.pagenation();
    }

})
