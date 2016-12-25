var Controller = function ($scope, $stateParams, $state, $ionicScrollDelegate, MetaDataSvc, KPIItem, Constant, DateUtil, localStorageService, Warehouse, MenuBorder, Util, MenuList) {

    $scope.getBorderFreq = Util.getBorderFreq;

    $scope.lineMenus = [{
        'MenuId': '10',
        'PageType': 10,
        'nm': 'KPI跟踪',
        'enm': 'KPI Tracking',
        'fc': '#36CD14',
        'state': 'line-kpi',
        'bg': 'img/svg/kpi-tracking.svg'
    }, {
        'MenuId': '11',
        'PageType': 11,
        'nm': '问题跟踪推进',
        'enm': 'Problem Tracking',
        'fc': '#62839D',
        'state': '',
        'bg': 'img/svg/problem-tracking.svg'
    }];

    $scope.goTo = function (menu) {
        localStorageService.set('criteria', $scope.criteria);
        if (!menu.state) {
            return;
        }
        $state.go(menu.state, { PageType: menu.PageType });
    };

    $scope.kqDropdown = {
        isOpen: false,
        close: function () {
            this.isOpen = false;
        },
        open: function () {
            if (!$scope.kuqus || $scope.kuqus.length <= 1) {
                return;
            }
            this.isOpen = !this.isOpen;
            // $scope.bzDropdown.close();
            // $scope.bcDropdown.close();
        },
        selectOption: function (option) {
            $scope.criteria.kuqu = option;
            this.close();
        }
    };
    $scope.criteria = {};
    $scope.$on('$ionicView.enter', function () {
        var selectedCriteria = localStorageService.get('criteria');

        MenuList.getList($scope.lineMenus, true, {
            WareHouseId: selectedCriteria.kuqu ? selectedCriteria.kuqu.Id : -1,
            ZoneId: selectedCriteria.banzu ? selectedCriteria.banzu.Id : -1
        }).then(function (menus) {
            $scope.menus = menus;
        });

        Warehouse.getWareHouse().then(function (kqs) {
            $scope.kuqus = kqs;
            var isExist = selectedCriteria && selectedCriteria.kuqu && !!$scope.kuqus.filter(function (kq) {
                return kq.whse_code === selectedCriteria.kuqu.whse_code;
            }).length;

            if (isExist) {
                $scope.criteria.kuqu = selectedCriteria.kuqu;
            } else {
                $scope.criteria.kuqu = $scope.kuqus[0];
            }
        }, function (kuqus) {
            $scope.kuqus = kuqus;
        });
        $scope.kqDropdown.close();
    });

    $scope.$watch('criteria.kuqu', function () {
        if (!$scope.criteria || !$scope.criteria.kuqu) {
            return;
        }

        MenuList.getList($scope.lineMenus, true, {
            WareHouseId: $scope.criteria.kuqu.Id,
            ZoneId: -1
        }).then(function (menus) {
            $scope.menus = menus;
        });

        MenuBorder.lineBoard($scope.criteria.kuqu.Id).then(function (data) {
            $scope.menuBorders = data;
        });
    });

};


module.exports = ['$scope', '$stateParams', '$state', '$ionicScrollDelegate', 'MetaDataSvc', 'KPIItem', 'Constant', 'DateUtil', 'localStorageService', 'Warehouse', 'MenuBorder', 'Util', 'MenuList', Controller];
