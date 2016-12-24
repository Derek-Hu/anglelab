var Controller = function ($scope, $state, localStorageService, Constant, Warehouse, Zone, Shift, Charge, $stateParams, KPIDetail, MetaDataSvc, MenuBorder, Util, MenuList) {

    $scope.getBorderFreq = Util.getBorderFreq;
    $scope.criteria = {
        kuqu: '',
        banzu: '',
        banci: '',
        charger: '加载中',
        currentDate: '加载中'
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
            $scope.bzDropdown.close();
            $scope.bcDropdown.close();
        },
        selectOption: function (option) {
            $scope.criteria.kuqu = option;
            this.close();
        }
    };

    $scope.bzDropdown = {
        isOpen: false,
        close: function () {
            this.isOpen = false;
        },
        open: function () {
            if (!$scope.banzus || $scope.banzus.length <= 1) {
                return;
            }
            this.isOpen = !this.isOpen;
            $scope.kqDropdown.close();
            $scope.bcDropdown.close();
        },
        selectOption: function (option) {
            $scope.criteria.banzu = option;
            this.close();
        }
    };
    $scope.bcDropdown = {
        isOpen: false,
        close: function () {
            this.isOpen = false;
        },
        open: function () {
            if (!$scope.bancis || $scope.bancis.length <= 1) {
                return;
            }
            this.isOpen = !this.isOpen;
            $scope.kqDropdown.close();
            $scope.bzDropdown.close();
        },
        selectOption: function (option) {
            $scope.criteria.banci = option;
            this.close();
        }
    };

    $scope.goTo = function (menu) {
        localStorageService.set('criteria', $scope.criteria);
        if (!menu.state) {
            return;
        }
        $state.go(menu.state, { PageType: menu.PageType });
    };
    $scope.goKPIDetail = function (state, BizType) {
        $state.go(state ? state : 'kpi-item', { 'aspect': $stateParams.aspect, 'PageType': $stateParams.PageType, 'BizType': BizType });
    };
    var type = $stateParams.aspect;

    for (var idx = 0, idlen = Constant.kpis.length; idx < idlen; idx++) {
        if (Constant.kpis[idx].type == type) {
            $scope.aspectTitle = Constant.kpis[idx].name;
            break;
        }
    }

    if (!type) {
        // $scope.menus=Constant.viewBoard.menus;
    } else {
        $scope.menus = Constant.kpiMenus[type];
        KPIDetail(type).then(function (menus) {
            $scope.menus = menus;
            if (type == 'security') {
                // Green Cross
                // $scope.menus[0].hatColor = ''; 
            }
        }, function () {});
    }
    var selectedCriteria = localStorageService.get('criteria');

    $scope.$on('$ionicView.enter', function (e) {
        $scope.criteriaFromCache = localStorageService.get('criteria');
        $scope.isKPI = !!$stateParams.aspect;
        selectedCriteria = localStorageService.get('criteria');
        Warehouse.getWareHouse().then(function (Warehouse) {
            $scope.kuqus = Warehouse;
            var isExist = selectedCriteria && selectedCriteria.kuqu && !!$scope.kuqus.filter(function (kq) {
                return kq.whse_code == selectedCriteria.kuqu.whse_code;
            }).length;
            
            if (isExist) {
                $scope.criteria.kuqu = selectedCriteria.kuqu;
            } else {
                $scope.criteria.kuqu = $scope.kuqus[0];
            }
        }, function (Warehouse) {
            $scope.kuqus = Warehouse;
        });
        $scope.kqDropdown.close();
        $scope.bzDropdown.close();
        $scope.bcDropdown.close();

    });
    $scope.$watch('criteria.kuqu', function () {
        if (!$scope.criteria || !$scope.criteria.kuqu) {
            return;
        }
        // load border color
        MenuBorder.viewBoard($scope.criteria.kuqu.Id).then(function (data) {
            $scope.menuBorders = data;
        });

        $scope.criteria.banzu = '';
        Zone.getZone($scope.criteria.kuqu.Id).then(function (zones) {
            $scope.banzus = zones;
            var isExist = selectedCriteria && selectedCriteria.banzu && !!$scope.banzus.filter(function (bz) {
                return bz.zone_code == selectedCriteria.banzu.zone_code;
            }).length;
            if (isExist) {
                $scope.criteria.banzu = selectedCriteria.banzu;
            } else {
                $scope.criteria.banzu = $scope.banzus[0];
            }

        }, function (zones) {
            $scope.banzus = zones;
        });
    });
    $scope.$watch('criteria.banzu', function () {
        if (!$scope.criteria.banzu) {
            return;
        }
        $scope.criteria.banci = '';
        MenuList.getList(Constant.viewBoard.menus, false, {
            WareHouseId: $scope.criteria.kuqu ? $scope.criteria.kuqu.Id : -1,
            ZoneId: $scope.criteria.banzu ? $scope.criteria.banzu.Id : -1
        }).then(function (menus) {
            $scope.menus = menus;
        });
        Shift.getShift($scope.criteria.kuqu.Id, $scope.criteria.banzu.Id).then(function (shifts) {
            $scope.bancis = shifts;
            var isExist = selectedCriteria && selectedCriteria.banci && !!$scope.bancis.filter(function (bc) {
                return bc.shift_code == selectedCriteria.banci.shift_code;
            }).length;
            if (isExist) {
                $scope.criteria.banci = selectedCriteria.banci;
            } else {
                $scope.criteria.banci = $scope.bancis[0];
            }

        });
    });
    $scope.$watch('criteria.banci', function () {
        if (!$scope.criteria.banci) {
            return;
        }
        $scope.criteria.charger = '加载中';
        $scope.criteria.currentDate = '加载中';
        localStorageService.set('criteria', $scope.criteria);
        var type = $stateParams.aspect;
        if (type) {
            KPIDetail(type).then(function (menus) {

                MenuList.getList(menus, false, {
                    WareHouseId: $scope.criteria.kuqu ? $scope.criteria.kuqu.Id : -1,
                    ZoneId: $scope.criteria.banzu ? $scope.criteria.banzu.Id : -1
                }).then(function (menus) {
                    $scope.menus = menus;
                });

                if (type == 'security') {
                    // Green Cross
                    $scope.menus[0].hatColor = '';
                }
            }, function () {});
        } else {
            Charge.getCharge($scope.criteria.kuqu.Id, $scope.criteria.banzu.Id, $scope.criteria.banci.ID).then(function (data) {
                $scope.criteria.charger = data.Employee_name;
                $scope.criteria.currentDate = data.DateTime;
            });

        }

    });


};


module.exports = ['$scope', '$state', 'localStorageService', 'Constant', 'Warehouse', 'Zone', 'Shift', 'Charge', '$stateParams', 'KPIDetail', 'MetaDataSvc', 'MenuBorder', 'Util', 'MenuList', Controller];
