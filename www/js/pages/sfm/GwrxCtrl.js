var Controller = function (localStorageService, $scope, Backend, $stateParams, MetaDataSvc) {
    $scope.loadingStatus = '';

    function convertObj(val) {
        var obj = {};
        if (!val) {
            obj.isVal = true;
            obj.val = '';
            return obj;
        }
        var arr = val.split('/');
        if (arr.length == 1) {
            obj.isVal = true;
            obj.val = val;
        } else if (arr.length == 2) {
            obj.isSkill = true;
            obj.skill = arr[0];
            obj.bg = arr[1];
        } else if (arr.length == 3) {
            obj.isCertificate = true;
            obj.bg = arr[1];
            obj.cert = arr[2];
        }
        return obj;
    }
    $scope.loadGwrx = function (WareHouseId, ZoneId, ShiftId) {
        $scope.loadingStatus = '加载中';
        Backend().gwrx.query({
            'WareHouseId': WareHouseId,
            'ZoneId': ZoneId,
            'ShiftId': ShiftId
        }, function (data) {
            $scope.loadingStatus = '';

            $scope.records = data.map(function (d) {
                for (var p in d) {
                    if (d.hasOwnProperty(p)) {
                        d[p] = convertObj(d[p]);
                    }
                }
                return d;
            });
            if (!$scope.records || !$scope.records.length) {
                $scope.loadingStatus = '暂无数据';
                return;
            } else if (data.length == 1 && data[0].ErrorCode !== undefined) {
                $scope.loadingStatus = '加载失败';
                return;
            }
            $scope.headers = Object.keys(data[0]).filter(function (data) {
                return data != '序号' && data != '班组' && data != '班次';
            });
        }, function () {
            $scope.loadingStatus = '加载失败';
        });
    };
    $scope.$on('$ionicView.enter', function (e) {
        $scope.selectedCriteria = localStorageService.get('criteria');
        $scope.loadGwrx($scope.selectedCriteria.kuqu.Id, $scope.selectedCriteria.banzu.Id, $scope.selectedCriteria.banci.ID);

        MetaDataSvc($stateParams.PageType).then(function (data) {
            $scope.metaData = data;
        });
    });
};

module.exports = ['localStorageService', '$scope', 'Backend', '$stateParams', 'MetaDataSvc', Controller];
