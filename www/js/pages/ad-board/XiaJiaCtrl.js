var Controller = function ($scope, XiaJia, localStorageService, $state, $ionicPopup, $rootScope, $interval) {

    var seconds = 185000;
    var timer = false;

    // An alert dialog
    $scope.showAlert = function (msg, isSuccess, errorMsg) {
        var alertPopup = $ionicPopup.alert({
            template: '<div class="xiajia"><img src="./img/ad/off-' + isSuccess + '.jpg" />' + msg + '<span>' + (errorMsg ? errorMsg : '') + '</span></div>',
            okText: '知道了',
          });

        alertPopup.then(function () {});
      };

    $scope.off = function (item) {
        item.txt = '下架中';
        XiaJia.xiajia('?epsSupplyId=' + item.id + '&userName=' + $scope.loginUser.loginNme).then(function () {
            $scope.showAlert('下架成功', true);
            $scope.loadList();
          }).catch(function (errorMsg) {
            $scope.showAlert('下架失败', false, errorMsg);
            item.txt = '下架';
          });
      };

    $scope.loadList = function () {
        $scope.loadingStatus = '加载中';
        $scope.data = [];

        XiaJia.getList('?whseId=' + $rootScope.loginUser.whseId + '&userName=' + $scope.loginUser.loginNme).then(function (data) {

            if(!timer){
              timer = $interval(function () {
                  $scope.loadList();
                }, seconds);
            }

            $scope.loadingStatus = '';
            $scope.data = data;
            if (!$scope.data.length) {
              $scope.loadingStatus = '暂无数据';
              return;
            }

            $scope.data = $scope.data.map(function (d) {
                d.txt = '下架';
                return d;
              });

          }, function () {

            $scope.loadingStatus = '加载失败';
            $scope.data = [];

            if(!timer){
              timer = $interval(function () {
                  $scope.loadList();
                }, seconds);
            }

          });
      };

    $scope.$on('$ionicView.enter', function () {
        $scope.loadList();
      });

  };

module.exports = ['$scope', 'XiaJia', 'localStorageService', '$state', '$ionicPopup', '$rootScope', '$interval', Controller];
