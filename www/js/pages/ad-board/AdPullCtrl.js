var Controller = function($scope, $state, $http, Backend, $rootScope, $ionicPopup) {

    $scope.goPullHistory = function() {
        $state.go('ad-pull-hisotry');
    };
    $scope.goPullNick = function() {
        $state.go('ad-pull-nick');
    };
    // An alert dialog
    $scope.showAlert = function(msg, isSuccess, errorMsg) {
        var alertPopup = $ionicPopup.alert({
            template: '<div class="xiajia"><img src="./img/ad/off-' + isSuccess + '.jpg" />' + msg + '<span>' + (errorMsg ? errorMsg : '') + '</span></div>',
            okText: '知道了'
        });
        alertPopup.then(function(res) {
            // $scope.getList();
        });
    };
    $scope.showConfirmPull = function(item) {
        var confirmPopup = $ionicPopup.confirm({
            cancelText: '取消',
            okText: '确认',
            template: '<div class="xiajia"><img src="./img/ad/tip.png" /><div style="margin-bottom: 0.5em"><span style="margin:0;color: #333;">' + item.itemCode + '</span><span style="margin:0;color: #333;">' + item.routeCode + '</span><span style="margin:0;color: #333;">' + item.lsa + '</span><span style="margin:0;color: #333;">' + item.nickName + '</span></div>是否确认拉动？</div>',
        });
        confirmPopup.then(function(res) {
            if (res) {
                $scope.pull(item);
            }
        });
    };
    $scope.pull = function(item) {
        if ($scope.isPulling) {
            return;
        }
        item.isPulling = $scope.isPulling = true;
        $http({
            method: 'GET',
            url: Backend().pullActionURL +
                '?itemCode=' + item.itemCode +
                '&routeCode=' + item.routeCode +
                '&lsa=' + item.lsa +
                '&whseId=' + $rootScope.loginUser.whseId +
                '&zoneId=' + $rootScope.loginUser.zoneId +
                '&userName=' + $rootScope.loginUser.loginNme
        }).
        success(function(data, status, headers, config) {
            item.isPulling = $scope.isPulling = false;
            if (data && data.respCode === 'success') {
                $scope.showAlert('拉动成功', true);
                $scope.getList();
            } else {
                $scope.showAlert('拉动失败', false, data.respCode);
            }
        }).
        error(function(data, status, headers, config) {
            item.isPulling = $scope.isPulling = false;
            $scope.showAlert('拉动失败', false, '服务器异常');
        });
    };
    $scope.getList = function() {
        // $scope.errorMsg = '加载中';
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
            /*                    $scope.menus = [{
                                    itemCode: 'itemCode1',
                                    routeCode: 'routeCode2',
                                    lsa: 'lsa3',
                                    nickName: 'nickName4'
                                }];
                                return;*/

            $scope.menus = [];
            $scope.errorMsg = '加载失败';
        });
    };
    $scope.$on('$ionicView.enter', function(e) {
        $scope.getList();
    });
};

module.exports ['$scope', '$state', '$http', 'Backend', '$rootScope', '$ionicPopup', Controller];
