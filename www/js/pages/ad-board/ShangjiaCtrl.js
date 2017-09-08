var Controller = function ($ionicModal, $scope, XiaJia, localStorageService, $state, $ionicPopup, $rootScope, $interval) {

    var seconds = 185000;
    var timer = null;

    // An alert dialog
    $scope.showAlert = function (msg, isSuccess, errorMsg) {
        var alertPopup = $ionicPopup.alert({
            template: '<div class="xiajia"><img src="./img/ad/off-' + isSuccess + '.jpg" />' + msg + '<span>' + (errorMsg ? errorMsg : '') + '</span></div>',
            okText: '知道了',
          });

        alertPopup.then(function () {});
      };
      var alertPopup;

    function showSelectKuwei(kuweis, item){
      if(timer){
        $interval.cancel(timer);
        timer = null;
      }

      $scope._kuweis = kuweis;
      $scope._selectedItme = item;
      alertPopup = $ionicPopup.alert({
          template: `
            <div class="">
              <div ng-repeat="k in _kuweis" ng-click="_shangjiaWithKuwei(k.locId, _selectedItme);" class="list card">
                <div><div>
                  <span class="first" ng-bind="k.locCode"></span>
                  <span ng-bind="k.locId"></span>
                </div></div>
              </div>
            </div>

          `,
          cssClass: 'shangjiaSelectKuwei',
          title: '选择零件'+item.itemCode+'上架库位',
          scope: $scope,
          buttons: [
            { text: '取消',type: 'button-positive',
              onTap: function(e) {
                item.txt = '上架';
              }
             }
          ]
        });

      alertPopup.then(function () {});

      // var hideSheet = $ionicModal.show({
      //    buttons: kuweis.map(function(kw){
      //      return {text: kw.locCode+'('+kw.locId+')'}
      //    }),
      //    titleText: '选择零件'+item.itemCode+'上架库位',
      //    cancelText: '取消',
      //    cancel: function() {
      //      if(!timer){
      //        timer = $interval(function () {
      //            $scope.loadList();
      //          }, seconds);
      //      }
      //   　},
      //    buttonClicked: function(index) {
      //      _shangjiaWithKuwei(kuweis[index].locId, item);
      //      return true;
      //    }
      //  });
    }
    function _shangjiaWithKuwei(locId, item){
      XiaJia.shangjiaWithKuwei('?shiftId=' + item.id + '&userName=' + $scope.loginUser.loginNme + '&locId=' + locId).then(function () {
            $scope.showAlert('上架成功', true);
            alertPopup&&alertPopup.close();
            $scope.loadList();
        }).catch(function (errorMsg) {
          $scope.showAlert('上架失败', false, errorMsg);
          item.txt = '上架';

          if(!timer){
            timer = $interval(function () {
                $scope.loadList();
              }, seconds);
          }

        });
    }

    $scope._shangjiaWithKuwei = _shangjiaWithKuwei;
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
                d.txt = '上架';
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

module.exports = ['$ionicModal', '$scope', 'XiaJia', 'localStorageService', '$state', '$ionicPopup', '$rootScope', '$interval', Controller];
