var Controller = function ($scope, XiaJia, localStorageService, $state, $ionicPopup, $rootScope, $timeout) {

    var seconds = 120000;

    // An alert dialog
    $scope.showAlert = function (msg, isSuccess, errorMsg) {
        var alertPopup = $ionicPopup.alert({
            template: '<div class="xiajia"><img src="./img/ad/off-' + isSuccess + '.jpg" />' + msg + '<span>' + (errorMsg ? errorMsg : '') + '</span></div>',
            okText: '知道了',
          });

        alertPopup.then(function () {});
      };

    $scope.off = function (item) {
        item.txt = '上架中';
        XiaJia.shangjia('?shiftId=' + item.id + '&userName=' + $scope.loginUser.loginNme + '&epsSupplyId=' + item.id).then(function () {
            $scope.showAlert('上架成功', true);
            $scope.loadList();
          }).catch(function (errorMsg) {
            $scope.showAlert('上架失败', false, errorMsg);
            item.txt = '上架';
          });
      };

    $scope.loadList = function () {
        $scope.loadingStatus = '加载中';
        $scope.data = [];

        XiaJia.getOnList('?whseId=' + $rootScope.loginUser.whseId + '&userName=' + $scope.loginUser.loginNme).then(function (data) {
            $timeout(function () {
                $scope.loadList();
              }, seconds);

            $scope.loadingStatus = '';
            $scope.data = data;
            if (!$scope.data.length) {
              $scope.loadingStatus = '暂无数据';
              return;
            }

            $scope.data = $scope.data.map(function (d) {
                d.txt = '上架';
                return d;
              });

          }, function () {

            $scope.loadingStatus = '加载失败';
            $scope.data = [];

            $timeout(function () {
                $scope.loadList();
              }, seconds);
          });
      };

    $scope.$on('$ionicView.enter', function () {
        $scope.loadList();
      });

  };

module.exports = ['$scope', 'XiaJia', 'localStorageService', '$state', '$ionicPopup', '$rootScope', '$timeout', Controller];
