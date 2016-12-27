var Controller = function (AD, $scope, $rootScope, $q, $http, Backend, $ionicPopup) {

    if ($rootScope.loginUser.groupId === '0') {
        $scope.noPermission = '用户班组未维护';
        return;
    }
    $scope.noPermission = null;

    function doModify(item, lastName, isRevert) {
        item.txt = item.txt + '中';
        var typeMsg = isRevert ? '还原' : '修改';

        $http({
            method: 'GET',
            /*eslint-disable*/
            url: Backend().adModifyMemberURL + '?id=' + item.id + '&lastName=' + lastName + '&userName=' + $rootScope.loginUser.loginNme
        }).
        success(function(data) {
            item.txt = item.txt.replace('中', '');
            if (data && data.respCode === 'success') {
                $scope.showAlert(typeMsg + '成功', true);
                $scope.loadList();
            } else {
                $scope.showAlert(typeMsg + '失败', false, (data && data.respCode) ? data.respCode : '服务器异常');
            }
        }).
        error(function() {
            item.txt = item.txt.replace('中', '');
            $scope.showAlert(typeMsg + '失败', false, '服务器异常');
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

    $scope.showModifyMember = function(item, isRevert) {
        var htmlSelect = '<select id="memberSelection">';
        var i, len;
        var confirmPopup;

        for (i = 0, len = $scope.members.length; i < len; i++) {
            htmlSelect += '<option value="' + $scope.members[i] + '">' + $scope.members[i] + '</option>';
        }
        htmlSelect += '</selct>';
        confirmPopup = $ionicPopup.confirm({
            scope: $scope,
            title: '人员修改',
            cancelText: '取消',
            okText: '确认',
            template: '<div class="member"><table><tr><td class="name">当前选择零件号：</td><td><span>' + item.itemCode + '</span></td></tr><tr><td class="name">人员：</td><td>' + htmlSelect + '</td></tr></table></div>'
        });

        confirmPopup.then(function(res) {
            if (res) {
                doModify(item, document.getElementById('memberSelection').value, isRevert);
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
        $q.all([
            $scope.loadItemMembers(),
            $scope.getMembers()
        ]).then(function(datas) {
            $scope.errorMsg = null;
            $scope.itemMembers = datas[0].map(function(elem) {
                elem.txt = (elem.firstUser === elem.lastUser) ? '修改' : '还原';
                return elem;
            });
            $scope.members = datas[1];
            $scope.membersObj = $scope.members.map(function(m) {
                return {
                    id: m,
                    name: m
                };
            });
            $scope.selectedMemeber = $scope.membersObj[0];
            if (!$scope.itemMembers.length) {
                $scope.errorMsg = '暂无数据';
            }
        }).catch(function() {
            $scope.errorMsg = '加载失败';
        });
    };
    $scope.loadItemMembers = function(member) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            /*eslint-disable*/
            url: Backend().adMemberURL + '?groupId=' + $rootScope.loginUser.groupId + (member ? ('&lastUserName=' + member.id) : '')
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

module.exports = ['AD', '$scope', '$rootScope', '$q', '$http', 'Backend', '$ionicPopup', Controller];
