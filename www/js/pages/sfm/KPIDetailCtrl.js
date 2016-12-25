var Controller = function($scope, KPIDetail, Constant, $stateParams, MetaDataSvc, $state, localStorageService, MenuList) {
    var idx, idlen, type;

    $scope.aspect = $stateParams.aspect;

    $scope.goKPIDetail = function(state, BizType, isPercentage, isInvalid) {

        if (isInvalid) {
            return;
        }
        $state.go(state ? state : 'kpi-item', {
            'isPercentage': isPercentage + '',
            'aspect': $stateParams.aspect,
            'PageType': $stateParams.PageType,
            'BizType': BizType,
            'isLine': $stateParams.isLine
        });
    };

    $scope.isLine = $stateParams.isLine;
    type = $stateParams.aspect;

    for (idx = 0, idlen = Constant.kpis.length; idx < idlen; idx++) {
        if (Constant.kpis[idx].type === type) {
            $scope.aspectTitle = Constant.kpis[idx].name;
            break;
        }
    }
    $scope.$on('$ionicView.enter', function() {
        $scope.criteriaFromCache = localStorageService.get('criteria');

        /*eslint-disable*/
        KPIDetail(type, $scope.isLine).then(function(menus) {

            MenuList.getList(menus, $scope.isLine, {
                WareHouseId: $scope.criteriaFromCache.kuqu ? $scope.criteriaFromCache.kuqu.Id : -1,
                ZoneId: $scope.criteriaFromCache.banzu ? $scope.criteriaFromCache.banzu.Id : -1
            }).then(function(emptyMenus) {
                $scope.menus = emptyMenus;
            });

            if (type === 'security') {
                // Green Cross
                // $scope.menus[0].hatColor = ''; 
            }
        }, function() {});

        /*eslint-disable*/
        MetaDataSvc($stateParams.PageType).then(function(data) {
            $scope.metaData = data;
        });

    });

};

module.exports = ['$scope', 'KPIDetail', 'Constant', '$stateParams', 'MetaDataSvc', '$state', 'localStorageService', 'MenuList', Controller];
