app.controller('showData', function ($scope, $http, $location,rolex) {
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
    rolex.getRole();
    $scope.posts = [];
    $scope.p = [];
    let data = {};
    data.page = 0;
    data.limit = 5;
    $scope.currentPage = 1;
    $scope.itemPerPage = 5;
    $scope.totalItems = 0;
    // if (!document.cookie) {
    //     $location.path('/');
    //     console.log('Unauthorized User')
    // }
    $http.get('http://localhost:3000/totalpages', data).then(function (response) {
        $scope.p = response.data;
        $scope.totalItems = $scope.p.length;
    })
    $http.post('http://localhost:3000/posts', data).then(function (response) {
        $scope.posts = response.data;
    })
    $scope.numPages = Math.ceil($scope.totalItems / $scope.itemPerPage);

    $scope.pagenation = function () {
        data.page = $scope.currentPage - 1;
        $http.post('http://localhost:3000/posts', data).then(function (response) {
            $scope.posts = response.data;
        })
    }
    $scope.pagenation();
    $scope.pageChange = function () {
        $scope.pagenation();
    }

})
