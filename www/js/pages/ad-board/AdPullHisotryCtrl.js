var Controller = function ($scope, $http, Backend, $rootScope) {

    $scope.getList = function () {
        $scope.errorMsg = '加载中';
        $scope.menus = [];
        $http({
            method: 'GET',
            /*eslint-disable*/
            url: Backend().pullHistoryURL + '?whseId=' + $rootScope.loginUser.whseId + '&userName=' + $rootScope.loginUser.loginNme
        }).
        success(function (data) {
            if (data && Object.prototype.toString.call(data) === '[object Array]') {
                $scope.menus = data;
                $scope.errorMsg = null;
                if (!data.length) {
                    $scope.errorMsg = '暂无数据';
                }
            } else {
                $scope.menus = [];
                $scope.errorMsg = (data && data.respCode) ? data.respCode : '暂无数据';
            }
        }).
        error(function () {
            $scope.menus = [];
            $scope.errorMsg = '加载失败';
        });
    };
    $scope.$on('$ionicView.enter', function () {
        $scope.getList();
    });

};

module.exports = ['$scope', '$http', 'Backend', '$rootScope', Controller];
