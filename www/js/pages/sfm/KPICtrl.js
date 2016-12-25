var Controller = function ($scope, Constant, $state, localStorageService, KPIDetail, MenuList) {

    $scope.$on('$ionicView.enter', function () {
        $scope.selectedCriteria = localStorageService.get('criteria');
        MenuList.getList(Constant.kpis, false, {
            WareHouseId: $scope.selectedCriteria.kuqu ? $scope.selectedCriteria.kuqu.Id : -1,
            ZoneId: $scope.selectedCriteria.banzu ? $scope.selectedCriteria.banzu.Id : -1
        }).then(function (menus) {
            $scope.kpis = menus;
        });

        /* KPIDetail('kpiHome').then(function(menus){
          $scope.menus = menus;

        },function(){});*/

    });
    $scope.goDetail = function (kpiType, PageType) {
        $state.go('kpi-detail', { 'aspect': kpiType, 'PageType': PageType });
    };

};


module.exports = ['$scope', 'Constant', '$state', 'localStorageService', 'KPIDetail', 'MenuList', Controller];
