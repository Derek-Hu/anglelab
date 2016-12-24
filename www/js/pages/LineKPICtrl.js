var Controller = function($scope, Constant, $state, localStorageService, KPIDetail, MetaDataSvc, MenuList) {

    //$scope.kpis=Constant.kpis;
    $scope.isLine = true;
    $scope.$on('$ionicView.enter', function(e) {
        $scope.selectedCriteria = localStorageService.get('criteria');

        MetaDataSvc(Constant.lineKpiPageType, $scope.isLine).then(function(data) {
            $scope.metaData = data;
        });

        KPIDetail('kpiHome', $scope.isLine).then(function(menus) {
            MenuList.getList(menus, $scope.isLine, {
                WareHouseId: $scope.selectedCriteria.kuqu ? $scope.selectedCriteria.kuqu.Id : -1,
                ZoneId: $scope.selectedCriteria.banzu ? $scope.selectedCriteria.banzu.Id : -1
            }).then(function(menus) {
                $scope.kpis = menus;
            });

        }, function() {});

    });
    $scope.goDetail = function(kpiType, PageType) {
        $state.go('kpi-detail', { "aspect": kpiType, "PageType": Constant.lineKpiPageType, isLine: true });
    };

}


module.exports = {
    name: "LineKPICtrl",
    $fn: ['$scope', 'Constant', '$state', 'localStorageService', 'KPIDetail', 'MetaDataSvc', 'MenuList', Controller]
};
