var Controller = function (localStorageService, Backend, $scope, $state, MetaDataSvc, $stateParams, Constant) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //

    $scope.$on('$ionicView.enter', function (e) {
        MetaDataSvc($stateParams.PageType).then(function (data) {
            $scope.metaData = data;
        });

        $scope.selectedCriteria = localStorageService.get('criteria');
        $scope.group = null;
        Backend().org.query({
            'WareHouseId': $scope.selectedCriteria.kuqu.Id,
            'ZoneId': $scope.selectedCriteria.banzu.Id,
            'ShiftId': $scope.selectedCriteria.banci.ID
        }, function (data) {
            if (!data[0] || data[0].ErrorCode !== undefined) {
                return;
            }
            data.sort(function (a, b) {
                return parseInt(a.Order_number) - parseInt(b.Order_number);
            });
            for (var i = 0, len = data.length; i < len; i++) {
                data[i].Picture = Constant.baseURL() + '/Imagers/' + data[i].Picture;
            }
            $scope.group = {};
            $scope.group.leader = data.splice(0, 1)[0];
            $scope.group.members = data;
            $scope.group.name = $scope.selectedCriteria.banci.description;
            console.log($scope.group);
        });
    });
    $scope.goHome = function () {
        $state.go('dash');
    };

};


module.exports = ['localStorageService', 'Backend', '$scope', '$state', 'MetaDataSvc', '$stateParams', 'Constant', Controller];
