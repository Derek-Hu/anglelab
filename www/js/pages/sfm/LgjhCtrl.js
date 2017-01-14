var Controller = function (localStorageService, $scope, Backend, MetaDataSvc, $stateParams) {
    $scope.loadingStatus = '';
    $scope.loadLgjh = function (WareHouseId, ZoneId, ShiftId) {
        $scope.loadingStatus = '加载中';
        /*eslint-disable*/
        Backend().lgjh.query({
            'WareHouseId': WareHouseId,
            'ZoneId': ZoneId,
            'ShiftId': ShiftId
        }, function (data) {
            $scope.loadingStatus = '';
            if (!data || !data.length) {
                $scope.loadingStatus = '暂无数据';
                return;
            } else if (data.length === 1 && data[0].ErrorCode !== undefined) {
                $scope.loadingStatus = '加载失败';
                return;
            }
            /*data.sort(function (a, b) {
                return parseInt(a.Order_number, 10) - parseInt(b.Order_number, 10);
            });*/
            var rows = [];
            /*
              rows = [{
                name: 
                items: [{
                  operator:,
                  rotate: ,
                  months: [1,0,0,1,1,0,0,1,1,0,0,1]
                }]
              }]
            */

            /*
              {
                "Job_name":"检验",
                "Job_code":"11",
                "month1":7,
                ...
                "month12": "23aa"
              }
            */
            for (var i = 0, len = data.length; i < len; i++) {
                // find job type
                var jobType = {};
                var record = data[i];
                record.months = [
                    record.month1,
                    record.month2,
                    record.month3,
                    record.month4,
                    record.month5,
                    record.month6,
                    record.month7,
                    record.month8,
                    record.month9,
                    record.month10,
                    record.month11,
                    record.month12
                ];
                for (var j = 0, jl = rows.length; j < jl; j++) {
                    if (rows[j] && rows[j].name == record.Job_name) {
                        jobType = rows[j];
                        jobType.items.push(record);
                        break;
                    }
                }
                if (j == jl) {
                    jobType.name = record.Job_name;
                    jobType.items = [record];
                    rows.push(jobType);
                }
            }
            $scope.rows = rows;
            console.log(rows);
        }, function () {
            $scope.loadingStatus = '加载失败';
        });

    };
    $scope.$on('$ionicView.enter', function (e) {
        $scope.selectedCriteria = localStorageService.get('criteria');
        $scope.loadLgjh($scope.selectedCriteria.kuqu.Id, $scope.selectedCriteria.banzu.Id, $scope.selectedCriteria.banci.ID);

        MetaDataSvc($stateParams.PageType).then(function (data) {
            $scope.metaData = data;
        });
    });
};

module.exports = ['localStorageService', '$scope', 'Backend', 'MetaDataSvc', '$stateParams', Controller];
