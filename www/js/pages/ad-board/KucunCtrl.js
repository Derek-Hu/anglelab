var Controller = function ($scope, localStorageService, $state, $stateParams, $http, $rootScope, Backend) {
    $scope.itemCode = $stateParams.itemCode;

    function loadList(params) {
        $scope.loadingStatus = '加载中';
        $scope.data = [];
        $http({
            method: 'GET',
            url: Backend().kucunListURL + '?itemCode=' + $scope.itemCode + '&whseId=' + $rootScope.loginUser.whseId
        }).
        success(function (data, status, headers, config) {
            $scope.loadingStatus = '';
            if (data && Object.prototype.toString.call(data) === '[object Array]') {
                $scope.data = data;
                if (!$scope.data.length) {
                    $scope.loadingStatus = '暂无数据';
                }
            } else {
                $scope.data = [];
                $scope.loadingStatus = (data && data.respCode) ? data.respCode : '加载失败';
            }
        }).
        error(function (data, status, headers, config) {
            $scope.loadingStatus = '加载失败';
            $scope.data = [];
        });
    }
    $scope.loadList = loadList;
    $scope.$on('$ionicView.enter', function (e) {
        loadList();
    });
};

module.exports = ['$scope', 'localStorageService', '$state', '$stateParams', '$http', '$rootScope', 'Backend', Controller];
