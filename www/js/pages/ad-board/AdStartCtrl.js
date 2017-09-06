var Controller = function ($scope, $state, $http, Backend, $rootScope, $ionicPopup, $interval) {

    var seconds = 185000;
    var timer = false;

    // An alert dialog
    $scope.showAlert = function (msg, isSuccess, errorMsg) {
        var alertPopup = $ionicPopup.alert({
            template: '<div class="xiajia"><img src="./img/ad/off-' + isSuccess + '.jpg" />' + msg + '<span>' + (errorMsg ? errorMsg : '') + '</span></div>',
            okText: '知道了'
        });

        alertPopup.then(function () {});
    };

    $scope.start = function (item) {
        if (item.txt === '上线中') {
            return;
        }
        item.txt = '上线中';

        $http({
            method: 'GET',
            /*eslint-disable*/
            url: Backend().startActionURL +
                '?epsSupplyId=' + item.epsSupplyId +
                '&whseId=' + $rootScope.loginUser.whseId +
                '&whseName=' + $rootScope.loginUser.whseCode +
                '&userName=' + $rootScope.loginUser.loginNme +
                '&factoryCode=' + $rootScope.loginUser.factoryCode +
                '&zoneId=' + $rootScope.loginUser.zoneId
        }).
        success(function(data) {
            if (data && data.respCode === 'success') {
                $scope.showAlert('上线成功', true);
                $scope.getList();
            } else {
                $scope.showAlert('上线失败', false, (data && data.respCode) ? data.respCode : null);
            }
        }).
        error(function() {
            $scope.showAlert('上线失败', false, '服务器异常');
        });
    };

    $scope.getList = function() {
        $scope.errorMsg = '加载中';
        $scope.menus = [];
        $http({
            method: 'GET',
            /*eslint-disable*/
            url: Backend().startListURL + '?whseId=' + $rootScope.loginUser.whseId + '&userName=' + $rootScope.loginUser.loginNme
        }).
        success(function(data) {

            if(!timer){
              timer = $interval(function() {
                $scope.getList();
              }, seconds);
            }

            $scope.errorMsg = null;
            if (data && Object.prototype.toString.call(data) === '[object Array]') {
                $scope.menus = data;
                if (!data.length) {
                    $scope.errorMsg = '暂无数据';
                }
                $scope.menus = $scope.menus.map(function(d) {
                    d.txt = '上线';
                    return d;
                });
            } else {
                $scope.menus = [];
                $scope.errorMsg = (data && data.respCode) ? data.respCode : '加载失败';
            }
        }).
        error(function(data, status, headers, config) {
            if(!timer){
              timer = $interval(function() {
                  $scope.getList();
              }, seconds);
            }

            $scope.menus = [];
            $scope.errorMsg = '加载失败';
        });
    };
    $scope.$on('$ionicView.enter', function() {
        $scope.getList();
    });
};

module.exports = ['$scope', '$state', '$http', 'Backend', '$rootScope', '$ionicPopup', '$interval', Controller];
