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
            data.sort(function (a, b) {
                return parseInt(a.Order_number, 10) - parseInt(b.Order_number, 10);
            });
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
                "month_r":"11",
                "Order_number":7,
                "Operate_Name":"张四",
                "Rotation_Name":"张五"
              }
            */
            for (var i = 0, len = data.length; i < len; i++) {
                // find job type
                var jobType = {};
                var record = data[i];
                for (var j = 0, jl = rows.length; j < jl; j++) {
                    if (rows[j] && rows[j].name == record.Job_name) {
                        jobType = rows[j];
                        break;
                    }
                }
                if (j == jl) {
                    jobType.name = record.Job_name;
                    jobType.items = [];
                    rows.push(jobType);
                }
                // find items
                var months = [];
                var items = {};
                for (var k = 0, lk = jobType.items.length; k < lk; k++) {
                    if (record.Operate_Name == jobType.items[k].operator &&
                        record.Rotation_Name == jobType.items[k].rotate) {
                        items = jobType.items[k];
                        break;
                    }
                }
                if (k == lk) {
                    items.operator = record.Operate_Name;
                    items.rotate = record.Rotation_Name;
                    // 12 months
                    items.months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    jobType.items.push(items);
                }
                items.months[record.month_r - 1] = 1;
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
