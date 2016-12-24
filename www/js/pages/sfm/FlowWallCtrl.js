var Controller = function($scope, Constant, localStorageService, MetaDataSvc, $stateParams, KPIItem) {

    $scope.loadingStatus = '加载中';
    $scope.headers = ['序号', '厂区', '周数', '停线时间', '停线累计分钟(补装台数)', '停线起止时间', '停线零件名称', '停线零件号', '情况描述', '责任方'];
    $scope.isLine = $stateParams.isLine;
    $scope.$on('$ionicView.enter', function(e) {
        $scope.selectedCriteria = localStorageService.get('criteria');
        MetaDataSvc($stateParams.PageType, $scope.isLine).then(function(data) {
            $scope.metaData = data;
        });
        $scope.loadingStatus = '加载中';
        KPIItem($stateParams.BizType, $scope.isLine).then(function(data) {
            if (!data.length) {
                $scope.loadingStatus = '暂无数据';
                return;
            }
            $scope.loadingStatus = '';
            $scope.records = data;
        }, function() {
            $scope.loadingStatus = '加载失败';
            $scope.records = [];
        });

    });

}


module.exports ['$scope', 'Constant', 'localStorageService', 'MetaDataSvc', '$stateParams', 'KPIItem', Controller];
