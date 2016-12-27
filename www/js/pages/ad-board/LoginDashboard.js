var Controller = function ($scope, $state, localStorageService) {
    $scope.$on('$ionicView.enter', function () {
        var data = localStorageService.get('loginUser');

        var hasDoublePermission = (data.permssionMap.SFM && data.permssionMap.SFM.length && data.permssionMap.AD && data.permssionMap.AD.length);
        
        if (!hasDoublePermission) {
            if (data.permssionMap.SFM && data.permssionMap.SFM.length) {
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
                $state.go('ad-login');
            }
        }
    });
};

module.exports = ['$scope', '$state', 'localStorageService', Controller];
