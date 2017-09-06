var Controller = function ($ionicActionSheet, $scope, XiaJia, localStorageService, $state, $ionicPopup, $rootScope, $timeout) {

    var seconds = 180000;
    var hasInterval = false;

    // An alert dialog
    $scope.showAlert = function (msg, isSuccess, errorMsg) {
        var alertPopup = $ionicPopup.alert({
            template: '<div class="xiajia"><img src="./img/ad/off-' + isSuccess + '.jpg" />' + msg + '<span>' + (errorMsg ? errorMsg : '') + '</span></div>',
            okText: '知道了',
          });

        alertPopup.then(function () {});
      };

    function showSelectKuwei(kuweis, item){
      var hideSheet = $ionicActionSheet.show({
         buttons: kuweis.map(function(kw){
           return {text: kw.locCode+'('+kw.locId+')'}
         }),
         titleText: '选择零件'+item.itemCode+'上架库位',
         cancelText: '取消',
         cancel: function() {
              // add cancel code..
        　},
         buttonClicked: function(index) {
           _shangjiaWithKuwei(kuweis[index].locId, item);
           return true;
         }
       });
    }
    function _shangjiaWithKuwei(locId, item){
      XiaJia.shangjiaWithKuwei('?shiftId=' + item.id + '&userName=' + $scope.loginUser.loginNme + '&locId=' + locId).then(function () {
            $scope.showAlert('上架成功', true);
            $scope.loadList();
        }).catch(function (errorMsg) {
          $scope.showAlert('上架失败', false, errorMsg);
          item.txt = '上架';
        });
    }

    $scope.off = function (item) {
        item.txt = '上架中';
        XiaJia.shangjia('?shiftId=' + item.id + '&userName=' + $scope.loginUser.loginNme + '&epsSupplyId=' + item.id).then(function (kuweis) {
            if(!kuweis){
              $scope.showAlert('上架成功', true);
              $scope.loadList();
            }else{
              showSelectKuwei(kuweis, item);
            }
          }).catch(function (errorMsg) {
            $scope.showAlert('上架失败', false, errorMsg);
            item.txt = '上架';
          });
      };

    $scope.loadList = function () {
        $scope.loadingStatus = '加载中';
        $scope.data = [];

        XiaJia.getOnList('?whseId=' + $rootScope.loginUser.whseId + '&userName=' + $scope.loginUser.loginNme).then(function (data) {

            if(!hasInterval){
              $timeout(function () {
                  $scope.loadList();
                }, seconds);

              hasInterval = true;
            }

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

            if(!hasInterval){
              $timeout(function () {
                  $scope.loadList();
                }, seconds);

              hasInterval = true;
            }

          });
      };

    $scope.$on('$ionicView.enter', function () {
        $scope.loadList();
      });

  };

module.exports = ['$ionicActionSheet', '$scope', 'XiaJia', 'localStorageService', '$state', '$ionicPopup', '$rootScope', '$timeout', Controller];
