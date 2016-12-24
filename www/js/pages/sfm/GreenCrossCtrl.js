var Controller = function($scope, $stateParams, $state, $ionicScrollDelegate, MetaDataSvc, KPIItem, Constant, DateUtil, localStorageService) {
    function generate(data) {
        for (var i = 0, len = DateUtil.getLastDay(); i < len; i++) {
            if (!data[i]) {
                data.push({
                    ID: i + 1,
                    STATE: ''
                });
            }
        }
        $scope.rows = [];
        $scope.rows.push(data.filter(function(el) {
            return parseInt(el.ID) <= 3;
        }));
        $scope.rows.push(data.filter(function(el) {
            var id = parseInt(el.ID);
            return id > 3 && id <= 6;
        }));
        $scope.rows.push(data.filter(function(el) {
            var id = parseInt(el.ID);
            return id > 6 && id <= 13;
        }));
        $scope.rows.push(data.filter(function(el) {
            var id = parseInt(el.ID);
            return id > 13 && id <= 20;
        }));
        $scope.rows.push(data.filter(function(el) {
            var id = parseInt(el.ID);
            return id > 20 && id <= 27;
        }));
        var days = data.filter(function(el) {
            var id = parseInt(el.ID);
            return id > 27 && id <= 30;
        });
        days.length = 3;
        $scope.rows.push(days);

        days = data.filter(function(el) {
            var id = parseInt(el.ID);
            return id == 31;
        });

        days.length = 3;
        $scope.rows.push(days);
    }
    $scope.colors = Constant.kpiColor;
    $scope.isLoading = false;
    $scope.isLine = $stateParams.isLine;
    $scope.$on('$ionicView.enter', function(e) {
        $scope.tableWidth = angular.element(document.getElementById('greenCrossTable')).height();
        $scope.isLoading = true;
        $scope.selectedCriteria = localStorageService.get('criteria');
        MetaDataSvc($stateParams.PageType).then(function(data) {
            $scope.metaData = data;
        });
        KPIItem($stateParams.BizType, $scope.isLine).then(function(data) {
            if (!data.length) {
                data = [];
                for (var i = 0, len = DateUtil.getLastDay(); i < len; i++) {
                    data.push({
                        ID: i + 1,
                        STATE: ''
                    });
                }
            }
            generate(data);
            $scope.isLoading = false;
        }, function() {
            var holder = [];
            for (var i = 0, len = DateUtil.getLastDay(); i < len; i++) {
                holder.push({
                    ID: i + 1,
                    STATE: ''
                });
            }
            generate(holder);
            $scope.isLoading = false;
        });
    });

}


module.exports = {
    name: "GreenCrossCtrl",
    $fn: ['$scope', '$stateParams', '$state', '$ionicScrollDelegate', 'MetaDataSvc', 'KPIItem', 'Constant', 'DateUtil', 'localStorageService', Controller]
};
