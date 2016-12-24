var Controller = function($scope, $stateParams, $state, $ionicScrollDelegate, MetaDataSvc, KPIItem, Constant, DateUtil, localStorageService) {

    $scope.chart = {};
    var aspect = Constant.kpiMenus[$stateParams.aspect];
    $scope.aspect = $stateParams.aspect;

    $scope.isLine = $stateParams.isLine;
    var BizType = $stateParams.BizType;
    for (var i = 0, len = aspect.length; i < len; i++) {
        if (aspect[i].BizType == BizType) {
            $scope.KPITitle = aspect[i].nm;
        }
    }
    $scope.chart.isRate = $stateParams.isPercentage == 'true';
    //$scope.chart.isRate = ($scope.aspect == 'member' || $scope.aspect == 'cost' || $scope.aspect=='quality');

    var ConstantTypes = {
        'M': '月',
        'W': '周',
        'D': '天'
    };
    var xTypes = {
        'M': '月',
        'W': '',
        'D': ''
    };

    function renderData(key) {
        $scope.chart.xlabel = xTypes[key];
        $scope.chart.data = $scope.types[key].map(function(d) {
            d.month = d.ID.match(/\d+/)[0];
            return d;
        });
        $scope.chart1 = { data: null };
        $scope.chart.isDouble = false;
        if (key == 'W') {
            var total = $scope.chart.data;
            /*$scope.chart.data = total.filter(function(d){
              return d.month <27;
            });
            $scope.chart.isDouble = true;
            $scope.chart1 = {
              data: total.filter(function(d){
                return d.month >=27;
              })
            };*/
            $scope.chart1.data = null;
            $scope.chart.isDouble = false;
        } else {
            $scope.chart1.data = null;
        }
    }

    function generatorDropdown(name, items, defaultOpt) {
        $scope[name] = {};
        $scope[name].isOpen = false;
        $scope[name].items = items;
        $scope[name].close = function() {
            $scope[name].isOpen = false;
        };
        $scope[name].open = function() {
            if (!$scope[name].items || $scope[name].items.length <= 1) {
                return;
            }
            this.isOpen = !this.isOpen;
        };
        $scope[name].selectOption = function(option) {
            if (!option) {
                return;
            }
            if (option.isURL) {
                $scope[name].close();
                $state.go(option.key, option.param);
                return;
            }
            $scope[name].option = option;
            renderData($scope[name].option.key);
            this.close();
        };
        if (!defaultOpt && items.length) {
            $scope[name].selectOption(items[0]);
        } else {
            $scope[name].selectOption(defaultOpt);
        }
    }


    $scope.$on('$ionicView.enter', function(e) {
        $scope.selectedCriteria = localStorageService.get('criteria');
        MetaDataSvc($stateParams.PageType, $scope.isLine).then(function(data) {
            $scope.metaData = data;
        });

        var lastDay = DateUtil.getLastDay();

        KPIItem($stateParams.BizType, $scope.isLine).then(function(data) {

            /*data = data.map(function(d){
              if($scope.chart.isRate){
                d.ACTUAL =  d.ACTUAL + '%';
                d.TARGET =  d.TARGET + '%';
              }
              return d;
            });*/

            var types = Object.keys(ConstantTypes);
            $scope.types = {};

            var i, len;
            for (var dx = 0, dlen = data.length; dx < dlen; dx++) {
                var ele = data[dx];
                for (i = 0, len = types.length; i < len; i++) {
                    var type = types[i];
                    if (ele.ID.indexOf(type) === 0) {
                        if (type in $scope.types) {
                            $scope.types[type].push(ele);
                        } else {
                            $scope.types[type] = [ele];
                        }
                        break;
                    }
                }
            }
            types = Object.keys($scope.types);
            $scope.typeDropdown = [];
            for (i = 0, len = types.length; i < len; i++) {
                $scope.typeDropdown.push({
                    key: types[i],
                    value: ConstantTypes[types[i]]
                });
            }
            var BizTypeLen = $stateParams.BizType.length;
            if ($scope.aspect == 'flow' && $stateParams.BizType.charAt(BizTypeLen - 1) == '1') {
                $scope.typeDropdown.push({
                    key: 'flow-wall',
                    value: '明细',
                    isURL: true,
                    param: { PageType: $stateParams.PageType, BizType: $stateParams.BizType + '-1', isLine: $scope.isLine }
                });
            } else if ($scope.aspect == 'cost' && $stateParams.BizType.charAt(BizTypeLen - 1) == '2') {
                $scope.typeDropdown.push({
                    key: 'cost-wall',
                    value: '目视墙',
                    isURL: true,
                    param: { PageType: $stateParams.PageType, BizType: $stateParams.BizType + '-1', isLine: $scope.isLine }
                });
            }
            generatorDropdown('chartTypeDropdown', $scope.typeDropdown);
        });
    });

}


module.exports ['$scope', '$stateParams', '$state', '$ionicScrollDelegate', 'MetaDataSvc', 'KPIItem', 'Constant', 'DateUtil', 'localStorageService', Controller];
