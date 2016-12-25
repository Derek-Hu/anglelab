var Controller = function ($scope, AD, $state, localStorageService) {

    $scope.params = {};
    $scope.login = function () {
        $scope.errorMsg = '';
        if (!$scope.params.name) {
            $scope.errorMsg = '请输入用户名';
            return;
        }
        if (!$scope.params.pwd) {
            $scope.errorMsg = '请输入密码';
            return;
        }
        AD.login($scope.params).then(function (data) {
            if (data.permssionMap.SFM && data.permssionMap.SFM.length && data.permssionMap.AD && data.permssionMap.AD.length) {
                $state.go('login-dashboard');
            } else if (data.permssionMap.SFM && data.permssionMap.SFM.length) {
                if (data.permssionMap.SFM.length === 1) {
                    if (data.permssionMap.SFM[0] === 'line') {
                        // 线板
                        $state.go('kpi-view-board');
                    } else if (data.permssionMap.SFM[0] === 'board') {
                        // 看板
                        $state.go('dash');
                    }
                } else if (data.permssionMap.SFM.length >= 2) {
                    $state.go('entry');
                }
            } else if (data.permssionMap.AD && data.permssionMap.AD.length) {
                if (data.permssionMap.AD.length === 1) {
                    $state.go('ad-' + data.permssionMap.AD[0]);
                } else if (data.permssionMap.AD.length >= 2) {
                    $state.go('ad-sub-permssion');
                }
            } else {
                $scope.errorMsg = '权限不足';
            }
        }, function (error) {
            if (!error) {
                $scope.errorMsg = '服务器异常';
                return;
            }

            if (error.respCode === 'unknow') {
                $scope.errorMsg = error.errorMsg;
            } else if (error.respCode === 500) {
                $scope.errorMsg = '服务器异常';
            } else if (error.respCode === 403) {
                $scope.errorMsg = '权限不足';
            }
        });
    };
    $scope.$on('$ionicView.enter', function () {
        $scope.errorMsg = '';
        localStorageService.set('loginUser', '');
        $scope.params.pwd = '';
    });

};

module.exports = ['$scope', 'AD', '$state', 'localStorageService', Controller];
