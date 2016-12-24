var Controller = function($scope, Backend, $rootScope, $http) {

    $scope.getList = function() {
        $scope.errorMsg = '加载中';
        $http({
            method: 'GET',
            url: Backend().pullListURL + '?userId=' + $rootScope.loginUser.userId
        }).
        success(function(data, status, headers, config) {
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
        error(function(data, status, headers, config) {
            $scope.menus = [];
            $scope.errorMsg = '加载失败';
        });
    };

    $scope.$on('$ionicView.enter', function(e) {
        $scope.getList();
    });

};

module.exports = ['$scope', 'Backend', '$rootScope', '$http', Controller];
