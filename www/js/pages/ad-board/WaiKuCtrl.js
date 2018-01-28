var Controller = function (AD, $scope, $rootScope, $q, $http, Backend, $ionicPopup, XiaJia) {

    if ($rootScope.loginUser.groupId === '0') {
        $scope.noPermission = '用户班组未维护';
        return;
    }
    $scope.noPermission = null;
    $scope.criteria = {};

    function doQiangda(item) {
        XiaJia.qiangda('?queueId=' +item.ID+ '&userName='+$rootScope.loginUser.loginNme).then(function(data) {
            $scope.showAlert('抢答成功', true);
            $scope.loadList();
        }, function(message) {
            $scope.showAlert('抢答失败', false, message?message:'服务器异常');
        });
    }
    function doXiajia(item) {
        XiaJia.waiKuXiajia('?queueId=' +item.ID+ '&userName='+$rootScope.loginUser.loginNme).then(function(data) {
            $scope.showAlert('下架成功', true);
            $scope.loadList();
        }, function(message) {
            $scope.showAlert('下架失败', false, message?message:'服务器异常');
        });
    }

    // An alert dialog
    $scope.showAlert = function(msg, isSuccess, errorMsg) {
        var alertPopup = $ionicPopup.alert({
            template: '<div class="xiajia"><img src="./img/ad/off-' + isSuccess + '.jpg" />' + msg + '<span>' + (errorMsg ? errorMsg : '') + '</span></div>',
            okText: '知道了'
        });

        alertPopup.then(function() {});
    };

    $scope.showXiajia = function(item) {
        var confirmPopup;

        confirmPopup = $ionicPopup.confirm({
            scope: $scope,
            title: '确认下架',
            cancelText: '取消',
            okText: '确认',
            template: '<div class="member"><table><tr><td class="name">当前选择零件号：</td><td><span>' + item.itemCode + '</span></td></tr></table></div>'
        });

        confirmPopup.then(function(res) {
            if (res) {
                doXiajia(item);
            }
        });
    };
    $scope.showQiangda = function(item, isRevert) {
      var confirmPopup;

      confirmPopup = $ionicPopup.confirm({
          scope: $scope,
          title: '确认抢答',
          cancelText: '取消',
          okText: '确认',
          template: '<div class="member"><table><tr><td class="name">当前选择零件号：</td><td><span>' + item.itemCode + '</span></td></tr></table></div>'
      });

      confirmPopup.then(function(res) {
          if (res) {
              doQiangda(item);
          }
      });
    };
    $scope.tryRefresh = function(){
      if($scope.errorMsg === '加载中'){
        return false;
      }
      $scope.loadList();
    }
    $scope.loadList = function() {
        $scope.errorMsg = '加载中';
        $scope.itemMembers = [];
        var selectTarget = (!$scope.criteria.selectedTargetCangKu || $scope.criteria.selectedTargetCangKu.value==='全部')?0:$scope.criteria.selectedTargetCangKu.value;
        var selectDaoKou = (!$scope.criteria.selectedDaoKou || $scope.criteria.selectedDaoKou.value==='全部')?'':$scope.criteria.selectedDaoKou.value;

        XiaJia.getWaiKuList('?whseId=' +$rootScope.loginUser.whseId+ '&userName='+$rootScope.loginUser.loginNme+ '&destWhseId='+selectTarget+ '&shipCrossing=' +selectDaoKou).then(function(data) {
            $scope.errorMsg = null;

            if(data.cangku){
              data.cangku.unshift({
                name: '全部',
                value: '全部'
              })
            }
            if(data.daokou){
              data.daokou.unshift({
                name: '全部',
                value: '全部'
              })
            }
            if(!isEqual(data.cangku, $scope.cangku)){
              if(!$scope.cangku){
                $scope.criteria.selectedTargetCangKu =  data.cangku[0];
              }else{
                $scope.criteria.selectedTargetCangKu = findElem(data.cangku, $scope.criteria.selectedTargetCangKu);
              }

              $scope.cangku = data.cangku;
            }


            if(!isEqual(data.daokou, $scope.daokou)){
              if(!$scope.daokou){
                $scope.criteria.selectedDaoKou =  data.daokou[0];
              }else{
                $scope.criteria.selectedDaoKou = findElem(data.daokou, $scope.criteria.selectedDaoKou);
              }
              $scope.daokou = data.daokou;
            }
            $scope.itemMembers = data.data;
        }, function() {
            $scope.errorMsg = '加载失败';
        });
    };
    function findElem(array, elem){
      var i, len= array.length;
      for(i=0;i<len;i++){
        if(array[i].name === elem.name && array[i].name === elem.name ){
          return array[i];
        }
      }
      return null;
    }
    function isEqual(first, next){
      if(first === next){
        return true;
      }
      if(!first || !next){
        return false;
      }
      var fL = first.length, nL = next.length;
      if(fL!==nL){
        return false;
      }
      var idx;
      for(idx=0;idx<fL;idx++){
        if(first[idx].name !== next[idx].name){
          return false;
        }
        if(first[idx].value !== next[idx].value){
          return false;
        }
      }
      return true;
    }
    $scope.$on('$ionicView.enter', function() {
        $scope.errorMsg = '加载中';

        if ($rootScope.loginUser.groupId === '0') {
            $scope.noPermission = '用户班组未维护';
            return;
        }
        $scope.errorMsg = null;
        $scope.noPermission = null;
        $scope.loadList();
    });

};

module.exports = ['AD', '$scope', '$rootScope', '$q', '$http', 'Backend', '$ionicPopup', 'XiaJia', Controller];
