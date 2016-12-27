var Controller = function ($scope, $state, localStorageService) {
    $scope.$on('$ionicView.enter', function () {
        var data = localStorageService.get('loginUser');

        var hasDoublePermission = (data.permssionMap.SFM && data.permssionMap.SFM.length && data.permssionMap.AD && data.permssionMap.AD.length);

        $scope.hasSFM = false;
        $scope.hasAD = false;

        if (!hasDoublePermission) {
            if (data.permssionMap.SFM && data.permssionMap.SFM.length) {
                $scope.hasSFM = true;
            } else if (data.permssionMap.AD && data.permssionMap.AD.length) {
                $scope.hasAD = true;
            } else {
                $state.go('ad-login');
            }
        } else {
            $scope.hasSFM = true;
            $scope.hasAD = true;
        }
    });
};

module.exports = ['$scope', '$state', 'localStorageService', Controller];
