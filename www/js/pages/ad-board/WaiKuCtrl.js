var Controller = function (AD, $scope, $rootScope, $q, $http, Backend, $ionicPopup, XiaJia) {

    if ($rootScope.loginUser.groupId === '0') {
        $scope.noPermission = '用户班组未维护';
        return;
    }
    $scope.noPermission = null;

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
    $scope.loadItems = function(selectedMemeber) {
        if (selectedMemeber) {
            $scope.loadingItems = '加载中';
            $scope.itemMembers = [];
            $scope.loadItemMembers(selectedMemeber).then(function(data) {
                $scope.loadingItems = null;
                if (!data || !data.length) {
                    $scope.loadingItems = '暂无数据';
                    return;
                }

                $scope.itemMembers = data.map(function(elem) {
                    elem.txt = (elem.firstUser === elem.lastUser) ? '修改' : '还原';
                    return elem;
                });
            }, function() {
                $scope.loadingItems = '加载失败';
            });
        }
    };
    $scope.loadList = function() {
        $scope.errorMsg = '加载中';
        $scope.itemMembers = [];
        var selectTarget = (!$scope.selectedTargetCangKu || $scope.selectedTargetCangKu==='全部')?0:$scope.selectedTargetCangKu;
        var selectDaoKou = (!$scope.selectedDaoKou || $scope.selectedDaoKou==='全部')?'':$scope.selectedDaoKou;

        XiaJia.getWaiKuList('?whseId=' +$rootScope.loginUser.whseId+ '&userName='+$rootScope.loginUser.loginNme+ '&destWhseId='+selectTarget+ '&shipCrossing=' +selectDaoKou).then(function(data) {
            $scope.errorMsg = null;

            $scope.itemMembers = data.data;
        }, function() {
            $scope.errorMsg = '加载失败';
        });
    };
    $scope.loadItemMembers = function(member) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            /*eslint-disable*/
            url: Backend().adMemberURL + '?groupId=' + $rootScope.loginUser.groupId + (member ? ('&lastUser=' + member.id) : '')
        }).
        success(function(data) {
            if (data && Object.prototype.toString.call(data) === '[object Array]') {
                deferred.resolve(data);
            } else {
                deferred.reject(null);
            }
        }).
        error(function() {
            deferred.reject(null);
        });
        return deferred.promise;
    };
    $scope.modifyMember = function(item) {
        var isRevert;

        // 修改中, 还原中
        if (item.txt.indexOf('中') !== -1) {
            return;
        }
        // 还原中
        isRevert = (item.firstUser !== item.lastUser);

        if (isRevert) {
            doModify(item, item.firstUser, isRevert);
        } else {
            $scope.showModifyMember(item, isRevert);
        }
    };

    $scope.getMembers = function() {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            /*eslint-disable*/
            url: Backend().adAllMemberURL + '?groupId=' + $rootScope.loginUser.groupId
        }).
        success(function(data) {
            if (data && Object.prototype.toString.call(data) === '[object Array]') {
                deferred.resolve(data);
            } else {
                deferred.reject(null);
            }
        }).
        error(function() {
            deferred.reject(null);
        });
        return deferred.promise;
    };
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
