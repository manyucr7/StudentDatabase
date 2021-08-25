app.controller('showData', function ($scope, $http,$location) {

    $scope.posts = [];
    $scope.p = [];
    let data = {};
    data.page = 0;
    data.limit = 5;
    $scope.currentPage = 1;
    $scope.itemPerPage = 5;
    $scope.totalItems = 0;
    // $scope.logout = function () {
    //     $http.get("http://localhost:3000/logout").then(function (response) {
    //         console.log(response);
    //     });
    //     $location.path("/login");
    // };
    
    $http.get('http://localhost:3000/totalpages', data).then(function (response) {
        $scope.p = response.data;
        $scope.totalItems = $scope.p.length;
    })
    $http.post('http://localhost:3000/posts', data).then(function (response) {
        if(response.data==''){
            $location.path("/");
        }
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
