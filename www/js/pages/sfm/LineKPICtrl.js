var Controller = function ($scope, Constant, $state, localStorageService, KPIDetail, MetaDataSvc, MenuList) {

    // $scope.kpis=Constant.kpis;
    $scope.isLine = true;
    $scope.$on('$ionicView.enter', function () {
        $scope.selectedCriteria = localStorageService.get('criteria');
        /*eslint-disable*/
        MetaDataSvc(Constant.lineKpiPageType, $scope.isLine).then(function (data) {
            $scope.metaData = data;
        });
        /*eslint-disable*/
        KPIDetail('kpiHome', $scope.isLine).then(function (menus) {
            MenuList.getList(menus, $scope.isLine, {
                WareHouseId: $scope.selectedCriteria.kuqu ? $scope.selectedCriteria.kuqu.Id : -1,
                ZoneId: $scope.selectedCriteria.banzu ? $scope.selectedCriteria.banzu.Id : -1
            }).then(function (kpiMenus) {
                $scope.kpis = kpiMenus;
            });

        }, function () {});

    });
    $scope.goDetail = function (kpiType) {
        $state.go('kpi-detail', { 'aspect': kpiType, 'PageType': Constant.lineKpiPageType, isLine: true });
    };

};


module.exports = ['$scope', 'Constant', '$state', 'localStorageService', 'KPIDetail', 'MetaDataSvc', 'MenuList', Controller];
