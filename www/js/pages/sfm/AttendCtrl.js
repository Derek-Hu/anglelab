var Controller = function($scope, $state, Backend, $window) {

    $scope.goHome = function() {
        $state.go('dash');
    };

    $scope.chart = {
        title: "审核问题关闭率（月度KPI样例）",
        data: [{
            "month": "1",
            "frequency": 0.3782,
            "expect": 0.32782
        }, {
            "month": "2",
            "frequency": 0.23253,
            "expect": 0.18782
        }, {
            "month": "3",
            "frequency": 0.2782,
            "expect": 0.32782
        }, {
            "month": "4",
            "frequency": 0.13253,
            "expect": 0.18782
        }, {
            "month": "5",
            "frequency": 0.12702,
            "expect": 0.49820
        }, {
            "month": "6",
            "frequency": 0.16288,
            "expect": 0.20782
        }, {
            "month": "7",
            "frequency": 0.3,
            "expect": 0.243
        }, {
            "month": "8",
            "frequency": 0.14094,
            "expect": 0.2
        }, {
            "month": "9",
            "frequency": 0.13966,
            "expect": 0.23700
        }],
        yLabel: "审核问题关闭率"
    };

    $scope.$on('$ionicView.enter', function(e) {
        /*Backend().kaoqin.query(function(data){
          $scope.chart.data=data;
        });*/
    });
}

module.exports ['$scope', '$state', 'Backend', '$window', Controller];
