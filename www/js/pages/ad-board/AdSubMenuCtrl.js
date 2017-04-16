var Controller = function ($scope, localStorageService, $state) {

    $scope.$on('$ionicView.enter', function () {
        $scope.menuConfig = {
            off: {
                name: '下架',
                enName: 'off the shelf',
                show: false
            },
            start: {
                name: '上线',
                enName: 'on-line',
                show: false
            },
            pull: {
                name: '拉动',
                enName: 'kick-start',
                show: false
            },
            member: {
                name: '人员调整',
                enName: 'turnover',
                show: false
            }
        };
        $scope.menus = Object.keys($scope.menuConfig);
        var loginUser = localStorageService.get('loginUser');
        var permssions, i, len;

        if (!loginUser) {
            $state.go('ad-login');
            return;
        }
        permssions = loginUser.permssionMap.AD;

        for (i = 0, len = permssions.length; i < len; i++) {
            $scope.menuConfig[permssions[i]].show = true;
        }
    });

};

module.exports = ['$scope', 'localStorageService', '$state', Controller];
